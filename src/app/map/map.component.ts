import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { TwkAuction } from '../../models/auction';
import { Countrycode, MapLocation } from "../../models/location";
import { AuctionService } from '../../services/auction.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() shownAuctions: EventEmitter<TwkAuction[]> = new EventEmitter()

  private map: any;
  private centroid: L.LatLngExpression = [52.2129919, 5.2793703]

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 9
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

   let locations = await this._auctionService.getAuctionLocations(Countrycode.NL)

    locations.forEach(loc => {
      if (loc.geonamelocation) {
        this.addLocation(loc)
      }
    })

    //let loc = new MapLocation(42.3601, -71.0589, "Testtitle", "Testurl")
    //this.addLocation(loc )
  }

  addLocation(location: MapLocation) {

    let locs =''
    location.auctions.forEach(l => { locs = locs + `<li>${l.n}</li>`})

    let lochtml = `<ul>${ locs}</ul>`


    new L.Marker(
      [location.lat, location.long], {
        icon: L.divIcon({
          html: `${location.title}`,
          className: "border border-primary border-3 rounded-circle bg-light fw-bold text-center",
          iconSize: [25, 25]
        })
    }
      ).addTo(this.map)
      .on('mouseover', event => { event.target.bindPopup(lochtml).openPopup(); })
      .on('mouseout', event => { event.target.closePopup(); })
      .on('click', event => { this.shownAuctions.emit(location.auctions) })
    }



}
