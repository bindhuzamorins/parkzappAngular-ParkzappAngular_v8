import { ParksService } from './../../parks.service';
import { UtilsService } from './../../../../../utils.service';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    //moduleId: module.id,
    templateUrl: './delete.template.html',
    styleUrls: ['./delete.template.css'],
    providers: [
        ParksService,
        UtilsService
    ]
})
export class DeleteInspectionDialog implements OnInit {
    selectedData: any;
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Delete';
    authToken: any = this._utils.fetchAuthtokenTokenString();

    constructor(
        public _dialog: MatDialogRef<DeleteInspectionDialog>,
        private _utils: UtilsService,
        private _parksService: ParksService,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        console.log(this.selectedData);
    }

    /**DELETE USER */
    delete() {
        this.btnStatus = false;
        this.btnLabel = 'Deleting! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.selectedData.id);
        this._parksService.deleteInspection(input)
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
                    this.btnLabel = 'Delete';
                }

            });
    }


    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }


}