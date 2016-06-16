import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "./product.model";

@Pipe({
    name: "productFilter"
})
export class ProductFilterPipe implements PipeTransform {
    transform(value:Product[], args:string[]):Product[] {
        let filter:string = args[0] ? args[0].toLocaleLowerCase() : null;
        console.log("Filter : " + filter);
        return filter ? value.filter((product:Product) =>
        product.productName.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}