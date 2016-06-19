import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './product.model'

@Injectable()
export class ProductService {

    private productUrl = "api/products/products.json";

    constructor(private http:Http) {
    };

    getProducts():Observable<Product[]> {
        console.log("Calling the get product websevice : " + this.productUrl);
        return this.http.get(this.productUrl)
            .map((response:Response) => <Product[]>response.json())
            .do(data => console.log("All " + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}