import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import * as L from 'leaflet';
import { Auction, Auctionbrand } from '../../_models/auction';
import { Countrycode, MapLocation } from "../../_models/location";
import { AuctionService } from '../../_services/auction.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    imports:[TranslateModule,]
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

  private Auctionlocations: MapLocation[]=[]
  private _markers: any[] = [];

  auctionsError = signal(false);
  loading = signal(false);

  activeLocation: MapLocation | undefined;

  visitedMaplocationUrls: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _unsubscribe = new Subject<void>();

  constructor(
    private _auctionService: AuctionService,
  ) { }

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
    this.loading.set(true);
    this.auctionsError.set(false);
    this._auctionService.getAuctionLocations(Countrycode.NL).subscribe(result => {
      this.loading.set( false);
      this.Auctionlocations = result;
      this.showLocations(result);
      
    }, error => {
      this.loading.set(false);
      this.auctionsError.set(true);
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
          html: `${location.numberofauctions} ${this.hasOverlap(location.auctions, this.activeLocation?.auctions)}`,
          className: `
            marker border-3 fw-bold text-center transition-colors duration-300 ease-out
            ${location.auctions[0].city === 'Nederland' ? 'border-primary bg-white !text-blue': 'border-blue rounded-full'}
            ${location.auctions[0].city === 'Nederland'? '':location.auctions.map(m=> m.url).every(ai=> this.visitedMaplocationUrls.value.includes(ai)) ? 'bg-primary-light border-primary': 'bg-white'}
            ${location !== this.activeLocation && this.hasOverlap(location.auctions, this.activeLocation?.auctions)? 'border-blue-light': '' }
          `,
          iconSize: [25, 25],
         
        })
    }
      ).addTo(this.map)
      .on('mouseover', event => { event.target.bindPopup(lochtml).openPopup(); })
      .on('mouseout', event => { event.target.closePopup(); })
      .on('click', event => {
        if (this.activeElement && this.activeElement._icon){
          this.activeElement._icon.classList.remove('border-blue');
          this.activeElement._icon.classList.remove('bg-white');
          this.activeElement._icon.classList.add('bg-primary')
          this.activeElement._icon.classList.add('text-white')
        }

        this.activeElement = event.target;
        event.target._icon.classList.add('border-primary');

        this.activeLocation = location;
        this.shownAuctions.emit(location.auctions);
        this.showLocations(this.Auctionlocations);
        this.addVisitedLocationUrls(location.auctions);

      })

    this._markers.push(marker);
  }



  hasOverlap(locationAuctions: Auction[], activeAuctions?: Auction[]):boolean{
    if(!activeAuctions) return false;
    console.log(locationAuctions.map(a=> a.url).filter(url => activeAuctions.map(m=> m.url).includes(url)).length>0)
    return locationAuctions.map(a=> a.url).filter(url => activeAuctions.map(m=> m.url).includes(url)).length>0

  }
  

  addVisitedLocationUrls(auctions: Auction[]){
    const urls = auctions.map(m=> m.url)
    const visited =this.visitedMaplocationUrls.value 
    this.visitedMaplocationUrls.next([...new Set(visited.concat(urls))])

  }
    


}
