import { RecurrenceService } from './../recurrence.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './delete.template.html',
    styleUrls: ['./delete.template.css'],
    providers: [
        UtilsService,
        RecurrenceService
    ]
})
export class DeleteRecurrenceDialog implements OnInit {
    authToken: any;
    btnLabel = 'Delete';
    btnStatus = true;
    moreDetails: any;


    constructor(
        public _deleteDialog: MatDialogRef<DeleteRecurrenceDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _recurrenceService: RecurrenceService
    ) {

    }
    ngOnInit() {
    }

    /** ADD RECURRENCE */
    delete() {
        this.btnStatus = false;
        this.btnLabel = 'Deleting! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('id', this.moreDetails.id);
        input.append('token', this.authToken);
        this._recurrenceService.deleteData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this._deleteDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Delete';
                }

            })
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._deleteDialog.close();
    }
}
