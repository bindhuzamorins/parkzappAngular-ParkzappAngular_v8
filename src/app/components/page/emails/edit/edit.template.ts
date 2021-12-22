import { EmailsService } from './../emails.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/';
import { MatSnackBar } from '@angular/material/';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        EmailsService,
        UtilsService
    ]
})
export class EditEmailDetailsDialog implements OnInit {
    moreDetails: any;
    btnStatus = false;
    btnLabel = 'Update email';
    authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog: MatDialogRef<EditEmailDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _emailsService: EmailsService,
        private _utils: UtilsService

    ) {

    }

    ngOnInit() {
    }

    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }


    /**Edit Email */
    edit(value: any) {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('emailId', value.email);
        input.append('name', value.name);
        input.append('description', value.description);
        this._emailsService.update(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this._dialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Update email';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}