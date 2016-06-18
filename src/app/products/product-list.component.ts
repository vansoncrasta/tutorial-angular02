import {Component, OnInit} from '@angular/core';
import {Product} from './product.model';
import {ProductFilterPipe} from './product-filter.pipe';
import {StarComponent} from '../shared';
import {ProductService} from './product.service'

@Component({
    selector: 'pm-products',
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent]
})
export class ProductListComponent implements OnInit{
    pageTitle:string = "Product List";
    imageWidth:number = 50;
    imageMargin:number = 2;
    showImage:boolean = false;
    listFilter:string = "cart";
    products: Product[];

    //ProductService - Dependency injection
    constructor(private productService:ProductService){}

    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit(){
        console.log("On Init");
        this.products = this.productService.getProducts();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}