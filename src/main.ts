// / <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app/app.component';
import { environment } from './_environments/environment';

if (environment.production) {
   enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
   .catch((err) => console.error(err));



