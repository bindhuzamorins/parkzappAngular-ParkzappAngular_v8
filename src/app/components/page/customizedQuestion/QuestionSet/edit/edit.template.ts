import { UtilsService } from '../../../../../utils.service';
import { QuestionSetService } from './../QuestionSet.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        QuestionSetService,
        UtilsService
    ]
})
export class EditQuestionSetDialog implements OnInit {
    serviceId: any;
    editQuestion: any;
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

    btnStatus = false;
    btnLabel = 'Update question';
   constructor(
        public editDialog: MatDialogRef<EditQuestionSetDialog>,
        private _snackBar: MatSnackBar,
        public _QuestionSetService: QuestionSetService,
        private _utils: UtilsService

    ) {

    }
    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
    }


    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }
    
    /*FETCH QUESTION SET */
    fetchQuestionSet(value: any) {
        console.log(value);
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', value);
        this._QuestionSetService.fetchData(input)
            .subscribe(response => {
                this.questionSet = response.data;
                this.linkDatas = this.questionSet;
            });
    }
    /**EDIT QUESTIONS */
    edit(value) {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        console.log(this.questionSet);
        input.append('questionnaire_set_name', value.questionSet);
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        input.append('id', this.moreDetails.id);

        this._QuestionSetService.editData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.editDialog.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Update question';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this.editDialog.close();
    }
}