import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/data/services/product.service';
import { Product } from 'src/app/data/schema/product';
import { Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:Observable<Product[]>;

  constructor(
    private productService:ProductService,
  ){}

  ngOnInit(): void {
    this.products = this.productService.getProductAllByOffer()
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true  ,
    touchDrag: true  ,
    pullDrag: true  ,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay:true,
    autoplaySpeed:700,
    items:1,
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }


}
