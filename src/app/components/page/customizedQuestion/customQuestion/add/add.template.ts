import { UtilsService } from '../../../../../utils.service';
import { CustomQuestionService } from './../customQuestion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        CustomQuestionService,
        UtilsService
    ]
})
export class AddCustomQuestionDialog implements OnInit {
    items: any[];
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

    authToken: any;

    btnStatus = true;
    btnLabel = 'Add new question';
    constructor(
        public addDialog: MatDialogRef<AddCustomQuestionDialog>,
        private _snackBar: MatSnackBar,
        public _CustomQuestionService: CustomQuestionService,
        private _utils: UtilsService

    ) {

    }

    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
        this.fetchInspectionType();
    }

    /*FETCH INSPECTION TYPES */
    /*fetchInspectionType() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._CustomQuestionService.fetchInspectionType(input)
            .subscribe(response => {
                this.inspectionTypes = response.data;
            });
    }*/
    fetchInspectionType() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._CustomQuestionService.fetchInspectionType(input)
            .subscribe(response => {
                const len = response.data.length;
                console.log('is    ' + len);
                this.items = [];
                for (let i = 0; i < len; i++) {
                    if (response.data[i]['inspectiontype'] === 'Customized Inspection') {
                        this.items = [];
                        this.items.push({
                            inspectionType: response.data[i]['inspectiontype'],
                            id: response.data[i]['id'],
                        });
                        console.log(this.items);
                    }
                }
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
        input.append('inspectionTypeId', value);
        this._CustomQuestionService.fetchQuestionSet(input)
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
        this._CustomQuestionService.addData(input)
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