import { AddNewMailService } from './AddNewMail.service';
import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    moduleId: module.id,
    templateUrl: './AddNewMail.template.html',
    styleUrls: ['./AddNewMail.template.css'],
    providers: [
        AddNewMailService,
        UtilsService
    ]
})
export class AddNewMailDialog implements OnInit {
   
  serviceId: any;
    description: any;
    name: any;
    authToken : any;
    tableDataStatus: boolean = true;
    dataStatus: boolean;
    emails: any;
    email:any;
    snackMessage: any;
    dataFetchStatus = false;
    items: any[];
    filterArray: any;
    imageFileStatus = true;
    imageFile: any;
    allStates: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Add new email';
   
    constructor(
        public _dialog: MatDialogRef<AddNewMailDialog>,
        private _snackBar: MatSnackBar,
        public _mdDialog: MatDialog,
        private _utils: UtilsService,
        private addnewemail: AddNewMailService
    ) {
      
    }

    ngOnInit() {
      this.authToken = this._utils.fetchAuthtokenTokenString();
      this.serviceId = this._utils.fetchServiceId();
    }

     /*CLOSE DIALOG*/
    

      /**FETCH EMAIL DETAILS *
    fetchEmail() {
    const input = new FormData();
    input.append('token', this.authToken);
    this.AddNewMailService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataStatus = true;
          this.filterArray = { emailId: '' };
          this.dataFetchStatus = true;
          this.emails = response.data;
          if (this.emails == null) {
            this.tableDataStatus = false;
          } else {
            this.tableDataStatus = true
            const len = this.emails.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                emailId: response.data[i].emailId
              });
            }
          }
        } else {
          alert('hi');
          this.dataStatus = false;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }


//   /**ADD BUTTON */
  add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        input.append('emailId', this.email);
        input.append('name', this.name);
        input.append('description', this.description);
         this.addnewemail.add(input)
             .subscribe(response => {
               console.log(response);
                 if (response.response_code == 1) {
                     this._snackBar.open(response.message, 'CLOSE', {
                         duration: 5000,
                     });
                     this._dialog.close();
                 }else {
                     this._snackBar.open(response.message, 'CLOSE', {
                         duration: 5000,
                     });
                     this.btnStatus = true;
                     this.btnLabel = 'Add new email';
                 }
             });
    }
    close() {
      this._dialog.close();
  }
}