import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { TwkAuction, TwkAuctionday, TwkPagedResult } from '../models/auction';
import { Countrycode, GeonameLocation, MapLocation } from '../models/location';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  TwkAuctions: TwkAuction[] = [];

  constructor(
    private _http: HttpClient,
    private _locationService: LocationService
  ) { }


  async getAuctionLocations(countrycode: Countrycode): Promise<MapLocation[]> {
    const geonames = await this._locationService.getCountryLocations(countrycode).toPromise() || [];
    const auctions = await this.getTroostwijkAuctions(countrycode).toPromise();

    let countryAuctions: TwkAuction[] = [];
    if (auctions)
      countryAuctions = auctions.filter(a => a.cc == countrycode);

    let uniqueCities = Array.from(new Set(countryAuctions.map(m => m.c)));

    let auctionlocations: MapLocation[] = [];

    uniqueCities.forEach(c => {

      let geo = this._locationService.getGeoLocationByCity(c, countrycode);
      let auctions = countryAuctions.filter(a => a.c == c);

      let loc = new MapLocation(
        geo ? geo.latitude : 0,
        geo ? geo.longitude : 0,
        String(auctions.length),
        '',
        geo ? geo : new GeonameLocation(0, c, c, [], 0,0,countrycode, ''),
        auctions
      )
      auctionlocations.push(loc);

    })

    return auctionlocations;
  }


  getTroostwijkAuctions(countrycode: Countrycode): Observable<TwkAuction[]> {

    //return from(
    //  fetch(
    //    `https://api.troostwijkauctions.com/sale/4/listgrouped?batchSize=99999CountryIDs=${countrycode}`, // the url you are trying to access
    //    {
    //      headers: {
    //        'Content-Type': 'application/json',
    //      },
    //      method: 'GET', // GET, POST, PUT, DELETE

    //      //mode: 'no-cors' // the most important option
    //    }
    //  ).then((response) => response.text()).then(console.log)
    //);

    //.pipe(
    //  map((response: any) => {
    //    console.log(response);

    //    //const auctions = response.results.map((r: any) => [].concat.apply([] as TwkAuction[], r.items)) as TwkAuction[];
    //    //this.TwkAuctions.concat(auctions);
    //    //return auctions;
    //  })
    //  , catchError(this.handleError)
    //);
    //`https://api.troostwijkauctions.com/sale/4/listgrouped?batchSize=99999CountryIDs=${countrycode}`

    return this._http.get(environment.apiUrl + 'Auction').pipe(
      map((response: any) => {
        //const auctions = response.results.map((r: any) => [].concat.apply([] as TwkAuction[], r.items)) as TwkAuction[];
        const auctions = response.results.map((r: TwkAuctionday) => r.items).flat(1) as TwkAuction[];
        this.TwkAuctions.concat(auctions);
        return auctions;
      })
      , catchError(this.handleError)
    )
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(error.statusText || 'Bad request');
    }
    return throwError(error || 'Server error');
  }

}
