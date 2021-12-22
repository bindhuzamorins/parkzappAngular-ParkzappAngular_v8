import { AssessmentReportService } from './../assessmentReport.service';
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
        AssessmentReportService
    ]
})
export class mailDialog implements OnInit {
    email: any;
    authToken: any;
    btnLabel = 'Send';
    btnStatus = true;
    moreDetails: any;


    constructor(
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _mailDialog: MatDialogRef<mailDialog>,
        private _assessmentReportService: AssessmentReportService

    ) {

    }
    ngOnInit() {
    }

    /** SENDING MAIL */
    send() {
        this.btnStatus = false;
        this.btnLabel = 'Sending! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();

        console.log(this.moreDetails.assessmentId);
        // console.log(this.email);
        //  console.log(this.moreDetails);

        const input = new FormData();
        input.append('token', this.authToken);
        input.append('email', this.email);
        input.append('assessmentId', this.moreDetails.assessmentId);
        input.append('parkId', this.moreDetails.parkId);


        this._assessmentReportService.send(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._mailDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._mailDialog.close();
                    this.btnStatus = true;
                }
            })
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._mailDialog.close();
    }
}
