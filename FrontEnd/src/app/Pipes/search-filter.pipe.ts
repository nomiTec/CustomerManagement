import { Pipe, PipeTransform } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  constructor(private _snackBar: MatSnackBar){}
  transform(customersList:any,searchTxt:string,searchBy:string): any {
    if(searchTxt && !searchBy){
      return this._snackBar.open("Please Select Search By First", '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
    }
    if(searchBy == 'uName'){
      if(!searchTxt) return customersList;
      customersList = customersList.filter((i:any)=>i.userName.toString().toLowerCase().includes(searchTxt.toLowerCase()))
    return customersList;
    }
    else if(searchBy == 'email')
    {
    if(!searchTxt) return customersList;
    customersList = customersList.filter((i:any)=>i.email.toString().toLowerCase().includes(searchTxt.toLowerCase()))
    return customersList;
    }
    else{
      return customersList
    }
    
  }

}
