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
    if (window.location.href !== "https://auctionviewer.ikbenhenk.nl") {
      this.showNavigation = true;

      if (window.location.href == 'http://localhost:4200')
        return;

      setTimeout(() => {
        window.location.replace("https://auctionviewer.ikbenhenk.nl");
      }, 5000)
      
    }
  }



  

}
