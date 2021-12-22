import { RecurrenceService } from './../recurrence.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        UtilsService,
        RecurrenceService
    ]
})
export class AddRecurrenceDialog implements OnInit {
    serviceId: any;
    days: any;
    recurrenceName: any;
    authToken: any;
    btnLabel = 'Add new recurrence';
    btnStatus = true;

    constructor(
        public _addDialog: MatDialogRef<AddRecurrenceDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _recurrenceService: RecurrenceService
    ) {

    }
    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
    }

    /** ADD RECURRENCE */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('schedule_name', this.recurrenceName);
        input.append('days', this.days);
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        console.log(this.serviceId);
        this._recurrenceService.addData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._addDialog.close();
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
        this._addDialog.close();
    }
}
