import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { Auction, Auctionbrand, TwkAuction } from '../../_models/auction';
import { Countrycode, MapLocation } from "../../_models/location";
import { AuctionService } from '../../_services/auction.service';
import { LocationService } from '../../_services/location.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() shownAuctions: EventEmitter<Auction[]> = new EventEmitter()

  private _auctionbrands: Auctionbrand[] = [];
  @Input() set auctionbrands(auctionbrands: Auctionbrand[] | null) {
    if (!auctionbrands) auctionbrands = [];
    this._auctionbrands = auctionbrands;
    this.showLocations(this.Auctionlocations);
  }
  private activeElement: any;

  private map: any;
  private centroid: L.LatLngExpression = [52.2129919, 5.2793703]

  private initMap(): void {

    const screenwidth = window.innerWidth;

    this.map = L.map('map', {
      center: this.centroid,
      zoom: screenwidth < 576? 10 : 9
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    })


    tiles.addTo(this.map)
  }

  private Auctionlocations: MapLocation[]=[]
  private _markers: any[] = [];

  auctionsError = false;
  loading = false;

  visitedMaplocationUrls: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _unsubscribe = new Subject<void>();

  constructor(
    private _auctionService: AuctionService,
  ) { }

 

  ngOnInit() {
    this.initMap();
    this.getLocations();

    this.visitedMaplocationUrls.next(JSON.parse(localStorage.getItem("visitedMaplocationUrls") || "[]") as string[])

    this.visitedMaplocationUrls.pipe(takeUntil(this._unsubscribe)).subscribe(res=>{
      localStorage.setItem("visitedMaplocationUrls", JSON.stringify(res))
    })

  }

  ngOnDestroy(){
      this._unsubscribe.next()
  }

  getLocations() {
    this.loading = true;
    this.auctionsError = false;
    this._auctionService.getAuctionLocations(Countrycode.NL).subscribe(result => {
      this.loading = false;
      this.Auctionlocations = result;
      this.showLocations(result);
      
    }, error => {
      this.loading = false;
      this.auctionsError = true;
      console.log(error)
    })
  }

  showLocations(maplocations: MapLocation[]) {

    this._markers.forEach(m => {
      if (this.map.hasLayer(m))
        this.map.removeLayer(m)
    })

    maplocations.forEach(loc => {

      const auctions = loc.auctions.filter(f => this._auctionbrands.includes(f.brand))
      if (loc && auctions.length > 0) {
        loc = JSON.parse(JSON.stringify(loc))
        loc.numberofauctions = auctions.length
        loc.auctions = auctions
        this.addLocation(loc)
      }
    })
  }

  addLocation(location: MapLocation) {

    let locs =''
    location.auctions.forEach(l => { locs = locs + `<li>${l.name}</li>`})
    let lochtml = `<ul>${locs}</ul>`

    let marker = new L.Marker(
      [location.lat, location.long], {
        icon: L.divIcon({
          html: `${location.numberofauctions}`,
          className: `
            marker border border-3 rounded-circle fw-bold text-center
            ${location.auctions[0].city === 'Nederland' ? 'border-success': 'border-primary'}
            ${location.auctions.map(m=> m.url).every(ai=> this.visitedMaplocationUrls.value.includes(ai)) ? 'bg-primary text-white': 'bg-light'}
          `,
          iconSize: [25, 25],
         
        })
    }
      ).addTo(this.map)
      .on('mouseover', event => { event.target.bindPopup(lochtml).openPopup(); })
      .on('mouseout', event => { event.target.closePopup(); })

      .on('click', event => {
        if (this.activeElement && this.activeElement._icon){
          this.activeElement._icon.classList.remove('border-warning');
          this.activeElement._icon.classList.remove('bg-light');
          this.activeElement._icon.classList.add('bg-primary')
          this.activeElement._icon.classList.add('text-white')
        }

        this.activeElement = event.target;
        event.target._icon.classList.add('border-warning');
        this.shownAuctions.emit(location.auctions);
        this.addVisitedLocationUrls(location.auctions);

      })

    this._markers.push(marker);
  }

  addVisitedLocationUrls(auctions: Auction[]){
    const urls = auctions.map(m=> m.url)
    const visited =this.visitedMaplocationUrls.value 
    this.visitedMaplocationUrls.next([...new Set(visited.concat(urls))])

  }
    


}
