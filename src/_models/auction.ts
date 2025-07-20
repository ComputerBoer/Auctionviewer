import { Countrycode } from "./location";

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
    public multiplelocations: boolean,
    public _startbeforetoday: boolean
  ) { }

}

export enum Auctionbrand {
  NONE = "NONE",
  TWK = "TWK",
  OVM = "OVM",
  AP = "AP"
}

