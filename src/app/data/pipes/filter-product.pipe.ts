import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../schema/product';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products:Product[] , filterProduct): Product[] {

    let filterListProduct:Product[];

    if(products !== null && filterProduct){
      filterListProduct = products.filter(product => this._normalizeValue(product.title).indexOf(this._normalizeValue(filterProduct)) !== -1)
      return filterListProduct;
    }else{
      products
    }
  }

  _normalizeValue(value:string){
    return value.toLowerCase().replace(/\s/g, '')
  }

}
