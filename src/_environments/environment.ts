// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/',
  //apiUrl: 'http://api.auctionviewer.ikbenhenk.nl/',
  //apiUrl: 'https://auctionviewer.azurewebsites.net/',
  TWKimageserver: 'https://img.twa.nl/',
  TWKurl: 'https://www.troostwijkauctions.com/nl',
  OVMimageserver: 'https://onlineveilingmeester.nl/',
  OVMurl: 'https://onlineveilingmeester.nl/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
