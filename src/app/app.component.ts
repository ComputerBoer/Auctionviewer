import { Component } from '@angular/core';
import { environment } from '../_environments/environment';
import { TwkAuction } from '../_models/auction';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  environment = environment
  shownAuctions: TwkAuction[] = [];

  showWarning = true;

  showNavigation = false;

  contructor() {
  }

  ngOnInit() {
    if (window.location.href.startsWith('http://localhost:4300'))
      return;

    if (!window.location.href.startsWith("https://auctionviewer.ikbenhenk.nl")) {
      this.showNavigation = true;
      setTimeout(() => {
        window.location.replace("https://auctionviewer.ikbenhenk.nl");
      }, 5000)
      
    }
  }



  

}
