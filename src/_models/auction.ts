import { Countrycode } from "./location";

export class TwkPagedResult{

  constructor(
    public closedOnly: boolean,
    public id: number,
    public offset: number,
    public results: TwkAuctionday[]
  ) {
  }
}

export class TwkAuctionday {
  constructor(
    public dateTime: Date,
    public items: TwkAuction[]

  ) { }
}

export class TwkAuction {
  constructor(
    public c: string, //city
    public cc: Countrycode,
    public n: string, //name
    public cd: any, //closingtime,
    public sd: any, //starttime,
    public url: string,
    public ii: number, //image
    public nol: number, // number of lots
    public _startbeforetoday: boolean
  ) { 
  }
}

export class Auction {
  constructor(
    public city: string,
    public countrycode: Countrycode,
    public name: string,
    public starttime: any,
    public closingtime: any,
    public url: string,
    public imageurl: string,
    public numberoflots: number,
    public brand: Auctionbrand,
    public _startbeforetoday: boolean
  ) { }

}

export enum Auctionbrand {
  NONE = "NONE",
  TWK = "TWK",
  OVM = "OVM"
}

