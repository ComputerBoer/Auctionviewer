// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { _sharedEnvironment } from "./_environment";

export const environment = {
  ..._sharedEnvironment,
  production: false,
  // apiUrl: 'http://localhost:5000/',
  apiUrl: 'https://api.auctionviewer.ikbenhenk.nl/',
};
