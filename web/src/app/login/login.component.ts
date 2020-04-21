import { Component, OnInit, Inject,Injectable, Input, Output, OnChanges, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { error } from 'util';
import { config } from 'rxjs';
import { Config } from 'protractor';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
// @Injectable()
export class LoginComponent implements OnInit {



  loginForm: FormGroup;
  userEmail: FormControl;
  userPassword: FormControl;
  registerForm: FormGroup;
  registerName: FormControl;
  registerEmail: FormControl;
  registerPassword: FormControl;
  registerRepeatPassword: FormControl;
  registerRepeatPasswordtxt = '';
  loginCheck: boolean;
  logoutCheck: boolean;
  // @Input() loginCheck : boolean = true;
  // @Input() logoutCheck : boolean = false;


  // userName = 'Harsha';
  // userPassword = '';

  loginerrorInput ='';
  registererrorInput ='';
  private registerNameCheck = '';
  private registerEmailCheck = '';
  private registerPasswordCheck = '';
  private registerUnexpectedError = '';
  private loginEmailCheck = '';
  private loginPasswordCheck = '';


  //config ='';

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('loginValueCheck') loginValueCheck: EventEmitter<boolean> = new EventEmitter<boolean>();


  //constructor(private formBuilder: FormBuilder) { },
  constructor(private userService: UserService, private router: Router) { };

  ngOnInit() {
    this.createLoginFormControls();
    this.createLoginForm();
    this.createRegisterFormControls();
    this.createRegisterForm();
    //this.loginCheck
    // alert("Hi");
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  createLoginFormControls() {
    this.userEmail = new FormControl('', [
      Validators.email,
      Validators.required,
      // Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.userPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createRegisterFormControls() {
    this.registerName = new FormControl('', Validators.required);
    this.registerEmail = new FormControl('', [
      Validators.email,
      Validators.required,
      // Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.registerPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.registerRepeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8),

    ]);
  }




  createLoginForm() {
    this.loginForm = new FormGroup({
      userEmail: this.userEmail,
      userPassword: this.userPassword
    });
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      registerName: this.registerName,
      registerEmail: this.registerEmail,
      registerPassword: this.registerPassword,
      registerRepeatPassword: this.registerRepeatPassword
    }, this.passwordMatchValidator);
  }

  // ,[this.passwordMatchValidator]
passwordMatchValidator(g: FormGroup) {
   return g.get('registerPassword').value === g.get('registerRepeatPassword').value
      ? null : {'mismatch': true};
}

  login()
  {
    this.userService.loginUser(this.loginForm.value).subscribe(
      resposne => {
                // alert("Welcome "+resposne.name),
                // console.log(resposne);
                this.logoutCheck = true;
                this.loginCheck = false;

                //localStorage.setItem('Token', JSON.stringify(resposne)),
                //window.sessionStorage.setItem('user',"true");
                // this.router.navigate(['\image-classifier']);
                if(resposne.token){
                  //alert("logincheck: "+this.loginCheck+" logoutcheck: "+this.logoutCheck);
                  sessionStorage.setItem('currentUser', JSON.stringify(resposne));
                  sessionStorage.setItem('userToken', JSON.stringify(resposne.token));
                  this.loginValueCheck.emit(true);
                  this.loginForm.setValue({userEmail:'', userPassword:''});
                  this.close();
                  }
                //const keys = resposne.keys();
                //this.headers = keys.map(key => '${key}: ${response.headers.get(key)}')
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error.email){
          alert(err.error.email);
          this.loginEmailCheck = err.error.email;
        }
        else if (err.error.password){
          alert(err.error.password);
          this.loginPasswordCheck = err.error.password;
        }
        else
        alert("Unexpected Error. Please try again!!");

        /*
        this.loginerrorInput=err.error;
        switch(err.error){
          case err.error.email:
              this.loginEmailCheck = err.error.email;
              break;
          case err.error.password:
              this.loginPasswordCheck = err.error.password;
              break;
          default:
              alert("Unexpected Error Please Try Again !!!");
              this.loginPasswordCheck = "wrong passworddddd !!!";
        }
        */
      }
    );
    //console.log(this.loginForm.value);
    //this.close();
  }

  register()
  {
    //console.log(this.registerForm.value);
     this.userService.registerUser(this.registerForm.value).subscribe(
       resposne => {
                    alert("Welcome "+resposne.name),
                    console.log(resposne);
                    this.logoutCheck = true;
                    this.loginCheck = false;
                    // this.router.navigate(['\image-classifier']);
                  if(resposne.token){
                    //alert("logincheck: "+this.loginCheck+" logoutcheck: "+this.logoutCheck);
                    sessionStorage.setItem('currentUser', JSON.stringify(resposne));
                    window.sessionStorage.setItem('userToken', JSON.stringify(resposne.token));
                    this.loginValueCheck.emit(true);
                    //this.loginForm.setValue({userEmail:'', userPassword:''});
                    this.close();
                    }
                  //alert("User "+resposne.name+" is createda")
                  },
      (err: HttpErrorResponse) => {
                      console.log(err);
                      if (err.error.name){
                        alert(err.error.name);
                        this.registerNameCheck = err.error.name;
                      }
                      if (err.error.email){
                        alert(err.error.email);
                        //this.registerEmailCheck = err.error.email;
                        this.registerEmailCheck = "Email must be unique";
                      }
                      if (err.error.password){
                        alert(err.error.password);
                        this.registerPasswordCheck = err.error.password;
                      }

                      /*
                      this.registererrorInput=err.error;
                      switch(err.error){
                        case err.error.email:
                            this.registerEmailCheck = "Email must be unique";
                            break;
                        case err.error.password:
                            this.registerPasswordCheck = err.error.password;
                            break;
                        case err.error.name:
                            this.registerNameCheck = err.error.name;
                            break;
                        default:
                            //this.registerUnexpectedError = "Unexpected Error. Please Try Again..";
                            alert("Unexpected Error Please Try Again !!!");
                      }
                      */
                      //this.arr=err.error,
                      //alert(err.error)
                      /*
                      if (err.error.email) {
                        // we never seem to get here
                        //alert("email: "+err.error.email)
                        this.bderrorInput=err.error.email
                        //console.log(err.error.email);
                      }
                      else if (err.error.password) {
                        //alert(err.error.password)
                        this.bderrorInput=err.error.password
                        //console.log(err.error.email);
                      }
                      else if (err.error.username) {
                        //alert("Username: "+err.error.username)
                        //this.bderrorInput=err.error.username
                        //console.log(err.error.email);
                      }
                      else if (err.error.name) {
                        //alert("Username: "+err.error.first_name)
                        this.bderrorInput=err.error.name
                        //console.log(err.error.email);
                      }
                      else {
                        // no network connection, HTTP404, HTTP500, HTTP200 & invalid JSON
                        alert("Something is wrong. Please Try again!!")
                        //console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                      }
                      */
                    }
     );
    //console.log(this.registerPassword.value);
    //this.close();
  }

  clearLoginPassword(){
    console.log("input password Touched");
    this.loginPasswordCheck = '';
  }
  clearLoginEmail(){
    console.log("input email Touched");
    this.loginEmailCheck = '';
  }
  clearRegisterEmail(){
    console.log("input email Touched");
    this.registerEmailCheck = '';
  }
  clearRegisterPassword(){
    console.log("input email Touched");
    this.registerPasswordCheck = '';
  }
  clearRegisterName(){
    console.log("input email Touched");
    this.registerNameCheck = '';
  }

}
