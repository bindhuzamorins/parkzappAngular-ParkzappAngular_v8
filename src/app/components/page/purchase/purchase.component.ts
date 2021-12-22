import { FreeRegistrationService } from './../freeTrialRegistration/freeTrialRegistration.service';
import { UtilsService } from 'app/utils.service';
import { MatSnackBar } from '@angular/material/';
import { PurchaseService } from './purchase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [
    PurchaseService,
    FreeRegistrationService
  ]
})
export class PurchaseComponent implements OnInit {
  username: any;
  firstName: any;
  lastName: any;
  password: any;
  email: any;
  checkbox: any;
  enCodedValue: string;
  enCode: string;
  linkData: any;
  data: any;
  verificationCode: any;
  otp: any;
  snackMessage: any;
  value: any;
  btnLabel = 'Pay & Register';
  btnName = 'Send OTP';
  otpButtonStatus = true;
  verificationCodeField = false;

  constructor(
    private _purchaseServiceils: PurchaseService,
    public _freeRegistrationService: FreeRegistrationService,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.fetchLinkData();
  }

  fetchLinkData() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.linkData = params['da'];
    });
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
  /** CODE FOR SENDING OTP */
  sendVerificationCode(value: any) {
    this.btnName = 'Sending! Please wait...';
    const input = new FormData();
    // console.log(value);
    input.append('email', value);
    this._purchaseServiceils.sendVerificationCode(input)
      .subscribe(response => {
        // console.log(response);
        if (response.response_code === '1') {
          this.verificationCodeField = true;
          this.otpButtonStatus = false;
          // this.otp = response.data;
          this.otp = response.verificationCode;
          // console.log(this.otp);
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
    // console.log(this.otp);
    // console.log(this.verificationCode);
    if (this.verificationCode == this.otp) {
      this.verificationCodeField = false;
    } else {
      /*this.snackMessage = 'Verification code does not match!';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
      this.verificationCode = null;*/
    }
  }

  /** REGISTRATION OF FREE TRIAL ACCOUNT */
  register(value: any) {
    // console.log(value);
    // console.log(this.data);
    const input = new FormData();
    input.append('planId', 'this.linkData');
    input.append('firstName', value.firstName);
    input.append('lastName', value.lastName);
    input.append('userName', value.username);
    input.append('password', value.password);
    input.append('email', value.email);
    this.enCode = this.linkData + '@#$' + value.firstName + '@#$' + value.lastName + '@#$' + value.username + '@#$' + value.password + '@#$' + value.email;
    // console.log(this.enCode);
    this.enCodedValue = btoa(this.enCode);
    // console.log(btoa(this.enCodedValue));
    window.open(this._utils.defaultUrl + 'registration/payment.php?id=' + this.enCodedValue, "_blank");
  }
}
