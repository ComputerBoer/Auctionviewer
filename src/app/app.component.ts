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

  contructor() {

  }


  

}
