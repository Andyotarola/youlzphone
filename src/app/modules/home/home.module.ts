import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [ProductComponent, HomeComponent, ShoppingCartComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule
  ]
})
export class HomeModule { }
