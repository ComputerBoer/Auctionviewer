import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../_environments/environment';
import { Countrycode, MapLocation } from '../_models/location';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(
    private _http: HttpClient,
    private _locationService: LocationService
  ) { }


  getAuctionLocations(countrycode: Countrycode): Observable<MapLocation[]> {

    return this._http.get(environment.apiUrl + 'v2/auction/' + countrycode).pipe(
      map((response: any) => {
        response as MapLocation[];

        //response.map((l: MapLocation) => { l.auctions.map(a => a.closingtime = this.convertDate(a.closingtime)) })
        //response.map((l: MapLocation) => { l.auctions.map(a => a.starttime = this.convertDate(a.starttime)) })
        response.map((l: MapLocation) => { l.auctions.map(a => a._startbeforetoday = a.starttime > new Date()) })
        //console.log(response);
        return response;
      })
      , catchError(this.handleError)
    )
  }

  convertDate(datestring: string): Date {
    let date = datestring.split(" ")[0];
    let time = datestring.split(" ")[1];

    let datearray = date.split("-")
    let timearray = time.split(":")

    return new Date(Number(datearray[0]), Number(datearray[1]), Number(datearray[2]), Number(timearray[0]), Number(timearray[1]))

  }


  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(error.statusText || 'Bad request');
    }
    return throwError(error || 'Server error');
  }

}
