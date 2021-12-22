import { QuestionService } from './../../../questions/question.service';
import { ParksService } from './../../parks.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './editInspection.template.html',
    styleUrls: ['./editInspection.template.css'],
    providers: [
        UtilsService,
        ParksService,
        QuestionService
    ]
})
export class EditInspectionDialog implements OnInit {
    serviceId: any;
    date: any;
    today = new Date();
    //minDate = new Date(this.today.getTime() - (24 * 60 * 60 * 1000)); org
    //minDate = new Date();
    myDate: any = new Date();
    minDate = new Date(this.myDate.getFullYear(),this.myDate.getMonth(),this.myDate.getDate()); //updated by Neeshma
    recurrence: any;
    inspectionType: any;
    inspector: any;
    inspectionTypes: any;
    btnStatus = true;
    btnLabel = 'Update Inspection';
    inspectors: any;
    recurrences: any;
    moreDetails: any;
    formValues: any;
    private authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _mdDialog: MatDialog,
        public _dialog: MatDialogRef<EditInspectionDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService,
        private _questionService: QuestionService

    ) { }

    ngOnInit(): void {
        this.serviceId = this._utils.serviceId;
        this.fetchInspectors();
        this.fetchRecurrence();
        this.fetchInspectionType();
        this.enableButton();

        const dateass = new Date(this.formValues.inspectionDate);
        const year = dateass.getFullYear();
        const month = dateass.getMonth() + 1;
        const day = dateass.getDate();
        this.date = new Date(month + "/" + day + "/" + year);
        console.log('hi' + this.date);
    }


    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }

    /**EDIT CITY DETAILS*/
    edit(value: any) {
        const dateass = new Date(value.date);
        const year = dateass.getFullYear();
        const month = dateass.getMonth() + 1;
        const day = dateass.getDate();
        const inspctdate = year + "-" + month + "-" + day;
        this.btnStatus = true;
        console.log(this.btnStatus);
        this.btnLabel = 'Updating! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.formValues.id);
        input.append('inspectorId', value.inspecctor);
        input.append('priority', value.priority);
        input.append('scheduleId', value.recurrence);
        input.append('inspectionDate', inspctdate);
        console.log(value.date);
        this._parksService.updateInspection(input)
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
                    this.btnLabel = 'Update details';
                }
            });
    }

    /**FETCH RECCURENCE */
    fetchRecurrence() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchRecurrence(input)
            .subscribe(response => {
                this.recurrences = response.data;
            })

    }

    /*FETCH INSPECTION TYPES */
    fetchInspectionType() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._questionService.fetchInspectionType(input)
            .subscribe(response => {
                this.inspectionTypes = response.data;
            });
    }

    /**FETCH INSPECTORS */
    fetchInspectors() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchInspectors(input)
            .subscribe(response => {
                this.inspectors = response.data;
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }



}