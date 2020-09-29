import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/data/services/product.service';
import { combineLatest, Observable } from 'rxjs';
import { Product } from 'src/app/data/schema/product';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit {

  title:String;
  product:Observable<Product>;
  data:Product;
  amountProduct:number = 1;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    @Inject(DOCUMENT) private document, 
    private elementRef: ElementRef,
    private _snackBar:MatSnackBar

  ){}

  ngOnInit(): void {

    const result$ =  this.route.params
                      .pipe(
                        mergeMap(data => this.productService.getProductBySlug(data.slug)),
                      )

    result$.subscribe(
      (data) => {
        if(data.title){      
          this.product = result$;
          this.data = data          
        }else{
          this.router.navigate(['/'])
        }
      },
      (err) => {
        this.router.navigate(['/'])  
      }
    )
  }

  onAddProduct():void{
    if(this.amountProduct <= this.data.amount-1){
      this.amountProduct++;
    }else{
      this._snackBar.open('Lo sentimos, no quedan suficientes productos en stock','Vació',{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
    }
  }

  onRemoveProduct():void{    
    this.amountProduct > 1 ? this.amountProduct--:this.amountProduct=1;
  }

  onAddShoppingCart():void{

    if(this.amountProduct <= this.data.amount ){
      this.data.units =  this.amountProduct;
      this._snackBar.open(`Producto agregado al carro (${this.amountProduct==1?`${this.amountProduct} unidad`:`${this.amountProduct} unidades`})`,'Añadido',{
        duration:2000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
      this.productService.addProductShoppingCart(this.data);  
    }

    // if(isExist.length > 0){
    //   this._snackBar.open('Este producto ya está en el carrito','listo',{
    //     duration:2000,
    //     horizontalPosition:'center',
    //     verticalPosition:'bottom'
    //   })
    // }else{
    //   this._snackBar.open(`${this.data.title}`,'Añadido',{
    //     duration:2000,
    //     horizontalPosition:'center',
    //     verticalPosition:'bottom'
    //   })
  
    //   this.productService.addProductShoppingCart(this.data);  
    // }
    
  }

  ngAfterViewInit():void{

    const s = this.document.createElement('script') as HTMLScriptElement;
    s.type = 'text/javascript';
    s.src = 'assets/js/photoswipe.js';
    
    this.elementRef.nativeElement.appendChild(s);
  }

}
