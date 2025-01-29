import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProductListComponent } from './app/product-list/product-list.component';

bootstrapApplication(ProductListComponent)
  .catch((err) => console.error(err));
