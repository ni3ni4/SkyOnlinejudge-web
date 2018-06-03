import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LoginData, RegData, ResponseData } from './datatype';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'/*,'accept': 'application/json' */})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL={
    user:'https://pc2.tfcis.org/dev/api.php/user',
    login:'/login',
    register:'/register',
    logout: '/logout'
  };
  response;

  constructor( private http: HttpClient ) { }

  userLogin(data: LoginData ) {
    return this.http.post(this.URL.user+this.URL.login, data);
    /*
    .subscribe(
      res=>{
        console.log(res);
        this.response= res.code;
        return this.response;
      },
      error => {
        console.log(error.error.code);
        this.response= error.error.code;
        return this.response;
      }
    );
    */
  }
  userRegister(data: RegData){
    return this.http.post(this.URL.user+this.URL.register, data);
    /*.subscribe(
      res=>{
        console.log(res);
        this.response= res.code;
      },
      error => {
        console.log(error.error.code);
        this.response= error.error.code;
      }
    );
    */
  }
  testRemote():void{
    console.log("remote test");
    this.http.get('https://pc2.tfcis.org/dev/api.php/ping?text=a').subscribe(data=>console.log(data));
  }

  getUid(){
    return this.http.get('https://pc2.tfcis.org/dev/api.php/ping?text=a');
  }

  logout(){
    return this.http.post(this.URL.user+this.URL.logout,"1");
  }
}
