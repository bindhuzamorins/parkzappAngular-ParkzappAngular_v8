import { RecurrenceService } from './../recurrence.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        UtilsService,
        RecurrenceService
    ]
})
export class EditRecurrenceDialog implements OnInit {
    serviceId: any;
    authToken: any;
    moreDetails: any;
    btnLabel = 'Update details';
    btnStatus = false;
    recurrenceName: any;
days: any;

    constructor(
        public _editDialog: MatDialogRef<EditRecurrenceDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _recurrenceService: RecurrenceService
    ) {

    }
    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
    }


    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }

    /** EDIT RECURRENCE */
    edit(value: any) {
        // console.log(this.moreDetails.id);
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        input.append('schedule_name', value.recurrenceName);
        input.append('days', value.days);
        input.append('id',this.moreDetails.id);

          this._recurrenceService.editData(input)
              .subscribe(response => {
                  if (response.response_code == 1) {
                      this._snackBar.open(response.message, 'CLOSE', {
                          duration: 2000,
                      });
                      this._editDialog.close();
                  }
                  else {
                      this._snackBar.open(response.message, 'CLOSE', {
                          duration: 2000,
                      });
                      this.btnStatus = true;
                      this.btnLabel = 'Add new recurrence';
                  }
              })
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._editDialog.close();
    }
}
