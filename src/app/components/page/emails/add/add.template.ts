import { EmailsService } from './../emails.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        EmailsService,
        UtilsService
    ]
})
export class AddEmailDetailsDialog implements OnInit {
    description: any;
    name: any;
    email: any;
    agencyName: any;
    zipCode: any;
    address: any;
    state: any;
    city: any;
    imageFileStatus = true;
    imageFile: any;
    allStates: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Add new email';
    authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog: MatDialogRef<AddEmailDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _emailsService: EmailsService,
        private _utils: UtilsService

    ) {

    }

    ngOnInit() {
    }


    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('emailId', this.email);
        input.append('name', this.name);
        input.append('description', this.description);
        const serviceId = this._utils.fetchServiceId();
        input.append('serviceId', serviceId);
        this._emailsService.add(input)
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
                    this.btnLabel = 'Add new email';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}