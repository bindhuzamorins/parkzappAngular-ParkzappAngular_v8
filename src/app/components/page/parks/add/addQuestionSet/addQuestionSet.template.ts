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
export class viewCustDialog {
    customQuestionSet: any;
    custQuestionSet: any;
    btnStatus: boolean;
    customizedQuestionSets: any;
    imageUrl: string;
    moreDetails: any;
    constructor(
        public _dialog: MatDialogRef<viewCustDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
    }

    /**CHNAGE BUTTON STATUS */
    changeBtnStatus() {
        this.btnStatus = true;

    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

    selecteSets() {
        // console.log('from modal set   ' + this.custQuestionSet);
        localStorage.setItem('custQuestionSet', this.custQuestionSet);
        this.close();
    }

}