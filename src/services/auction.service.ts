import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { TwkAuction, TwkAuctionday, TwkPagedResult } from '../models/auction';
import { Countrycode } from '../models/location';
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


  async getAuctionLocations(countrycode: Countrycode) {
    const geonames = await this._locationService.getCountryLocations(countrycode).toPromise();
    //const auctions = await this.getTroostwijkAuctions(countrycode).toPromise();

    console.log(geonames);


  }


  getTroostwijkAuctions(countrycode: Countrycode): Observable<any> {

    return from(
      fetch(
        `https://api.troostwijkauctions.com/sale/4/listgrouped?batchSize=99999CountryIDs=${countrycode}`, // the url you are trying to access
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET', // GET, POST, PUT, DELETE
          
          //mode: 'no-cors' // the most important option
        }
      ).then((response) => response.text()).then(console.log)
    );

      //.pipe(
      //  map((response: any) => {
      //    console.log(response);

      //    //const auctions = response.results.map((r: any) => [].concat.apply([] as TwkAuction[], r.items)) as TwkAuction[];
      //    //this.TwkAuctions.concat(auctions);
      //    //return auctions;
      //  })
      //  , catchError(this.handleError)
      //);
        

    //return this._http.get(`https://api.troostwijkauctions.com/sale/4/listgrouped?batchSize=99999CountryIDs=${countrycode}`).pipe(
    //  map((response: any) => {
    //    const auctions = response.results.map((r: any) => [].concat.apply([] as TwkAuction[], r.items)) as TwkAuction[];
    //    this.TwkAuctions.concat(auctions);
    //    return auctions;
    //  })
    //  , catchError(this.handleError)
    //  )
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(error.statusText || 'Bad request');
    }
    return throwError(error || 'Server error');
  }

}
