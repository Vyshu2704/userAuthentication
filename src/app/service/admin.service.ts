import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../common/constants/endpoint.def';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 

  constructor(private http:HttpClient) { }

  // createLoginDetails(loginData:any):Observable<any>{
  //   // var body={email,password}
  //   return this.http.post(environment.springBootBaseUrl + ApiEndpoint.DETAILS.CREATE_USER_DETAILS,loginData)
  // }

  getAllUserDetails():Observable<any>{
    return this.http.get(environment.springBootBaseUrl+ApiEndpoint.USERS.GET_ALL_USER_DETAILS)
  }
}
