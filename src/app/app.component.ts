import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx'; //Load all features.

import {ProductListComponent} from './products/index';
import {ProductService} from './products/product.service';

@Component({
    selector: 'app',
    template: `
            <h1>{{pageTitle}}</h1>
            <pm-products></pm-products>
            `,
    directives: [ProductListComponent],
    providers: [ProductService,
        HTTP_PROVIDERS]
})
export class AppComponent {
    pageTitle:string = "Product Management";

}
