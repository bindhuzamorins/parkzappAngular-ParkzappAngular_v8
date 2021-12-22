import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './view.template.html',
    styleUrls: ['./view.template.css'],
    providers: [
        UtilsService
    ]
})
export class ViewRecordDialog {
    imageUrl: string;
    moreDetails: any;
    imageStatus = false;
    constructor(
        public _dialog: MatDialogRef<ViewRecordDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    /**TRIGER WHEN LOAD COMPLETED AND HIDE LOADING IMAGE */
    loadCompleted() {
        this.imageStatus = true;
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

}