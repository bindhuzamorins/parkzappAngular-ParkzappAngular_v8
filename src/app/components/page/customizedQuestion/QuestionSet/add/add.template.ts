import { UtilsService } from '../../../../../utils.service';
import { QuestionSetService } from './../QuestionSet.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        QuestionSetService,
        UtilsService
    ]
})
export class addQuestionSetDialog implements OnInit {
    serviceId: any;
    linkDatas: any;
    value: any;
    inspectionTypes: any;
    questionSet: any;
    inspectionType: any;
    moreDetails: any;
    authToken: any;
    answer:any;
    questionSets: any;
    answerFormat: any;

    btnStatus = true;
    btnLabel = 'Add new question set';
    constructor(
        public addDialog: MatDialogRef<addQuestionSetDialog>,
        private _snackBar: MatSnackBar,
        public _QuestionSetService: QuestionSetService,
        private _utils: UtilsService

    ) {

    }
    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
        // console.log(this.serviceId);
      }

    /*FETCH QUESTION SET */
    fetchQuestionSet(value: any) {
        this.questionSet="";
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', value);
        this._QuestionSetService.fetchData(input)
            .subscribe(response => {
                this.questionSet = response.data;
                this.linkDatas = this.questionSet;
                console.log(this.linkDatas);
            });
    }
    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('questionnaire_set_name', this.questionSet);
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);

        this._QuestionSetService.addData(input)
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