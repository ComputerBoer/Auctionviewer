import { _sharedEnvironment } from "./_environment";

export const environment = {
  ..._sharedEnvironment,
  production: true,
  apiUrl: 'https://api.auctionviewer.ikbenhenk.nl/',
};
