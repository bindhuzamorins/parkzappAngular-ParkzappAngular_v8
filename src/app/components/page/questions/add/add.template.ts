import { UtilsService } from './../../../../utils.service';
import { QuestionService } from './../question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        QuestionService,
        UtilsService
    ]
})
export class AddQuestionDetailsDialog implements OnInit {
    serviceId: any;
    linkDatas: any;
    anserFormat: any;
    value: any;
    questionSets: any;
    inspectionTypes: any;
    answer: any;
    question: any;
    questionSet: any;
    inspectionType: any;
    moreDetails: any;
    parks: any;
    parkId: any;
    authToken: any;

    btnStatus = true;
    btnLabel = 'Add new question';
    constructor(
        public addDialog: MatDialogRef<AddQuestionDetailsDialog>,
        private _snackBar: MatSnackBar,
        public _questionService: QuestionService,
        private _utils: UtilsService

    ) {

    }

    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
        this.fetchInspectionType();
        this.fetchParks();
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

    /* FETCH ALL PARKS */
    fetchParks() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        const serviceId = this._utils.fetchServiceId();
        input.append('serviceId', serviceId);
        this._questionService.fetchPark(input)
            .subscribe(response => {
                this.parks = response.data;
            });

    }

    /*FETCH QUESTION SET */
    fetchQuestionSet(value: any) {
        this.questionSet = "";
        this.answer = "";
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        input.append('inspectionTypeId', this.inspectionType);
        input.append('parkId', this.parkId);
        this._questionService.fetchQuestionSet(input)
            .subscribe(response => {
                this.questionSets = response.data;
                this.anserFormat = response.AnswerFormat;
                this.linkDatas = this.anserFormat.split("/");
                console.log(this.linkDatas);
            });
    }

    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('inspectionType', this.inspectionType);
        input.append('questionnaire_set_id', this.questionSet);
        input.append('question', this.question);
        input.append('answer', this.answer);
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._questionService.addData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.addDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Add new question';
                }
            })
    }

    /*CLOSE DIALOG*/
    close() {
        this.addDialog.close();
    }
}