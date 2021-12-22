import { InspectionReportService } from './../inspectionReport.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './mail.template.html',
    styleUrls: ['./mail.template.css'],
    providers: [
        UtilsService,
        InspectionReportService
    ]
})
// tslint:disable-next-line:component-class-suffix
export class SentMailDialog implements OnInit {
    email: any;
    authToken: any;
    btnLabel = 'Send';
    btnStatus = true;
    moreDetails: any;


    constructor(
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _sentMailDialog: MatDialogRef<SentMailDialog>,
        private _inspectionReportService: InspectionReportService

    ) {

    }
    ngOnInit() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
    }

    /** SENDING MAIL */
    send() {
        this.btnStatus = false;
        this.btnLabel = 'Sending! Please wait...';
        // this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('email', this.email);
        input.append('id', this.moreDetails.id);
        input.append('inspectionType', this.moreDetails.inspectionType);
        input.append('inspectedDate', this.moreDetails.inspectedDate);
        input.append('parkId', this.moreDetails.parkId);  

        this._inspectionReportService.send(input)
            .subscribe(response => {
                if (response.response_code === '1') {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._sentMailDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._sentMailDialog.close();
                    this.btnStatus = true;
                }
            });
    }


    /** CLOSE MDDIALOG  */
    close() {
        this._sentMailDialog.close();
    }
}
