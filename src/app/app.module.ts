import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuctionService } from '../_services/auction.service';
import { LocationService } from '../_services/location.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InfoComponent } from './info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDatePipe } from './pipes/customDate.pipe';
import { AuctionsComponent } from './auctions/auctions.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './_assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InfoComponent,
    CustomDatePipe,
    AuctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }

      })
  ],
  providers: [
    LocationService,
    AuctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|nl/) ? browserLang : 'en');
    //translate.use('en');
  }
}
