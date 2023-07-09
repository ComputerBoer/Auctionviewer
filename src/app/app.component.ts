import { Component } from '@angular/core';
import { environment } from '../_environments/environment';
import { Auction, Auctionbrand, TwkAuction } from '../_models/auction';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  environment = environment
  shownAuctions: Auction[] = [];

  showWarning = true;

  showNavigation = false;

  //auctionBrands: Auctionbrand[] = [Auctionbrand.TWK, Auctionbrand.OVM]
  auctionBrands = new FormControl<Auctionbrand[]|[]>([])

  unsubscribe = new Subject<void>();
  constructor(
    private _meta: Meta,
    private _translate: TranslateService,
    public activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {

    let b = localStorage.getItem('shown_brands')
    let brands = [Auctionbrand.TWK, Auctionbrand.OVM]
    if (b) { brands = JSON.parse(b) as Auctionbrand[] }

    this.auctionBrands.setValue(brands)

    this.showWarning = !JSON.parse( localStorage.getItem('closed_warning') || 'false')

    if (!window.location.href.startsWith('http://localhost:4200')) {
      if (!window.location.href.startsWith("https://auctionviewer.ikbenhenk.nl")) {
        this.showNavigation = true;
        setTimeout(() => {
          window.location.replace("https://auctionviewer.ikbenhenk.nl");
        }, 5000)
      }
    }

    this._translate.get('common.meta_description').subscribe(res => {
      this._meta.addTag({
        name: 'description',
        content: res
      });
    })
    this._meta.addTag({
      name: "keywords",
      content:"auctions, auction, veilingen, veiling, troostwijk, map, kaart, veilinglocatie, auctionlocation"
    })


  }
  ngOnDestroy() {
    this.unsubscribe.next();
  }

  closeWarning() {
    this.showWarning = false;
    localStorage.setItem('closed_warning', JSON.stringify( true))
  }


  toggleAuction(brand: Auctionbrand | string) {

    const brands = JSON.parse(JSON.stringify(this.auctionBrands.value)) as Auctionbrand[];
    if (this.isActiveAuction(brand)) {
      const index = brands.indexOf((brand as Auctionbrand))
      brands.splice(index,1)
    } else {
      brands.push(brand as Auctionbrand)
    }
    this.auctionBrands.setValue(brands);
    localStorage.setItem('shown_brands', JSON.stringify(brands))
  }
  isActiveAuction(brand: Auctionbrand | string): boolean {
    const brands = this.auctionBrands.value as Auctionbrand[];
    return brands.includes(brand as Auctionbrand);
  }

  showAuctions(auctions: Auction[]) {
    this.shownAuctions = auctions;
    setTimeout(() => {
      this.goToBottom()
    }, 50)
    
  }

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

}
