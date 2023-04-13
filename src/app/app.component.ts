import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { TwkAuction } from '../models/auction';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  environment = environment

  title = 'Auctionviewer';
  shownAuctions: TwkAuction[] = [];

  contructor() {

  }


  

}
