import { EditRecurrenceDialog } from './edit/edit.template';
import { DeleteRecurrenceDialog } from './delete/delete.template';
import { AddRecurrenceDialog } from './add/add.template';
import { RecurrenceService } from './recurrence.service';
import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';


@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.css'],
  providers: [
    UtilsService,
    RecurrenceService
  ]
})
export class RecurrenceComponent implements OnInit {
  serviceId: any;
  snackMessage: any;
  items: any[];
  recurrences: any;
  authToken: any;
  filterArray: any = { schedule_name: '' };
  dataFetchStatus = false;


  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent,
    private _recurrenceService: RecurrenceService
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchAllRecurrence();
  }

  /** FETCH ALL RECURRENCE */
  fetchAllRecurrence() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    // console.log(this.authToken);
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._recurrenceService.fetchAllRecurrence(input)
      .subscribe(response => {
        // console.log(response);
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.recurrences = response.data;
          const len = this.recurrences.length;
          this.items = [];
          // console.log(this.recurrences);
          for (let i = 0; i < len; i++) {
            this.items.push({
              schedule_name: response.data[i].schedule_name
            });
          }
        } else {
          this.dataFetchStatus = false;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }

      });
  }

  /** ADD RECURRENCE BUTTON  */
  add() {
    const dialog = this._mdDialog.open(AddRecurrenceDialog, { disableClose: true });
    dialog.afterClosed().subscribe(result => {
      this.fetchAllRecurrence();
    });
  }

  delete(value: any) {
    const dialog = this._mdDialog.open(DeleteRecurrenceDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      this.fetchAllRecurrence();
    });
  }

  edit(value: any) {
    const dialog = this._mdDialog.open(EditRecurrenceDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
        dialog.afterClosed().subscribe(result => {
      this.fetchAllRecurrence();
    });
  }

}
