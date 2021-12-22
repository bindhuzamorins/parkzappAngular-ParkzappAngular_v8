import { InspectionReportService } from './../inspectionReport.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AddInspectionNoteComponent } from '../../inspectionNote/add-inspection-note/add-inspection-note.component';
import { ViewInspectionNoteComponent } from '../../inspectionNote/view-inspection-note/view-inspection-note.component';

@Component({
    moduleId: module.id,
    templateUrl: './viewMore.template.html',
    styleUrls: ['./viewMore.template.css'],
    providers: [
        UtilsService,
        InspectionReportService,
    ]
})
export class ViewMoreDialog implements OnInit {
    parkImage: any;
    parkName: any;
    mainHead: any;
    fieldsStatus = false;
    questionreportsSetDetails: any;
    imageUrl: string;
    queries: any;
    questionSetDetails: any;
    reports: any;
    parkId: any;
    inspectedDate: any;
    inspectionType: any;
    authToken: any;
    moreDetails: any;
    certificateStatus = false;
    certificateNumber: any;


    constructor(
        public _viewMoreDialog: MatDialogRef<ViewMoreDialog>,
        public _mdDialog: MatDialog,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        private _inspectionReportService: InspectionReportService,

    ) {
    }
    ngOnInit() {
        this.viewMore();
        this.imageUrl = this._utils.imageUrl;

    }

    goToLink(value) {
        console.log(value);
        window.open(this.imageUrl + value, "_blank");
    }

    /** VIEW MORE DETAILS OF INSPECTION REPORT  */
    viewMore() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        console.log(this.moreDetails.id);
        input.append('parkId', this.moreDetails.parkId);
        input.append('inspectionType', this.moreDetails.inspectionType);
        input.append('inspectedDate', this.moreDetails.inspectedDate);
        console.log(this.moreDetails);

        this._inspectionReportService.inspectionReportDetails(input)
            .subscribe(response => {
                console.log(response);

                if (response.response_code === '1') {
                    this.reports = response.data;
                    this.mainHead = response.data[0];
                    this.parkName = this.mainHead.parkName;
                    this.parkImage = this.mainHead.parkImage;
                    this.fieldsStatus = true;
                    if (this.moreDetails.certificateNumber != '') {
                        this.certificateStatus = true;
                        this.certificateNumber = this.moreDetails.certificateNumber;
                    }

                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });
    }
    addNote(value) {
        const checkListStatus = '0';
        const _dialog = this._mdDialog.open(AddInspectionNoteComponent, { disableClose: true });
        _dialog.componentInstance.moreDetails = value;
        _dialog.componentInstance.checkList = checkListStatus;
        _dialog.afterClosed().subscribe(result => {
            this.viewMore();
        });
    }
    viewNote(value) {
        const checkListStatus = '0';
        const _dialog = this._mdDialog.open(ViewInspectionNoteComponent, { disableClose: true });
        _dialog.componentInstance.moreDetails = value;
        _dialog.componentInstance.checkList = checkListStatus;

        _dialog.afterClosed().subscribe(result => {
            // this.fetchData();
        });
    }
    // fetchData() {
    // const input = new FormData();
    // input.append('serviceId', this.serviceId);
    // input.append('token', this.authToken);
    // this._recordsService.fetchData(input)
    //   .subscribe(response => {
    //     if (response.response_code === '1') {
    //       this.dataFetchStatus = true;
    //       this.records = response.data;
    //       if (this.records == null) {
    //         this.tableDataStatus = false;
    //       } else {
    //         this.tableDataStatus = true;
    //         const len = this.records.length;
    //         this.items = [];
    //         for (let i = 0; i < len; i++) {
    //           this.items.push({
    //             asset_name: response.data[i].asset_name
    //           });
    //         }
    //       }

    //     } else {
    //       this.snackMessage = response.message;
    //       this._snackBar.open(this.snackMessage, 'OKAY', {
    //         duration: 5000,
    //       });
    //     }

    //   })
    // }
    /** PRINT INSPECTION REPORT */
    /*print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }*/
    /** CLOSE MDDIALOG  */
    close() {
        this._viewMoreDialog.close();
    }
}
