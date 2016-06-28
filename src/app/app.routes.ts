import {provideRouter, RouterConfig} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {ProductsRoutes} from './products/products.routes'

export const routes:RouterConfig = [
    ...ProductsRoutes,
    {path: '', redirectTo: 'welcome', terminal: true},
    {path: 'welcome', component: WelcomeComponent},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];