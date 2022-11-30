import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, 
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
    
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatCardModule, 
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
