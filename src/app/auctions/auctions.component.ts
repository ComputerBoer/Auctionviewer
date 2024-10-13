import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/_environments/environment';
import { Auction } from 'src/_models/auction';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {
  environment = environment

  @Input() shownAuctions: Auction[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
