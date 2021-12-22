import { InspectionRequestService } from './../inspectionRequest.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecurrenceService } from './../../../recurrence/recurrence.service';
import { UtilsService } from './../../../../../utils.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './approve.template.html',
    styleUrls: ['./approve.template.css'],
    providers: [
        UtilsService,
        RecurrenceService,
        InspectionRequestService
    ]
})
export class ApproveDialog implements OnInit {
    serviceId: any;
    InspectionDate: any;
    recurrenceName: any;
    recurrences: any;
    authToken: any;
    moreDetails: any;
    // days: any;
    // recurrenceName: any;
    // authToken: string | boolean;
    btnLabel = 'Approve';
    btnStatus = true;
    today = new Date();
    minDate = new Date(this.today.getTime() - (24 * 60 * 60 * 1000));
    constructor(
        public _approveDialog: MatDialogRef<ApproveDialog>,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _recurrenceService: RecurrenceService,
        private _inspectionRequest: InspectionRequestService,

    ) {

    }
    ngOnInit() {
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
                this.recurrences = response.data;
                // console.log(this.recurrences);
            });
    }

    /** APPROVE INSPECTION REQUEST */
    requestApprove() {
        this.btnStatus = false;
        this.btnLabel = 'Approving! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('recurrence', this.recurrenceName);
        const year  = this.InspectionDate.getFullYear();
        const month = this.InspectionDate.getMonth()+1;
        const day = this.InspectionDate.getDate();
        this.InspectionDate = year+"-"+month+"-"+day;

        input.append('inspectionDate', this.InspectionDate);
        input.append('serviceId', this.serviceId);
        this._inspectionRequest.requestApprove(input)
            .subscribe(response => {
                // console.log(response);
                if (response.response_code === '1') {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._approveDialog.close();
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                    this._approveDialog.close();
                }
            });
    }

    /** CLOSE MDDIALOG  */
    close() {
        this._approveDialog.close();
    }
}
