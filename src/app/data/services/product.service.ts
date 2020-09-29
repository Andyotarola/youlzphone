import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { forkJoin, from, Observable, of, Subject } from 'rxjs';
import { Product } from '../schema/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  shoppingCart:Subject<number> = new Subject<number>();

  constructor(
    private afs:AngularFirestore
  ){}

  /* Obtener todos los productos */

  getAllProduct(): Observable<Product[]>{
    return this.afs
            .collection<Product>('products')
            .valueChanges({idField:'slug'});
  }

  /* Obtener un producto por el slug*/

  getProductBySlug(slug:string): Observable<Product>{
    return this.afs
            .collection('products')
            .doc<Product>(slug)
            .snapshotChanges()
            .pipe(
              map(action => {
                const data = action.payload.data() as Product;
                return {slug, ...data}
              })
            )
  }

  /* Obtener todos los producto  que estan en oferta */

  getProductAllByOffer():Observable<Product[]>{
    return this.afs
          .collection<Product>('products', (ref)=> ref.where('offer','==',true))
          .valueChanges({idField:'slug'})
  }

  /* Agregar un producto al carrito de compras */

  addProductShoppingCart(product:Product){
    if(!localStorage.getItem('products')){
      let products:Product[] = [product]
      localStorage.setItem('products',JSON.stringify(products))
      this.shoppingCart.next(products.length)
    }else{
      let products:Product[] = JSON.parse(localStorage.getItem('products'))
      let isExist = products.filter((item)=> item.slug === product.slug);

      if(isExist.length > 0){
        let update_products = products.map((item)=>{
          if(item.slug === product.slug){
            item = product
          }
          return item
        })    
        
        localStorage.setItem('products',JSON.stringify(update_products))
        this.shoppingCart.next(update_products.length)
      }else{
        products.push(product)
        localStorage.setItem('products',JSON.stringify(products))
        this.shoppingCart.next(products.length)
      }

    }
    
  }

  // Observable para la cantidad de productos se añaden al carrito

  getCountShoppingCart():Observable<number>{
    return this.shoppingCart
  }


  // Quitar un producto del carrito de compras

  removeProductFromShoppingCart(product:Product):void{
    let products:Product[] = JSON.parse(localStorage.getItem('products'));
    this.shoppingCart.next(products.length-1)
    if(products.length != 1){
      localStorage.setItem('products', JSON.stringify(products.filter((el)=> el.slug !== product.slug)))
    }else{
      localStorage.removeItem('products')
    }
  }


  private _normalizeURL(value:String):String{
    // Para quitar las tíldes
    let base = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Formatear a un String a un slug válido
    return base.replace(/[^\w-\s]/g,'')
            .trim()
            .replace(/\s+/g,'-')
            .toLowerCase()
  }

}
