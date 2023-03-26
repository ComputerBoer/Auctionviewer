import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Countrycode, MapLocation } from "../../models/location";
import { AuctionService } from '../../services/auction.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: any;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    })


    tiles.addTo(this.map)
  }

  constructor(

    private _locationService: LocationService,
    private _auctionService: AuctionService,
  ) { }

 

  ngOnInit() {
    this.initMap();

    this.getLocations();

  }

  async getLocations() {

    await this._auctionService.getAuctionLocations(Countrycode.NL)

    //let loc = new MapLocation(42.3601, -71.0589, "Testtitle", "Testurl")
    //this.addLocation(loc )
  }

  addLocation(location: MapLocation) {
    new L.Marker([location.lat, location.long]).addTo(this.map)
      .on('mouseover', event => { event.target.bindPopup('content').openPopup(); })
      .on('mouseout', event => { event.target.closePopup(); })
  }



}
