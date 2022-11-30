import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopmenuComponent } from './topmenu/topmenu.component';

const routes: Routes = [
  {
    path:'',
    component:TopmenuComponent,
    children:[
      { path:'', loadChildren:()=>import('./customer-details/customer-details.module').then(m=>m.CustomerDetailsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
