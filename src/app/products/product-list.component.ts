import {Component, OnInit} from '@angular/core';
import {Product} from './product.model';
import {ProductFilterPipe} from './product-filter.pipe';
import {StarComponent} from '../shared';
import {ProductService} from './product.service'
import {Router} from '@angular/router';

@Component({
    selector: 'pm-products',
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent]
})
export class ProductListComponent implements OnInit {
    pageTitle:string = "Product List";
    imageWidth:number = 50;
    imageMargin:number = 2;
    showImage:boolean = false;
    listFilter:string;
    products:Product[];
    errorMessage:string;

    //ProductService - Dependency injection
    constructor(private productService:ProductService, private router:Router) {
    }

    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit() {
        console.log("On Init");
        this.productService.getProducts()
            .subscribe(
                products => this.products = products,
                error => this.errorMessage = <any>error);
    }

    onRatingClicked(message:string):void {
        this.pageTitle = 'Product List: ' + message;
    }

    onSelect(product:Product){
        this.router.navigate(['/product', product.productId]);
    }
}