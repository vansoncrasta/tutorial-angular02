import {Component} from '@angular/core';
import {ProductListComponent} from './products/index';

@Component({
    selector: 'app',
    template: `
            <h1>{{pageTitle}}</h1>
            <pm-products></pm-products>
            `,
    directives: [ProductListComponent]
})
export class AppComponent {
    pageTitle: string = "Product Management";

}
