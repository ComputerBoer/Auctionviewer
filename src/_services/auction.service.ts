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

    return this._http.get(environment.apiUrl + 'v2/auction/' + countrycode).pipe(
      map((response: any) => {
        response as MapLocation[];
        response.map((l: MapLocation) => { l.auctions.map(a => a._startbeforetoday = a.starttime > new Date()) })
        response.map((l: MapLocation) => { l.auctions.map(a => a.closingtime = new Date(a.closingtime)) })
        console.log(response);
        return response;
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
