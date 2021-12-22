import { QuestionService } from './../../../questions/question.service';
import { ParksService } from './../../parks.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { QuestionSetService } from '../../../customizedQuestion/QuestionSet/QuestionSet.service';
import { viewCustomDialog } from './addQuestionSet/addQuestionSet.template';

@Component({
    moduleId: module.id,
    templateUrl: './addInspection.template.html',
    styleUrls: ['./addInspection.template.css'],
    providers: [
        UtilsService,
        ParksService,
        QuestionService,
        QuestionSetService
    ]
})
export class AddInspectionDialog implements OnInit {
    
    custQuestionSetValues: any;
    serviceId: any;
    today = new Date();
    //today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    date: any;
    //today2 = new Date();
    //minDate = new Date(this.today2.getTime() - (24 * 60 * 60 * 1000));
    //minDate = new Date(this.today.getTime() - (24 * 60 * 60 * 1000)); //ORG
    //minDate = new Date() ;
    myDate: any = new Date();
    minDate = new Date(this.myDate.getFullYear(),this.myDate.getMonth(),this.myDate.getDate());
    recurrence: any;
    priority: any;
    inspectionType: any;
    inspector: any;
    inspectionTypes: any;
    btnStatus = true;
    btnLabel = 'Add Inspection';
    inspectors: any;
    allInspectors: any;
    recurrences: any;
    moreDetails: any;
    customQuestionSet: any;
    private authToken:any = this._utils.fetchAuthtokenTokenString();
    customizedQuestionSets: any;
    constructor(
        public _mdDialog: MatDialog,
        public _dialog: MatDialogRef<AddInspectionDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService,
        private _questionService: QuestionService,
        private _questionSetService: QuestionSetService


    ) { }

    ngOnInit(): void {
        //console.log("min date");
        //console.log(this.minDate);
        this.serviceId = this._utils.serviceId;
        this.fetchInspectors();
        this.fetchRecurrence();
        this.fetchInspectionType();
    }

    /**FETCH RECCURENCE */
    fetchRecurrence() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchRecurrence(input)
            .subscribe(response => {
                console.log(response.data);
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
                this.allInspectors = response.data;
                this.inspectors = [];
            });
    }

    removePreviousDate() {
        
        var selectedText = this.date;
      console.log(selectedText)
        var selectedDate = new Date(selectedText);
        var selected = (selectedText.getUTCFullYear()) + "/" + (selectedText.getMonth() + 1) + "/" + (selectedText.getDate());
        var now = new Date(); console.log("now");
        var current = (now.getUTCFullYear()) + "/" + (now.getMonth() + 1) + "/" + (now.getUTCDate());
        
        if (selected < current) {
            this._snackBar.open('Please select a future date', 'CLOSE', {
                duration: 3000,
            });
            this.date = null;
        }
        else {
            return true;
        }
    }

    /**ADD INSPECTIONS */
    add() {
        const dateass = new Date(this.date);
        const year = dateass.getFullYear();
        const month = dateass.getMonth() + 1;
        const day = dateass.getDate();
        const inspctdate = year + "-" + month + "-" + day;
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        this.customQuestionSet = localStorage.getItem('customQuestionSet');
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('parkId', this.moreDetails.id);
        input.append('inspectorId', this.inspector);
        input.append('inspectionType', this.inspectionType);
        input.append('scheduleId', this.recurrence);
        input.append('priority', this.priority);
        input.append('inspectionDate', inspctdate);
        input.append('serviceId', this.serviceId);
        input.append('customQuestionSet', this.customQuestionSet);

        this._parksService.addInspection(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this._dialog.close();
                    localStorage.removeItem('customQuestionSet');
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Add Inspection';
                }
            })
    }



    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }


    getInspectorByType(value: any) {

        if (value !== '21') {
            this.inspectors = this.allInspectors.filter((inspector) => {
                return parseInt(inspector.role_id) !== 2;
            })

        }
        else {
            this.inspectors = this.allInspectors;
        }

    }


    Customized(value: any) {
        this.getInspectorByType(value);
        if (value == '4' || value == '9' || value == '19' || value == '12' || value == '14' || value == '17') {

            const input = new FormData();
            input.append('token', this.authToken);
            input.append('serviceId', this.serviceId);
            this._questionSetService.fetchData(input)
                .subscribe(response => {
                    console.log(response.data);
                    this.customizedQuestionSets = response.data;
                    const _dialog = this._mdDialog.open(viewCustomDialog, { disableClose: true });
                    _dialog.componentInstance.customizedQuestionSets = this.customizedQuestionSets;
                    _dialog.afterClosed().subscribe(result => {
                        this.custQuestionSetValues = _dialog.componentInstance.customQuestionSet;
                        // console.log('result is  ' + this.custQuestionSetValues);
                        if (this.custQuestionSetValues) {
                            this.btnStatus = true;
                        } else {
                            this.btnStatus = false;
                        }
                    });
                });
        }
    }


}