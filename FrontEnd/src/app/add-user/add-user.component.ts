import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app-validators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  loginDetail:boolean = true;
  profileDetail:boolean = false;
  registrationForm:FormGroup;
  profileForm:FormGroup
  hide = true;
  hide1 = true;
  addReqResponse:any=[];
  imgURL: any='';
  imageString=''
  dob: string | null;
  addUser:boolean;
  updateUser:boolean;
  customerDetail:any=[];
  customerId='';
  updateResponse:any=[];
  constructor(public formBuilder: FormBuilder,private appService:AppService,public dialogRef: MatDialogRef<CustomerDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar,public datePipe:DatePipe) { }

  ngOnInit(): void {  
    this.customerDetail = this.data;   
    this.registrationForm = this.formBuilder.group({
      'userName':['',Validators.required],
      'firstName':['',Validators.required],
      'lastName':['',Validators.required],
      'dob':['',Validators.required],
      'email':['',Validators.required],
      'phone':['',Validators.required],
      'gender':['',Validators.required],
      'password':['',Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

    this.profileForm = this.formBuilder.group({
      "address":['',Validators.required],
      "landmark":['',Validators.required],
      "country":['',Validators.required],
      "state":['',Validators.required],
      "city":['',Validators.required],
      "zipCode":['',Validators.required]
    })
    
    this.addUser = (this.customerDetail.length == 0)? true : false;
    this.updateUser = (this.customerDetail.length != 0)? true : false;
    if(this.updateUser == true)  this.setValue();    
  }
  // Get image 
  selectedFile(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      this.imgURL = reader.result; 
      var Img = reader.result;
      this.imageString =(<string>Img).split("base64,")[1];
    }
  }
  onProceed(type:any)
  {
    if(this.registrationForm.invalid)
    {
      this._snackBar.open('PLease Fill All Fields Correctly', '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
    }
    else{
      this.profileDetail = true;
      this.loginDetail=false;      
    }
  }
  // Add User 
  onSave()
  {
    const payload = {
      "userName":this.registrationForm.controls["userName"].value,
      "firstName":this.registrationForm.controls["firstName"].value,
      "lastName":this.registrationForm.controls["lastName"].value,
      "email":this.registrationForm.controls["email"].value,
      "phone":this.registrationForm.controls["phone"].value,
      "dob":this.registrationForm.controls["dob"].value,
      "gender":this.registrationForm.controls["gender"].value,
      "password":this.registrationForm.controls["password"].value,
      "confirmPassword":this.registrationForm.controls["confirmPassword"].value,
      "address":this.profileForm.controls["address"].value,
      "landmark":this.profileForm.controls["landmark"].value,
      "city":this.profileForm.controls["city"].value,
      "state":this.profileForm.controls["state"].value,
      "country":this.profileForm.controls["country"].value,
      "zipCode":this.profileForm.controls["zipCode"].value,
      "image":this.imageString
    }
    this.appService.insertCustomers(payload).subscribe(res=>{
      this.addReqResponse = res;
      if(this.addReqResponse["status"] != 1)
      {
        const message = this.addReqResponse[0]["message"];
        this._snackBar.open(message, '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
      }
      else{
        this.dialogRef.close();
        window.location.reload();
      }     
    })
  }
  // Update User
  onUpdate()
  {
    const payload = {
      "userName":this.registrationForm.controls["userName"].value,
      "firstName":this.registrationForm.controls["firstName"].value,
      "lastName":this.registrationForm.controls["lastName"].value,
      "email":this.registrationForm.controls["email"].value,
      "phone":this.registrationForm.controls["phone"].value,
      "dob":this.registrationForm.controls["dob"].value,
      "gender":this.registrationForm.controls["gender"].value,
      "password":this.registrationForm.controls["password"].value,
      "confirmPassword":this.registrationForm.controls["confirmPassword"].value,
      "address":this.profileForm.controls["address"].value,
      "landmark":this.profileForm.controls["landmark"].value,
      "city":this.profileForm.controls["city"].value,
      "state":this.profileForm.controls["state"].value,
      "country":this.profileForm.controls["country"].value,
      "zipCode":this.profileForm.controls["zipCode"].value,
      "image":this.imageString,
      "customerId":this.customerId
    }
    this.appService.updateCustomer(payload).subscribe(res=>{
      this.updateResponse = res;
      if(this.updateResponse["status"] != 1)
      {
        const message = this.updateResponse["message"];
        this._snackBar.open(message, '×', { panelClass: ['error'], verticalPosition: 'top', duration: 3000 });
      }
      else{
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }
  // set fileds value for update
  setValue()
  {
    this.registrationForm.controls['userName'].setValue(this.customerDetail["userName"]);
    this.registrationForm.controls['firstName'].setValue(this.customerDetail["firstName"]);
    this.registrationForm.controls['lastName'].setValue(this.customerDetail["lastName"]);
    this.registrationForm.controls['email'].setValue(this.customerDetail["email"]);
    this.registrationForm.controls['phone'].setValue(this.customerDetail["phone"]);
    this.registrationForm.controls['dob'].setValue(this.customerDetail["dob"]);
    this.registrationForm.controls['password'].setValue(this.customerDetail["password"]);
    this.registrationForm.controls['confirmPassword'].setValue(this.customerDetail["confirmPassword"]);
    this.registrationForm.controls['gender'].setValue(this.customerDetail["gender"]);
    this.profileForm.controls['address'].setValue(this.customerDetail["address"]);
    this.profileForm.controls['landmark'].setValue(this.customerDetail["landmark"]);
    this.profileForm.controls['country'].setValue(this.customerDetail["country"]);
    this.profileForm.controls['state'].setValue(this.customerDetail["state"]);
    this.profileForm.controls['city'].setValue(this.customerDetail["city"]);
    this.profileForm.controls['zipCode'].setValue(this.customerDetail["zipCode"]);
    this.imageString = this.customerDetail["image"];
    this.imgURL = this.customerDetail["image"];
    this.customerId = this.customerDetail["customerId"];
    
  }
  closeDialog()
  {
    this.dialogRef.close();
  } 

}
