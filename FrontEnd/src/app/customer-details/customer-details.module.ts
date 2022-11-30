import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';

export const routes = [
  { path: '', component: CustomerDetailsComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
,  ]
})
export class CustomerDetailsModule { }
