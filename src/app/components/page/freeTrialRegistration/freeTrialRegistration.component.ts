import { MatSnackBar } from '@angular/material/snack-bar';
import { FreeRegistrationService } from './freeTrialRegistration.service';
import { UtilsService } from 'app/utils.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freeTrialRegistration',
  templateUrl: './freeTrialRegistration.component.html',
  styleUrls: ['./freeTrialRegistration.component.css'],
  providers: [
    FreeRegistrationService,
    UtilsService
  ]
})
export class FreeTrialRegistrationComponent implements OnInit {
  btnStatus = true;
  username: any;
  firstName:any;
  lastName:any;
  password:any;
  email:any;
  checkbox:any;
  verificationCode: any;
  otp: any;
  verificationCodeField: boolean;
  snackMessage: any;
  btnLabel = 'Trial Register';
  btnName = 'Send OTP';
  otpButtonStatus = true;

  constructor(
    public _freeRegistrationService: FreeRegistrationService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _appComponent: AppComponent,
    private _router: Router
  ) { }

  ngOnInit() {
    this._appComponent.loggedInstatus = false;
  }

  /** CODE FOR SHOW VERIFICATION CODE FIELD */
  showOtpButton() {
    this.otpButtonStatus = true;
  }
  /**CHECK USERNAME IS UNIQUE OR NOT */
  checkUsername(value: any) {
    const input = new FormData();
    input.append('userName', value);
    this._freeRegistrationService.checkUsername(input)
      .subscribe(response => {
        if (response.response_code === '1') {

        } else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.username = null;
        }
      });
  }
  /**SEND VERIFICATION CODE  */
  sendVerificationCode(value: any) {
    this.btnName = 'Sending! Please wait...';
    const input = new FormData();
    input.append('email', value);
    this._freeRegistrationService.sendVerificationCode(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.verificationCodeField = true;
          this.otpButtonStatus = false;
          this.otp = response.verificationCode;
          this.btnName = 'Send OTP';
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }
  
  /** COMPARE OTP */
  compareOtp(value: any) {
    if (this.verificationCode == this.otp) {
      this.snackMessage = 'Email verification successful!';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
      this.verificationCodeField = false;
    } else {
      /*this.snackMessage = 'Verification code does not match!';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
      //this.verificationCode = null;*/
    }
  }
  /** REGISTRATION OF FREE TRIAL ACCOUNT */
  register(value: any) {
    
    this.btnStatus = false;
    this.btnLabel = 'Registering! Please wait...';
    const input = new FormData();
    input.append('planId','1');
    input.append('firstName', value.firstName);
    input.append('lastName', value.lastName);
    input.append('userName', value.username);
    input.append('password', value.password);
    input.append('email', value.email);
    this._freeRegistrationService.freeTrial(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                      this.btnStatus = true;
                   this._router.navigateByUrl('/login'); 
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    
                }
            })
  }
}