import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';       // Routing Module implemented Lazy Loading
import { AppComponent } from './app.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module'
import { HttpClientModule } from '@angular/common/http';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUserComponent } from './add-user/add-user.component';
import { DatePipe } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchFilterPipe } from './Pipes/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopmenuComponent,
    CustomerDetailsComponent,
    AddUserComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
