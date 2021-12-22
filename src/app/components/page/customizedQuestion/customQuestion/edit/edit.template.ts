import { UtilsService } from '../../../../../utils.service';
import { CustomQuestionService } from './../customQuestion.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        CustomQuestionService,
        UtilsService
    ]
})
export class EditCustomQuestionDialog implements OnInit {
    inspectiontype:any;
    serviceId:any;
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
        public editDialog: MatDialogRef<EditCustomQuestionDialog>,
        private _snackBar: MatSnackBar,
        public _CustomQuestionService: CustomQuestionService,
        private _utils: UtilsService

    ) {
    }

    ngOnInit() {
        this.serviceId = this._utils.fetchServiceId();
        this.fetchInspectionType();
        this.fetchQuestionSet(this.moreDetails.inspectionTypeId);

    }


    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }

  /*FETCH INSPECTION TYPES */
  fetchInspectionType() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('inspectiontype', this.inspectiontype);
    this._CustomQuestionService.fetchInspectionType(input)
        .subscribe(response => {
            this.inspectionTypes = response.data;
            
        });
}


     /*FETCH QUESTION SET */
     fetchQuestionSet(value: any) {
        console.log(value);

        this.questionSet="";
        this.answer="";
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

    /**EDIT QUESTIONS */
    edit(value: any) {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('id', this.moreDetails.id);
        // console.log(value.question);

        input.append('questionnaire_set_id', value.questionSet);
        input.append('question', value.question);
        input.append('answer', value.answer);
        input.append('token', this.authToken);
        this._CustomQuestionService.editData(input)
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