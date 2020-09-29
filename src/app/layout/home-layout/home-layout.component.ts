import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../data/schema/product'
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/data/services/product.service';
import { AuthService } from 'src/app/data/services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  searchInput:String = '';

  products:Observable<Product[]>;
  countProduct:number;

  constructor(
    private router:Router,
    private producService:ProductService,
    public auth:AuthService
  ){}

  ngOnInit(): void {
    this.products = this.producService.getAllProduct();
    this.producService.getCountShoppingCart().subscribe(count => {
      this.countProduct = count
    });
    let products:Product[] = JSON.parse(localStorage.getItem('products'))
    
    products  ? this.producService.shoppingCart.next(products.length) 
              : this.producService.shoppingCart.next(0)


  }

  onShowSearch(search:HTMLElement ,active:boolean): void{    
    active ? search.classList.add('search--active') : search.classList.remove('search--active');
  }

  onHideSearch(event:HTMLElement, search:HTMLElement, btnSearch): void{
    if(
      !search.outerHTML.includes(event.outerHTML) &&
      search.className.includes('search--active') &&
      event != btnSearch._elementRef.nativeElement
    ){
      search.classList.remove('search--active')
    }
  }

  onCleanSearch(): void{
    this.searchInput = '';
  }

  OnNavToProd(event:MatAutocompleteSelectedEvent): void{
    const prod = event.option.value
    this.searchInput = '';

    if(prod){
      this.router.navigate([`/${prod.slug}`]);
    }
  }

}
