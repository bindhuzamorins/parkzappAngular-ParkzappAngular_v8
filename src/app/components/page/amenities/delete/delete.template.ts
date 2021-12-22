import { AmenitiesService } from './../amenities.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './delete.template.html',
    styleUrls: ['./delete.template.css'],
    providers: [
        UtilsService,
        AmenitiesService
    ]
})
export class DeleteAmenityDetailsDialog {
    authToken:any = this._utils.fetchAuthtokenTokenString();
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Delete';

    constructor(
        public _dialog: MatDialogRef<DeleteAmenityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _amenitiesService: AmenitiesService
    ) {
    }

    delete() 
    {
        this.btnStatus = false;
        this.btnLabel = 'Deleting! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        this._amenitiesService.deleteData(input)
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

            })
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}