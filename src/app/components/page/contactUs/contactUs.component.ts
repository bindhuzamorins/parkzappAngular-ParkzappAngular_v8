import { RegisterComplaintDialog } from './registerComplaint/registerComplaint.template';
import { UtilsService } from './../../../utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ContactUsService } from "app/components/page/contactUs/contactUs.service";
import { NgForm } from "@angular/forms/";
import { EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css'],
  providers: [
    ContactUsService,
    UtilsService
  ]
})

export class ContactUsComponent implements OnInit {
  priorities: any;
  image: any;
  body: any;
  subject: any;
  email: any;
  name: any;
  authToken: any;
  btnStatus = true;
  btnLabel = 'Submit your inquiry';
  constructor(
    public _mdDialog: MatDialog,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _contactUsService: ContactUsService,
  ) { }

  ngOnInit() {
  }

  /**REGISTER COMPLAINT FORM */
  registerComplaint() {
    const dialog = this._mdDialog.open(RegisterComplaintDialog, { disableClose: true });
  }


  /*Send queries*/
  add(form: NgForm) {

    this.btnStatus = false;
    this.btnLabel = 'Submitting! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('name', this.name);
    input.append('email', this.email);
    input.append('subject', this.subject);
    input.append('message', this.body);

    this._contactUsService.sendData(input)
      .subscribe(response => {
        if (response.response_code == 1) {
          console.log(response.response_code);
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.btnStatus = true;
          this.btnLabel = 'Submit your inquiry';
          form.resetForm();

        }
        else {
          console.log(response.response_code);
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });

          this.btnStatus = true;
          this.btnLabel = 'Submit your inquiry';
        }
      });
  }
  trimme()
  {
    this.name=this.name.trimLeft();
  }

}
