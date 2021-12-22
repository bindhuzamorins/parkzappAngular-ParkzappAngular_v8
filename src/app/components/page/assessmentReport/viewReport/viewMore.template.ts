import { AssessmentReportService } from './../assessmentReport.service';
// import { InspectionReportService } from './../inspectionReport.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { InspectionReportService } from "app/components/page/inspectionReport/inspectionReport.service";
import { AddInspectionNoteComponent } from '../../inspectionNote/add-inspection-note/add-inspection-note.component';
import { ViewInspectionNoteComponent } from '../../inspectionNote/view-inspection-note/view-inspection-note.component';

@Component({
    moduleId: module.id,
    templateUrl: './viewMore.template.html',
    styleUrls: ['./viewMore.template.css'],
    providers: [
        UtilsService,
        InspectionReportService,
        AssessmentReportService
    ]
})
export class ViewMoreAssessmentDialog implements OnInit {
    assessmentId: any;
    time: any;
    inspectorName: any;
    inspectedDate: any;
    city: any;
    streetAddress: any;
    parkName: any;
    parkImage: any;
    reports: any;
    authToken: any;
    imageUrl: string;
    moreDetails: any;
    fieldsStatus = false;
    certificateStatus = false;
    certificateNumber: any;
    // _mdDialog: any;
    // checkList: any;
    checkListStatus = false;
    parkHistory: boolean;


    /*parkImage: any;
    parkName: any;
    mainHead: any;
    questionreportsSetDetails: any;
    imageUrl: string;
    queries: any;
    questionSetDetails: any;
    reports: any;
    parkId: any;
    inspectedDate: any;
    inspectionType: any;
    authToken: string | boolean;
    moreDetails: any;*/

    constructor(
        public _viewMoreDialog: MatDialogRef<ViewMoreAssessmentDialog>,
        private _utils: UtilsService,
        public _mdDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _inspectionReportService: InspectionReportService,
        private _assessmentReportService: AssessmentReportService
    ) {

    }
    ngOnInit() {
        this.viewMore();
        this.imageUrl = this._utils.imageUrl;
    }

    /** VIEW MORE DETAILS OF INSPECTION REPORT  */
    /* viewMore() {
         this.authToken = this._utils.fetchAuthtokenTokenString();
         console.log(this.authToken);
         const input = new FormData();
         input.append('token', this.authToken);
         input.append('id', this.moreDetails.assessmentId);
         this._assessmentReportService.showAssessmentReportDetails(input)
             .subscribe(response => {
                 console.log(response);
                 if (response.response_code === '1') {
                     this.reports = response.data;
                     this.parkName = response.data[0].parkName;
                     this.parkImage = response.data[0].parkImage;
                     this.streetAddress = response.data[0].streetAddress;
                     this.city = response.data[0].city;
                     this.inspectedDate = response.data[0].inspectedDate;
                     this.inspectorName = response.data[0].inspectorName;
                     this.inspectorName = response.data[0].inspectorName;
                     this.time = response.data[0].timeTaken;
                 } else {
                     this._snackBar.open(response.message, 'CLOSE', {
                         duration: 2000,
                     });
                 }
             });
 
     }*/
    viewMore() {
        if (this.moreDetails.type) {
            this.assessmentId = this.moreDetails.inspectionTypeId;
        } else {
            this.assessmentId = this.moreDetails.assessmentId;
        }
        this.authToken = this._utils.fetchAuthtokenTokenString();
        console.log(this.authToken);
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.assessmentId);
        this._assessmentReportService.showAssessmentReportDetails(input)
            .subscribe(response => {
                console.log(response);
                if (response.response_code === '1') {
                    this.reports = response.data;
                    this.parkName = response.data[0].parkName;
                    this.parkImage = response.data[0].parkImage;
                    this.streetAddress = response.data[0].streetAddress;
                    this.city = response.data[0].city;
                    this.inspectedDate = response.data[0].inspectedDate;
                    this.inspectorName = response.data[0].inspectorName;
                    this.inspectorName = response.data[0].inspectorName;
                    this.time = response.data[0].timeTaken;
                    // console.log(this.moreDetails.certificateNumber);
                    if (this.moreDetails.certificateNumber != '') {
                        this.certificateStatus = true;
                        this.certificateNumber = this.moreDetails.certificateNumber;
                        // console.log(this.certificateNumber);
                    }
                    // console.log(this.certificateStatus);
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });

    }
    addNote(value) {

        const _dialog = this._mdDialog.open(AddInspectionNoteComponent, { disableClose: true });
        _dialog.componentInstance.moreDetails = value;
        _dialog.componentInstance.checkListStatus = true;
        _dialog.afterClosed().subscribe(result => {
            this.viewMore();
        });
    }
    viewNote(value) {
        const _dialog = this._mdDialog.open(ViewInspectionNoteComponent, { disableClose: true });
        _dialog.componentInstance.moreDetails = value;
        _dialog.componentInstance.checkListStatus = true;
        _dialog.afterClosed().subscribe(result => {
            // this.fetchData();
        });
    }

    /*viewMore() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('parkId', this.moreDetails.parkId);
        input.append('inspectionType', this.moreDetails.inspectionType);
        input.append('inspectedDate', this.moreDetails.inspectedDate);
      
        this._inspectionReportService.inspectionReportDetails(input)
            .subscribe(response => {
                if (response.response_code === '1') {
                    this.reports = response.data;
                    this.mainHead = response.data[0];
                    this.parkName = this.mainHead.parkName;
                    this.parkImage = this.mainHead.parkImage;
                    this.fieldsStatus = true;
                } else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 2000,
                    });
                }
            });
    }*/

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
    <body onload="window.print();">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }*/
    /** CLOSE MDDIALOG  */
    close() {
        this._viewMoreDialog.close();
    }
}
