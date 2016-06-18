import {Component} from '@angular/core';
import {ProductListComponent} from './products/index';
import {ProductService} from './products/product.service';

@Component({
    selector: 'app',
    template: `
            <h1>{{pageTitle}}</h1>
            <pm-products></pm-products>
            `,
    directives: [ProductListComponent],
    providers: [ProductService]
})
export class AppComponent {
    pageTitle: string = "Product Management";

}
