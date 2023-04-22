import { Injectable } from '@angular/core';
import { Countrycode, GeonameLocation } from '../_models/location';
import { HttpClient } from '@angular/common/http'
import { map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locations = new Map<string, GeonameLocation[]>();

  constructor(
    private _http: HttpClient
  ) { }

  getCountryLocations(countrycode: Countrycode): Observable<GeonameLocation[]> {

    let locationdata = this.locations.get(countrycode)
    if (locationdata) {
      return of(locationdata)
    }
    return this._http.get(`_assets/locationfiles/${countrycode}.txt`, { responseType: 'text' }).pipe(
      map(data => {
        const geonames = this._convertToLocationArray(data);
        this.locations.set(countrycode, geonames);
        return geonames;
    }))
  }

  private _convertToLocationArray(data: string): GeonameLocation[]  {
    const records = data.split('\n');
    const geonames: GeonameLocation[] = [];
    records.map(r => {
      const obj = r.split('\t');
      const alternatenames = obj[3] ? obj[3].toLowerCase().split(",") : [];
      const geoname = new GeonameLocation(Number(obj[0]), obj[1]?.toLowerCase(), obj[2]?.toLowerCase(), alternatenames, Number(obj[4]), Number(obj[5]), (<any>Countrycode)[obj[8]], obj[18])
      geonames.push(geoname);
    })
    return geonames;
  } 

  getGeoLocationByCity(city: string, countrycode: Countrycode): GeonameLocation|null {

    //if (city = 'Horst')
    //  debugger

    city = city.toLowerCase();
    let cityname = city;

    if (!cityname.includes('gemeente'))
      cityname = 'gemeente ' + cityname;

    let geonames = this.locations.get(countrycode) || [];

    //first tries name with 'gemeente as prefix'
    let geo = geonames.filter(g => g.name == cityname)[0];
    if (geo) return geo;
    //also tries in the alternatenames
    geo = geonames.filter(g => g.alternamenames.includes(cityname))[0]
    if (geo) return geo;
    
    //then tries name without 'gemeente as prefix'
    geo = geonames.filter(g => g.name == city)[0];
    if (geo) return geo;
    //also tries in the alternatenames
    geo = geonames.filter(g => g.alternamenames.includes(city))[0]
    if (geo) return geo;


    //removes everything between ();
    city = city.replace(/\([^()]*\)/g, '')

    geo = geonames.filter(g => g.name == city)[0];
    if (geo) return geo;

    geo = geonames.filter(g => g.alternamenames.includes(city))[0]
    if (geo) return geo;

    if (!geo) console.log('city not found:', city)
    return null;
  }

}
