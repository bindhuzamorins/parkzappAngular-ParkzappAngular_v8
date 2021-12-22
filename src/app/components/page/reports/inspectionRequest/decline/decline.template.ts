import { InspectionRequestService } from './../inspectionRequest.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './decline.template.html',
    styleUrls: ['./decline.template.css'],
    providers: [
        UtilsService,
        InspectionRequestService
    ]
})
export class DeclineDialog implements OnInit {
    authToken: any;
    btnLabel = 'Decline';
    btnStatus = true;
    moreDetails: any;
    serviceId: any;

    constructor(
        public _declineDialog: MatDialogRef<DeclineDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _inspectionRequest: InspectionRequestService,
    ) {

    }
    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
    }


    /** ADD RECURRENCE */
    delete() {
        this.btnStatus = false;
        this.btnLabel = 'Declining! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('serviceId', this.serviceId);
        this._inspectionRequest.requestDecline(input)
            .subscribe(response => {
                // console.log(response);
                if (response.response_code === '1') {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._declineDialog.close();
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._declineDialog.close();
    }
}
