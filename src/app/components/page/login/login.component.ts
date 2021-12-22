import { AppComponent } from './../../../app.component';
import { UtilsService } from './../../../utils.service';
import { LoginService } from './login.service';
import { PrivacyPolicyDialog } from './privacyPolicy/privacyPolicy.template';
import { ForgotPasswordDialog } from './forgotPassword/forgotPassword.template';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewServicesDialog } from '../newServices/newServices.templete';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    LoginService,
    UtilsService
  ]
})
export class LoginComponent implements OnInit {
  serviceId: any;
  newservices = 'newservices';
  submitBtnStatus = true;
  submitBtnLabel = 'Sign In';
  zappcode: any;
  username: any;
  password: any;
  snackMessage: string;
  mydate = new Date();
  // formStatus =  false;
  formStatus: boolean;
  versionStatus: any;

  constructor(
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    public _loginService: LoginService,
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.formStatus = false;
    this._appComponent.checkSessionStatusAndRedirectBeforeLogin();
    this.zappcode = localStorage.getItem('userAuth_forparkzapp_zappcode');
    this.username = localStorage.getItem('userAuth_forparkzapp_username');
    this.password = localStorage.getItem('userAuth_forparkzapp_password');
  }

  /**USER AUTHENTICATION */
  checkUser() {
    if (!this.zappcode || !this.username || !this.password) {
      this.snackMessage = 'Please provide all fields';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
    } else {
      const input = new FormData();
      input.append('clientCode', this.zappcode);
      input.append('userName', this.username);
      input.append('password', this.password);
      this.submitBtnLabel = 'Authenticating...';
      this.submitBtnStatus = false;
      this._loginService.checkUser(input)
        .subscribe(response => {
          if (response.response_code === '0') {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000
            });
            this.submitBtnLabel = 'Sign In';
            this.submitBtnStatus = true;
          }
          else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000
            });

            this.formStatus = true;



            this._utils.setAuthtoken(response.data);

            // this._appComponent.loggedInstatus = true;
            this._appComponent.fetchCommonTask();
            this.newServiceButton();
            // this._router.navigateByUrl('/home');
          }
        });
    }
  }
  rememberMe() {

    localStorage.setItem("userAuth_forparkzapp_zappcode", this.zappcode);
    localStorage.setItem("userAuth_forparkzapp_username", this.username);
    localStorage.setItem("userAuth_forparkzapp_password", this.password);

  }
  /**FORGOT PASSWORD DIALOG */
  forgotPwdDialog() {
    const imageHotelRef = this._mdDialog.open(ForgotPasswordDialog, { disableClose: true });
  }

  /**PRIVACY POLICY DIALOG */
  privacyPolicy() {
    const imageHotelRef = this._mdDialog.open(PrivacyPolicyDialog);
  }

  newServiceButton() {
    // this.formStatus=0;
    // this.formStatus =  true;

    const _dialog = this._mdDialog.open(NewServicesDialog, { disableClose: true });
    // console.log(_dialog);
    _dialog.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`); // Pizza!


      this._appComponent.loggedInstatus = true;
      this._appComponent.fetchCommonTask();
      this.serviceId = this._utils.fetchServiceId();


      if (this.serviceId === '1') {
        document.getElementById('greenmenu').setAttribute("data-color", "green")
      }
      if (this.serviceId === '2') {
        document.getElementById('greenmenu').setAttribute("data-color", "azure")
      }
      if (this.serviceId === '3') {
        document.getElementById('greenmenu').setAttribute("data-color", "purple")
      }
      if (this.serviceId === '4') {
        document.getElementById('greenmenu').setAttribute("data-color", "orange")
      }
      if (this.serviceId === '5') {
        document.getElementById('greenmenu').setAttribute("data-color", "red")
      }
      if (this.serviceId === '6') {
        document.getElementById('greenmenu').setAttribute("data-color", "#3E2723")
      }
      this._router.navigateByUrl('/home');
    });
    //this._router.navigateByUrl('/home');
    // this._utils.setAuthtoken(response.data);

  }


}