import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/_environments/environment';
import { Auction } from 'src/_models/auction';
import { CustomDatePipe } from '../pipes/customDate.pipe';
import { LowerCasePipe } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
  imports: [TranslateModule, CustomDatePipe, LowerCasePipe]
})
export class AuctionsComponent implements OnInit {
  environment = environment

  @Input() shownAuctions: Auction[] = [];

  visitedAuctions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  private _unsubscribe$ = new Subject<void>()

  ngOnInit(): void {

    this.visitedAuctions.next(JSON.parse(localStorage.getItem("visitedAuctionUrls") || "[]") as string[])

    this.visitedAuctions.pipe(takeUntil(this._unsubscribe$)).subscribe(res => {
      localStorage.setItem("visitedAuctionUrls", JSON.stringify(res))
    })

  }

  setAuctionVisited(url: string) {
    console.log(url)
    if (this.visitedAuctions.value.includes(url)) return;

    const urls = this.visitedAuctions.value;
    urls.push(url)
    this.visitedAuctions.next(urls)
  }

}
