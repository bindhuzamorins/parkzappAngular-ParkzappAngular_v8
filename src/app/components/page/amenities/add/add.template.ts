import { AmenitiesService } from './../amenities.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        UtilsService,
        AmenitiesService
    ]
})
export class AddAmenityDetailsDialog implements OnInit {
    description: any;
    amenity: any;
    moreDetails: string;
    btnStatus = true;
    btnLabel = 'Add new amenity';
    authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog: MatDialogRef<AddAmenityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _amenitiesService: AmenitiesService

    ) {

    }

    ngOnInit() {
    }


    /**ADD NEW */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('amenity', this.amenity);
        input.append('description', this.description);
        const serviceId = this._utils.fetchServiceId();
        input.append('serviceId', serviceId);
        this._amenitiesService.addData(input)
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
                    this.btnLabel = 'Add new amenity';
                }
            });
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
}