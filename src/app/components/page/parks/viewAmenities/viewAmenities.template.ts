import { AmenitiesService } from './../../amenities/amenities.service';
import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
console.log("tetstesttet");


@Component({
   // moduleId: module.id,
    templateUrl: './viewAmenities.template.html',
    styleUrls: ['./viewAmenities.template.css'],
    providers: [
        UtilsService,
        ParksService,
        AmenitiesService
    ]
})
export class ViewAmenitiesDialog implements OnInit {
    serviceId: any;
    tableStatus: boolean;
    newAmenities: any;
    selectedAmenities: any;
    amenities: any; 
    items: any[];
    assignedAmenities: any;
    snackMessage: string;
    equipments: any;
    imageUrl: string;
    moreDetails: any;
    newEquipments: any;
    btnStatus = false;
    btnLabel = 'Add Amenities';
    filterArray: any = { amenity: '' };
    private authToken:any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _dialog: MatDialogRef<ViewAmenitiesDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService,
        private _amenitiesService: AmenitiesService
    ) {
        this.imageUrl = this._utils.imageUrl;
        this.serviceId = this._utils.serviceId;
    }

    ngOnInit(): void {
        this.fetchAmenities();
        this.selectedAmenities = this.assignedAmenities;
        if (this.selectedAmenities == undefined) {
            // alert('no amenities selected');
        } else {
            const len = this.selectedAmenities.length;
            if (len > 0) {
                this.newAmenities = [];
                this.items = [];
                for (let i = 0; i < len; i++) {
                    this.newAmenities.push(
                        this.selectedAmenities[i].amenityId
                    );
                    this.items.push({
                        amenity: this.selectedAmenities[i].amenity
                    });
                }
                this.tableStatus = true;
            } else {
                this.tableStatus = false;
            }
        }

    }




    /**FETCH ALL AMENITIES*/
    fetchAmenities() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._amenitiesService.fetchData(input)
            .subscribe(response => {
                if (response.response_code === '1') {
                    this.amenities = response.data;
                } else {
                    this.snackMessage = response.message;
                    this._snackBar.open(this.snackMessage, 'OKAY', {
                        duration: 5000
                    });
                }
            });
    }

    /**CHECK SELECT DATA EMPTY OR NOT */
    checkEmptyData() {
        console.log(this.amenities);
        if (this.amenities == undefined) {
            this._snackBar.open('Add amenity to your account. Go to Setup-> Amenities', 'OKAY', {
                duration: 6000
            });
        }
    }

    /**CHNAGE BUTTON STATUS */
    changeBtnStatus() {
        this.btnStatus = true;
    }

    /**DELETE AN AMENITY */
    delete(value) {
        if (confirm("Data related to this amenity will be gone! Are you sure?") == true) {
            const input = new FormData();
            input.append('id', value.id);
            console.log(value.id);
            input.append('token', this.authToken);
            this._parksService.deleteParkAmenity(input)
                .subscribe(response => {
                    if (response.response_code == 1) {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        const input = new FormData();
                        input.append('token', this.authToken);
                        input.append('parkId', this.moreDetails.id);
                        this._parksService.fetchSelectedAmenities(input)
                            .subscribe(response => {

                                console.log(response);
                                if (response.response_code == '1') {
                                    this.tableStatus = true;
                                    if (response.data == null) {
                                        this.snackMessage = 'No equipment assigned!';
                                        this._snackBar.open(this.snackMessage, 'OKAY', {
                                            duration: 5000,
                                        });
                                        this._dialog.close();
                                    } else {
                                        this.assignedAmenities = response.data;
                                        this.selectedAmenities = this.assignedAmenities;
                                        const len = this.selectedAmenities.length;
                                        if (len > 0) {
                                            this.newAmenities = [];
                                            this.items = [];
                                            for (let i = 0; i < len; i++) {
                                                this.newAmenities.push(
                                                    this.selectedAmenities[i].amenityId
                                                );
                                                this.items.push({
                                                    amenity: this.selectedAmenities[i].amenity
                                                });
                                            }
                                            this.tableStatus = true;
                                        } else {
                                            this.tableStatus = false;
                                        }
                                    }
                                } else {
                                    this.snackMessage = response.message;
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                    this.newAmenities = [];
                                    this.tableStatus = false;
                                }
                            });
                    }
                    else {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        this.btnLabel = 'Add new Equipment';
                    }

                });
        };
    }


    /**CHANGE QUANTITY OF SELECTED AMENITY */
    quantityChange(amenity, value: any) {
        let quantiy = value.split(': ')[1];
        const input = new FormData();
        input.append('id', amenity.id);
        input.append('quantity', quantiy);
        input.append('token', this.authToken);
        this._parksService.updateParkAmenityQuantity(input)
            .subscribe(response => {
                this.snackMessage = response.message;
                this._snackBar.open(this.snackMessage, 'OKAY', {
                    duration: 5000
                });
            });


    }


    /**ADD NEW EQUIPMENTS*/
    addNew() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        const input = new FormData();
        input.append('amenityId', this.newAmenities);
        input.append('parkId', this.moreDetails.id);
        input.append('token', this.authToken);
        this._parksService.addParkAmenities(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    const input = new FormData();
                    input.append('token', this.authToken);
                    input.append('parkId', this.moreDetails.id);
                    this._parksService.fetchSelectedAmenities(input)
                        .subscribe(response => {
                            if (response.response_code == '1') {
                                this.tableStatus = true;
                                if (response.data == null) {
                                    this.snackMessage = 'No equipment assigned!';
                                    this._snackBar.open(this.snackMessage, 'OKAY', {
                                        duration: 5000,
                                    });
                                    this._dialog.close();
                                } else {
                                    this.assignedAmenities = response.data;
                                    this.selectedAmenities = this.assignedAmenities;
                                    const len = this.selectedAmenities.length;
                                    if (len > 0) {
                                        this.newAmenities = [];
                                        this.items = [];
                                        for (let i = 0; i < len; i++) {
                                            this.newAmenities.push(
                                                this.selectedAmenities[i].amenityId
                                            );
                                            this.items.push({
                                                amenity: this.selectedAmenities[i].amenity
                                            });
                                        }
                                        this.tableStatus = true;
                                    } else {
                                        this.tableStatus = false;
                                    }
                                }
                            } else {
                                this.snackMessage = response.message;
                                this._snackBar.open(this.snackMessage, 'OKAY', {
                                    duration: 5000,
                                });
                            }
                        });
                    this.btnStatus = false;
                    this.btnLabel = 'Add new amenities';
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnLabel = 'Add new amenities';
                }

            })
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }

}