import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component'
import { NoAuthGuard } from 'src/app/data/guard/no-auth.guard'


const routes: Routes = [
  {
    path:'account',
    component:AuthLayoutComponent,
    canActivate:[
      NoAuthGuard
    ],
    loadChildren: ()=>
      import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    component:HomeLayoutComponent,
    loadChildren: () => 
      import('./modules/home/home.module').then(m=>m.HomeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
