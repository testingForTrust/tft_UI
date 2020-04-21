import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../login/user.service';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 private showLogin : boolean = true;
 private showLogout : boolean = false;
 private loggedinUserName : String ="";

 constructor(private userService: UserService, private router: Router){ }

  ngOnInit() {
    let user = sessionStorage.getItem('currentUser');
    if(user){
      this.showLogin = false;
      this.showLogout = true;
      this.loggedinUserName = JSON.parse(sessionStorage.getItem('currentUser')).name;
    }
  }

  /* */private loginCheckValue($event){

  if($event){
    this.showLogout = true;
    this.showLogin = false;
    this.loggedinUserName = JSON.parse(sessionStorage.getItem('currentUser')).name;
  }else{
    this.showLogout = false;
    this.showLogin = true;
  }

  }

  private logout()
  {
    this.userService.logoutUser().subscribe(
      response => {
        //sessionStorage.removeItem('currentUser');
        //sessionStorage.removeItem('userToken');
        sessionStorage.clear();
        this.showLogout = false;
        this.showLogin = true;
        this.router.navigate(['\homepage']);

      },
      error =>{
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userToken');
        this.showLogout = false;
        this.showLogin = true;
        this.router.navigate(['\homepage']);

        //alert("Token is not valid!!!");
      }
    );

  }

  navigateToHP(){
    this.router.navigate(['\homepage']);
  }

}
