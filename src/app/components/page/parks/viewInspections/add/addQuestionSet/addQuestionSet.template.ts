import { UtilsService } from 'app/utils.service';
// import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './addQuestionSet.template.html',
    styleUrls: ['./addQuestionSet.template.css'],
    providers: [
        UtilsService
    ]
})
export class viewCustomDialog {
    customQuestionSet: any;
    custQuestionSet: any;
    btnStatus: boolean;
    customizedQuestionSets: any;
    imageUrl: string;
    moreDetails: any;
    constructor(
        public _dialog: MatDialogRef<viewCustomDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
    }
    ngOnInit(): void {

        this.checkQuestionData();
    }

    /**CHNAGE BUTTON STATUS */
    changeBtnStatus() {
        this.btnStatus = true;

    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

    selectedSets() {
        // console.log('from modal set   ' + this.customQuestionSet);
        localStorage.setItem('customQuestionSet', this.customQuestionSet);
        this.close();
    }
    checkQuestionData() {
        console.log('no questionset');
        // console.log(this.customizedQuestionSets);
        // console.log(this.amenities);
        if (this.customizedQuestionSets == undefined) {
            this._snackBar.open('Add customized questions to your account.Go to Setup-> CustomizedQuestions', 'OKAY', {
                duration: 6000
            });
        }
        // else {
        //     this._snackBar.open('Add customized question set to your account. Go to Setup-> CustomizedQuestions', 'OKAY', {
        //         duration: 6000
        //     });
        // }
    }

}