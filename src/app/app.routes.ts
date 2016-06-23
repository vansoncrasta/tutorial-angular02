import {provideRouter, RouterConfig} from '@angular/router';
import {ProductListComponent} from './products/product-list.component';
import {ProductDetailComponent} from './products/product-detail.component'
import {WelcomeComponent} from './home/welcome.component';

export const routes:RouterConfig = [
    {path: '', redirectTo: 'welcome', terminal: true},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'product/:id', component: ProductDetailComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];