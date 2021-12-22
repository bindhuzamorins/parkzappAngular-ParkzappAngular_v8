import { ParksService } from './../parks.service';
import { AddRecordDialog } from './../../records/add/add.template';
import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './viewRecords.template.html',
    styleUrls: ['./viewRecords.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})
export class ViewRecordsDialog implements OnInit {
    items: any[];
    recordStatus: boolean;
    private authToken: any = this._utils.fetchAuthtokenTokenString();
    imageUrl: string;
    moreDetails: any;
    assignedRecords: any;
    filterArray: any = { asset_name: '' };
    constructor(
        public _mdDialog: MatDialog,
        public _dialog: MatDialogRef<ViewRecordsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    ngOnInit(): void {
        if (this.assignedRecords === null) {
            this.recordStatus = false;
        } else {
            this.recordStatus = true;
            this.items = [];
            const len = this.assignedRecords.length;
            for (let i = 0; i < len; i++) {
                this.items.push({
                    asset_name: this.assignedRecords[i].asset_name
                });
            }
        }

    }

    /**ADD RECORD */
    add() {
        this._dialog.close();
        const _dialog = this._mdDialog.open(AddRecordDialog, { disableClose: true });
        _dialog.componentInstance.moreDetails = this.moreDetails;
        _dialog.componentInstance.assetParkID = this.moreDetails.id;
        _dialog.afterClosed().subscribe(result => {
            const input = new FormData();
            input.append('token', this.authToken);
            input.append('id', this.moreDetails.id);
            this._parksService.fetchAssignedRecords(input)
                .subscribe(response => {
                    this._dialog.close();
                    // this.assignedRecords = response.data;
                    // if (this.assignedRecords === null) {
                    //     this.recordStatus = false;
                    // } else {
                    //     this.recordStatus = true;
                    // }
                });
        });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

}