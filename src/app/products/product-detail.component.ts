import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public pageTitle:string = "Welcome";

    private sub:any;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.pageTitle = this.pageTitle + " : " + id;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onBack() { this.router.navigate(['/products']); }

}