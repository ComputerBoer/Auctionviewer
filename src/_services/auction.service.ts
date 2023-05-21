import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from '../_environments/environment';
import { TwkAuction, TwkAuctionday } from '../_models/auction';
import { Countrycode, GeonameLocation, MapLocation } from '../_models/location';
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


  getAuctionLocations(countrycode: Countrycode): Observable<MapLocation[]> {

    return forkJoin({
      geonames: this._locationService.getCountryLocations(countrycode).pipe(catchError(error => throwError(error))),
      auctions: this.getTroostwijkAuctions(countrycode).pipe(catchError(error => throwError(error)))
    }).pipe(map(result => {
      let countryAuctions: TwkAuction[] = [];
      if (result.auctions)
        countryAuctions = result.auctions.filter((a: TwkAuction) => a.cc == countrycode);

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
          geo ? geo : new GeonameLocation(0, c, c, [], 0, 0, countrycode, ''),
          auctions
        )
        auctionlocations.push(loc);

      })

      return auctionlocations;
    }), catchError(err => throwError(err))
    )

  }


  getTroostwijkAuctions(countrycode: Countrycode): Observable<TwkAuction[]> {

    return this._http.get(environment.apiUrl + 'Auction\\' + countrycode).pipe(
      map((response: any) => {
        //const auctions = response.results.map((r: any) => [].concat.apply([] as TwkAuction[], r.items)) as TwkAuction[];
        const auctions = response.results.map((r: TwkAuctionday) => r.items).flat(1) as TwkAuction[];
        auctions.map(a => a.cd = new Date(a.cd * 1000));
        auctions.map(a => a.sd = new Date(a.sd * 1000));
        auctions.map(a => a._startbeforetoday = a.sd > new Date());
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
