import { Component, OnInit, Input } from '@angular/core';
import { LoginData } from '../user/datatype';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
@Input() data:LoginData ={
    username:'',
    password:''
  };

  login:boolean =false;
  error=false;
  error_message:string;
  response;

  constructor( 
    private userService: UserService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.isLogin();
    this.error=false;
  }

  submit(): void{ 
    this.userService.userLogin(this.data)
    .subscribe(
      res=>{
        console.log(res);
        if(res['code']==200)
        {
          console.log("success");
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log(error.error);
        this.err(error.error.code);
      }
    );
  }

  err(code:number): void{
    this.error=true;
    if(code==403)this.error_message="Access denied!";
    else this.error_message="Internal error! Please contact admin!";
  }

  isLogin():void{
    this.userService.getUid()
    .subscribe(
      res=>{
        if(res['uid']!=0)this.login=true;
        else this.login=false;
      },
      error => {
        console.log(error.error.code);
        this.err(error.error.code);
      },
    )
  }

  logout(){
    this.userService.logout()
    .subscribe(
      res=>{
        if(res['code']==200)
        {
          console.log("success");
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log(error.error);
        this.err(error.error.code);
      }
    );
  }
}
