import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';

import { AppModule } from './app/app.module';
import { HttpClientModule } from '@angular/common/http';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
