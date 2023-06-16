import { Auction, TwkAuction } from "./auction";

export class MapLocation{

  constructor(
    public lat: number,
    public long: number,
    public numberofauctions: number,
    public auctions: Auction[]
  ) {
  }
}

export class GeonameLocation {
  constructor(
    public geonameid: number,
    public name: string,
    public asciiname: string,
    public alternamenames: string[],
    public latitude: number,
    public longitude: number,
    public countrycode: Countrycode,
    public modificationdate: string
  ) {
    
  }
}


export enum Countrycode {
  NL = "NL"
}

