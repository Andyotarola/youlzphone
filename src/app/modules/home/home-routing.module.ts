import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './home.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from 'src/app/data/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'carrito',
    component:ShoppingCartComponent
  },
  {
    path:'editar-perfil',
    component:ProfileComponent,
    canActivate:[
      AuthGuard
    ]
  },
  {
    path:':slug',
    component:ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
