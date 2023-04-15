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
    public url: string,
    public ii: number, //image
    public nol: number // number of lots
  ) { 
  }
}



