import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/data/services/product.service';
import { Product } from 'src/app/data/schema/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products:Product[]=[];
  // total:number = 0;

  constructor(
    private productService:ProductService
  ){}

  ngOnInit(): void {
    const localProducts:Product[] = JSON.parse(localStorage.getItem('products'));

    this.products = localProducts;

  }

  onRemoveProductShoppingCart(product:Product):void{
    this.products = this.products.filter((el)=> el.slug !== product.slug)
    this.productService.removeProductFromShoppingCart(product)
  }

  getTotal():number{
    if(this.products){
      let total:number = 0
      this.products.map((product)=>total+=(product.units*product.price))
      return total;
    }    
  }

}
