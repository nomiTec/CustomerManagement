import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  searchBox:boolean = true;
  searchForm: FormGroup;
  customersList:any = [];
  selectedCustomer =0;
  customerDetail:any=[];
  data:any=[]
  dob: any;
  searchText:any;
  page: any;
  deleteResp:any={}
  imgURL: '';
  searchByType='';
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private appService:AppService,private matDialog: MatDialog,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchtext: []

    });
    this.getCustomer()
  }
  //Open Login And Update Model
  openDialog(type:string) {
    const custDetailtoBeSend = (type == 'updateUser')? this.customerDetail : [];
    this.matDialog.open(AddUserComponent, {
      height: '478px',
      width: '530px',
      data: custDetailtoBeSend,
      maxWidth:'93vw'      
    });
  }
  // Get Customers List
  getCustomer()
  {
    this.appService.selectCustomer().subscribe(res=>{
      this.customersList = res;
      this.selectedCustomer = this.customersList[0].customerId;
      this.getCustomerDetail(this.selectedCustomer);
    })
  }
  selectCustomer(id:any)
  {
    this.selectedCustomer = id;
  }
  //get Customer details By Id 
  getCustomerDetail(id:any)
  {
    this.appService.getCustomerDetail(id).subscribe(res=>{
      this.data = res;
      this.customerDetail = this.data["data"];  
      this.selectedCustomer = this.customerDetail["customerId"]  
      this.imgURL = (this.customersList["image"] != 'N/A')? this.customerDetail["image"]:'';
      const date = this.customerDetail["dob"];
      this.dob = this.datePipe.transform(date, 'MMM-dd-yyyy');
    })
  }
  // hides and shows search bar
  showSearch()
  {
    this.searchBox = !this.searchBox;
    this.searchForm.reset()
  }
  // pagination
  public onPageChanged(event:any){
    this.page = event;
  }
  // sort Data
  sortData(event:any)
  {
    switch (event) {
      case "Low":
        {
          this.customersList = this.customersList.sort((low:any, high:any) => high.userName.toString().toLowerCase() > low.userName.toString().toLowerCase() ? -1:1);
          break;
        }

      case "High":
        {
          this.customersList =  this.customersList.sort((low:any, high:any) => high.userName.toString().toLowerCase() > low.userName.toString().toLowerCase() ? 1:-1);
          break;
        } 
    }
  }
  // Delete Selected User
  deleteCustomer(id:any)
  {  
    var del = confirm('Are You Sure You Want To Delete This User?');
    if(del == true)
    {     
    this.appService.deleteCustomer(id).subscribe(res=>{
      this.deleteResp = res;
      if(this.deleteResp["status"] == 1)
      {
        const msg = this.deleteResp["message"]
        const index: number = this.customersList.findIndex((i:any)=>i.customerId==id)
        if (index !== -1) {
        this.customersList.splice(index,1);
        }
        this._snackBar.open(msg, '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
      }       
    })
  }
  }
  searchBy(type:any)
  {
      this.searchByType = type;
  }
  
}
