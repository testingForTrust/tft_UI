import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor (private http: HttpClient){ }
  private address: string = 'http://127.0.0.1:8081';
  registerUser(userData): Observable<any>{
    return this.http.post(this.address+'/accounts/register/', userData)
    //.pipe(catchError(this.handleError));
  }
  loginUser(userData): Observable<any>{
    return this.http.post(this.address+'/accounts/user/login/', userData)
       //.pipe(catchError(this.handleError));
  }
  logoutUser():Observable<any>{
    //let headers = new HttpHeaders();
    //headers.set('Authorization', "token "+JSON.parse(sessionStorage.getItem('user')).token);
    //headers.append('token', JSON.parse(sessionStorage.getItem('user')).token);
    //alert(JSON.parse(sessionStorage.getItem('currentUser')).token)
    //alert(headers);
    return this.http.get(this.address+'/accounts/user/logout/', {headers: new HttpHeaders().set('Authorization', "token "+JSON.parse(sessionStorage.getItem('currentUser')).token)});
    //return this.http.get('http://127.0.0.1:8080/accounts/user/logout/', {headers});
  }

}
