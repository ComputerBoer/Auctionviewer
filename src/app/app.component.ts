import { Component } from '@angular/core';
import { environment } from '../_environments/environment';
import { Auction, TwkAuction } from '../_models/auction';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private _meta: Meta,
    private _translate: TranslateService
  ) {
  }

  ngOnInit() {

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


  closeWarning() {
    this.showWarning = false;
    localStorage.setItem('closed_warning', JSON.stringify( true))
  }


  

}
