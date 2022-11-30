import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  urls = "http://localhost:3000/"
  public KEY ="urbanfit@123";
  constructor(private http:HttpClient) { }

  selectCustomer()
  {
    return this.http.get(this.urls + 'selectCustomers')
    // return this.http.get(this.urls+"getUser")
  }
  getCustomerDetail(id:any)
  {
    return this.http.post(this.urls + 'selectCustomerById/'+id,{})
  }
  insertCustomers(data:any)
  {
    return this.http.post(this.urls + 'insertCustomer',data)
  }
  updateCustomer(data:any)
  {
    return this.http.post(this.urls + 'updateCustomer',data)
  }
  deleteCustomer(id:any)
  {
    return this.http.post(this.urls + 'deleteCustomer/'+id,{})
  }
}
