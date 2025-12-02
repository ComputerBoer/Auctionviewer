import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/_environments/environment';
import { Auction } from 'src/_models/auction';
import { CustomDatePipe } from '../pipes/customDate.pipe';
import { LowerCasePipe } from '@angular/common';

@Component({
    selector: 'app-auctions',
    templateUrl: './auctions.component.html',
    styleUrls: ['./auctions.component.scss'],
    imports:[TranslateModule, CustomDatePipe, LowerCasePipe]
})
export class AuctionsComponent implements OnInit {
  environment = environment

  @Input() shownAuctions: Auction[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
