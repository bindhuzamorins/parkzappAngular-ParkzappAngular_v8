import { AmenitiesService } from './../amenities.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        UtilsService,
        AmenitiesService
    ]
})
export class EditAmenityDetailsDialog implements OnInit {
    moreDetails: any;
    btnStatus = false;
    btnLabel = 'Update amenity';
    authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog: MatDialogRef<EditAmenityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _amenitiesService: AmenitiesService
    ) {

    }

    ngOnInit() {
    }


    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }

    /**Edit Amenity */
    edit(value: any) {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('amenity', this.moreDetails.amenity);
        input.append('description', value.description);
        this._amenitiesService.updateData(input)
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
                    this.btnLabel = 'Update aminity';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}