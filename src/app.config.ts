import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration, BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissingTranslationHandler, MissingTranslationHandlerParams, provideTranslateService, provideTranslateCompiler, provideMissingTranslationHandler } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from './_environments/environment';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { AuctionService } from './_services/auction.service';
import { LocationService } from './_services/location.service';

export class TranslateHandler implements MissingTranslationHandler {
   handle(params: MissingTranslationHandlerParams) {
      let env = environment
      if (!env.production) {
         console.log('*** Missing translations for:', params.translateService.currentLang, "'" + params.key + "'");
      }
      return params.key; // here u can return translation
   }
}

export const appConfig: ApplicationConfig = {
   providers: [
      provideHttpClient(withFetch(), withInterceptorsFromDi()),
      // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      provideAnimations(),
      provideRouter(routes), // withDebugTracing()),
      provideClientHydration(),


      provideTranslateService({
         loader: provideTranslateHttpLoader({
            prefix: './_assets/i18n/',
            suffix: '.json'
         }),
         // compiler:provideTranslateCompiler(TranslateMessageFormatCompiler),
         missingTranslationHandler: provideMissingTranslationHandler(TranslateHandler),
         fallbackLang: 'nl',
         lang:'nl'
         
      }),

      importProvidersFrom(
         // BrowserModule.withServerTransition({ appId: 'serverApp' }),
         BrowserModule,
         ReactiveFormsModule,
         FormsModule,
         BrowserAnimationsModule,
      ),
      AuctionService,
      LocationService
   ]
};

