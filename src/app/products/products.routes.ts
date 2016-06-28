import {RouterConfig} from '@angular/router';
import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail.component';

export const ProductsRoutes:RouterConfig = [
    {path: 'products', component: ProductListComponent},
    {path: 'product/:id', component: ProductDetailComponent}
];