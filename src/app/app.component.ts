import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';
import 'rxjs/Rx'; //Load all features.

import {ProductListComponent} from './products/index';
import {ProductService} from './products/product.service';

@Component({
    selector: 'app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/products']">Product List</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
    ` ,
    directives: [ProductListComponent, ROUTER_DIRECTIVES],
    providers: [ProductService,
        HTTP_PROVIDERS]
})
export class AppComponent {
    pageTitle:string = "Product Management";
}
