import { RecordsService } from './../records.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        UtilsService,
        RecordsService
    ]
})
export class AddRecordDialog implements OnInit {
    serviceId: any;
    placeholderName: string;
    parkName: any;
    parkname: any;
    fileType: any;
    recordName: any;
    parkId: any;
    parkid: any;
    image: any;
    assetParkID: any
    parks: any[];
    imageUrl: string;
    moreDetails: any;;
    imageFileStatus = false;
    imageFile: any;
    parkNameStatus: boolean;
    btnStatus = true;
    btnLabel = 'Add new record';
    currentProfileImage: any;
    imageShown: boolean;
    docshown: boolean;
    divshown: boolean;

    public selectedFiles;

    private authToken: any = this._utils.fetchAuthtokenTokenString();
    recordTypes = [
        { value: 'image', viewValue: 'Image' },
        { value: 'doc', viewValue: 'Document' }
    ];

    private configImage: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1

    };

    private configpdf: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };

    constructor(
        public _dialog: MatDialogRef<AddRecordDialog>,
        private ng4FilesService: Ng4FilesService,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _recordsService: RecordsService
    ) {
        this.imageUrl = this._utils.imageUrl;
        this.serviceId = this._utils.serviceId;
        this.fetchParks();
    }

    ngOnInit(): void {
        this.placeholder();
        if (this.moreDetails) {
            this.parkName = this.moreDetails.parkName;
            this.parkNameStatus = true;
        }
        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configpdf, 'my-pdf-config');
    }


    /**VALIDATE IMAGE FILE */
    fileEvent(fileInput: any) {
        this.imageFile = fileInput.target.files[0];
        if (this.imageFile.size > 5000000) {
            this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                duration: 6000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
        else if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
            || this.imageFile.type === 'image/jpg' || this.imageFile.type === 'application/pdf') {
            this.imageFileStatus = true;
            if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
                || this.imageFile.type === 'image/jpg') {
                this.fileType = 'image';
            }
            else {
                this.fileType = 'doc';
            }
        }
        else {
            this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                duration: 6000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
    }

    /**ADD RECORD */
    add() {
        if (this.moreDetails) {
            this.btnStatus = false;
            this.btnLabel = 'Uploading! Please wait...';
            const input = new FormData();
            input.append('asset_name', this.recordName);
            input.append('asset_type', this.fileType);
            input.append('park_id', this.parkName);
            input.append('asset_url', this.imageFile);
            input.append('token', this.authToken);
            const serviceId = this._utils.fetchServiceId();
            input.append('serviceId', serviceId);
            this._recordsService.addData(input)
                .subscribe(response => {
                    ``
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
                        this.btnLabel = 'Add new record';
                    }
                })
        } else {
            this.btnStatus = false;
            this.btnLabel = 'Uploading! Please wait...';
            const input = new FormData();
            input.append('asset_name', this.recordName);
            input.append('asset_type', this.fileType);
            input.append('park_id', this.parkName);
            input.append('asset_url', this.imageFile);
            input.append('token', this.authToken);
            const serviceId = this._utils.fetchServiceId();
            input.append('serviceId', serviceId);
            
            this._recordsService.addData(input)
                .subscribe(response => {
                    ``
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
                        this.btnLabel = 'Add new record';
                    }
                })
        }

        // this.btnStatus = false;
        // this.btnLabel = 'Uploading! Please wait...';
        // const input = new FormData();
        // input.append('asset_name', this.recordName);
        // input.append('asset_type', this.fileType);
        // input.append('park_id', this.parkName.id);
        // input.append('asset_url', this.imageFile);
        // input.append('token', this.authToken);
        // this._recordsService.addData(input)
        //     .subscribe(response => {
        //         ``
        //         if (response.response_code == 1) {
        //             this._snackBar.open(response.message, 'CLOSE', {
        //                 duration: 5000,
        //             });
        //             this._dialog.close();
        //         }
        //         else {
        //             this._snackBar.open(response.message, 'CLOSE', {
        //                 duration: 5000,
        //             });
        //             this.btnStatus = true;
        //             this.btnLabel = 'Add new record';
        //         }
        //     })

    }


    /**FETCH PARKS */
    fetchParks() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._recordsService.fetchParks(input)
            .subscribe(response => {
                if (this.moreDetails) {
                    this.parkname = this.moreDetails.parkName;
                    this.parkid = this.moreDetails.id;
                    this.parkName = this.moreDetails.id;
                } else {
                    this.parks = response.data[0].parks;
                }


            })
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }


    public filesSelect(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles = selectedFiles.status;
            return;
        }

        // Handle error statuses here

        this.selectedFiles = Array.from(selectedFiles.files).map(file => {
            // Load the image in
            this.imageFile = file;
            if (file.size > 5000000) {
                this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFile = '';
                this.imageFileStatus = false;
            }
            else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                || file.type === 'image/jpg' || file.type === 'application/pdf') {
                this.imageFileStatus = true;
                if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                    || file.type === 'image/jpg') {
                    this.fileType = 'image';
                }
                else {
                    this.fileType = 'doc';
                }
                if (file.type === 'application/pdf') {
                    this.docshown = true;
                    this.imageShown = false;
                    this.divshown = true;

                } else {
                    this.imageShown = true;
                    this.docshown = false;
                    this.divshown = true;
                }
                let fileReader = new FileReader();
                fileReader.onload = () => {

                    // Set and show the image
                    this.currentProfileImage = fileReader.result;

                };

                // Read in the file
                fileReader.readAsDataURL(file);
            }
            else {
                this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFile = '';
                this.imageFileStatus = false;
            }




        });
    }
  // FUNCTION FOR CHANGING Texts W R TO SERVICES
  placeholder() {
    this.serviceId = this._utils.fetchServiceId();
    
    if (this.serviceId === '1') {  
      this.placeholderName = 'Park Name';
     } else if (this.serviceId === '2') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '3') {
      this.placeholderName = 'Building Name';
    } 
    else if (this.serviceId === '4') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '5') {
      this.placeholderName = 'Park Name';
    } 
    else if (this.serviceId === '6') {
      this.placeholderName = 'Park Name';
    } 



  }
}