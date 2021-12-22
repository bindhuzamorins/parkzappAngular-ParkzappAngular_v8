import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../../utils.service';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  moduleId: module.id,
  templateUrl: './forgotPassword.template.html',
  styleUrls: ['./forgotPassword.template.css'],
  providers: [
    LoginService,
    UtilsService
  ]
})
export class ForgotPasswordDialog {
  newPwd: any;
  newPwdConfirm: any;
  resetPwdCode: any;
  snackMessage: any;
  usernameReset: any;
  zappcodeReset: any;
  verificationCode: any;
  resetFormStatus = true;
  verifyFormStatus = false;
  newPwdFormStatus = false;
  submitBtnStatus = true;
  submitBtnLabel = 'Send verification code';
  resetPwdBtnStatus = true;
  resetPwdBtnLabel = 'Reset Password';

  constructor(
    public forgotPwdRef: MatDialogRef<ForgotPasswordDialog>,
    public _loginService: LoginService,
    private _snackBar: MatSnackBar,

  ) {
  }

  /**SEND VERIFICATION CODE */
  sendVerificationCode() {
    this.submitBtnStatus = false;
    this.submitBtnLabel = 'Sending! Please wait...';
    const input = new FormData();
    input.append('clientCode', this.zappcodeReset);
    input.append('userName', this.usernameReset);
    this._loginService.sendVerificationCode(input)
      .subscribe(response => {
        if (response.response_code === '0') {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
          this.submitBtnLabel = 'Send verification code';
          this.submitBtnStatus = true;
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
          this.resetPwdCode = response.data;
          this.resetFormStatus = false;
          this.verifyFormStatus = true;
        }
      });
  }

  /*CODE VERIFICATION */
  verifyCode() {
    if (this.verificationCode == this.resetPwdCode) {
      this.verifyFormStatus = false;
      this.newPwdFormStatus = true;
    }
    else {
      this.snackMessage = 'Please provide correct verification code';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
    }
  }


  /**RESET PASSWORD */
  resetPassword() {
    if (this.newPwd === this.newPwdConfirm) {
      this.resetPwdBtnStatus = false;
      this.resetPwdBtnLabel = 'Resetting! Please wait...';
      const input = new FormData();
      input.append('clientCode', this.zappcodeReset);
      input.append('userName', this.usernameReset);
      input.append('password', this.newPwdConfirm);
      this._loginService.resetPwd(input)
        .subscribe(response => {
          if (response.response_code === '0') {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000
            });
            this.resetPwdBtnStatus = true;
            this.resetPwdBtnLabel = 'Reset Password';
          } else {
            this.snackMessage = response.message;
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000
            });
            this.forgotPwdRef.close();
          }
        })
    } else {
      this.snackMessage = 'Above fields are not same';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
    }


  }

  /*CLOSE DIALOG*/
  close() {
    this.forgotPwdRef.close();
  }

}