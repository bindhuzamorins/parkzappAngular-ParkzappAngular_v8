import { DeleteEmailDetailsDialog } from './delete/delete.template';
import { EditEmailDetailsDialog } from './edit/edit.template';
import { AddEmailDetailsDialog } from './add/add.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';
import { EmailsService } from './emails.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css'],
  providers: [
    EmailsService,
    UtilsService
  ]
})
export class EmailsComponent implements OnInit {
  tableDataStatus: boolean = true;
  dataStatus: boolean;
  emails: any;
  dataFetchStatus = false;
  items: any[];
  snackMessage: any;
  filterArray: any;

  private authToken:any = this._utils.fetchAuthtokenTokenString();

  constructor(
    private _emailsSetvice: EmailsService,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    public _mdDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.fetchEmail();
  }

  /**FETCH EMAIL DETAILS */
  fetchEmail() {
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._emailsSetvice.fetchData(input)
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
       
          this.dataStatus = false;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }


  /**ADD BUTTON */
  add() {
    const _dialog = this._mdDialog.open(AddEmailDetailsDialog, { disableClose: true });
    _dialog.afterClosed().subscribe(result => {
      this.fetchEmail();
    });

  }

  /**EDIT BUTTON */
  edit(value: any) {
    const _dialog = this._mdDialog.open(EditEmailDetailsDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchEmail();
    });
  }

  /**DELETE */
  delete(value: any) {
    const _dialog = this._mdDialog.open(DeleteEmailDetailsDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchEmail();
    });
  }
}
