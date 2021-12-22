import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ResetpasswordService } from './resetpassword.service';

@Component({
    templateUrl: './resetpassword.template.html',
    styleUrls: ['./resetpassword.template.css'],
    providers: [
        UtilsService,
        ResetpasswordService
    ]
})

export class ResetPasswordDialog implements OnInit {
  //  _ResetpasswordService: any;
    snackMessage: any;
    resetPwdBtnStatus = true;
    resetPwdBtnLabel = 'Reset Password';
    currentPassword: any;
    newPassword: any;
    confirmPassword: any;
    authToken : any;
    userName : any;
    // resetPwdFormStatus = false;
    btnStatus: boolean;
    //imageUrl: string;
    moreDetails: any;
    constructor(
         public _ResetpasswordService: ResetpasswordService,
        public _dialog: MatDialogRef<ResetPasswordDialog>,
        private _snackBar: MatSnackBar,
        public _mdDialog: MatDialog,
        private _utils: UtilsService,
    ) { // this.imageUrl = this._utils.imageUrl;
    }
    

/*CLOSE DIALOG*/
close() {
    this._dialog.close();
}
ngOnInit() {
 
  this.fetchCommonTask();
 
}

fetchCommonTask() {
  this.authToken = this._utils.fetchAuthtokenTokenString();
  const input = new FormData();
  input.append('token', this.authToken);
  this._utils.fetchCommonDetails(input)
    .subscribe(response => {
     
      this.userName = response.data[0].userName;
     
    });
}


 /**RESET PASSWORD */
 reset() {
      if (this.newPassword === this.confirmPassword) {
        this.authToken = this._utils.fetchAuthtokenTokenString();

      this.resetPwdBtnStatus = false;
      this.resetPwdBtnLabel = 'Resetting! Please wait...';
      const input = new FormData();
      input.append('token', this.authToken);
      input.append('username', this.userName);
      input.append('password', this.currentPassword);
      input.append('newpassword', this.newPassword);
    //   console.log(this.newPassword);
    //   console.log(this.confirmPassword);
      this._ResetpasswordService.resetPwd(input)
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
            this._dialog.close();
          }
        })
    } else {
      this.snackMessage = 'The new password and confirm password are not same.';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000
      });
    }
  }
}