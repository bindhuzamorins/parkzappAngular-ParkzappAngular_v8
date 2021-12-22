import { UtilsService } from './../../../../utils.service';
import { CityService } from './../city.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ParksService } from '../../parks/parks.service';
@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        CityService,
        UtilsService,
        ParksService
    ]
})

export class editCityDetailsDialog implements OnInit {
    imageFileStatus = true;
    imageFile: any = '';
    image: any;
    countries: any;
    country: any;
    state: any;
    timezone: any;
    timezones: any[];
    countrySelected: any;
    authToken: any;
    allStates: any;
    btnStatus = true;
    btnLabel = 'Update details';
    moreDetails: any;
    currentProfileImage: any;
    imageShown: boolean;
    docshown: boolean;
    divshown: boolean;
    public selectedFiles;
    private configImage: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1

    };

    private configgif: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };
    countryCode: any;
    countryName: any;
    serviceId: string | Blob;
    countryname: any;

    constructor(
        public editCity: MatDialogRef<editCityDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _cityService: CityService,
        private _utils: UtilsService,
        public _mdDialog: MatDialog,
        private _parksService: ParksService,
        private ng4FilesService: Ng4FilesService

    ) { }

    ngOnInit() {

        this.fetchSelectedCountries();
        this.country = this.moreDetails.country;
        this.serviceId = this._utils.serviceId;
        this.state = this.moreDetails.state;
        this.countryname = this.moreDetails.countryName;
        console.log(this.countryname);
        console.log(this.country);
        this.fetchState(this.country);
        // this.fetchCountry();
        // this.fetchState(this.countryCode);
        this.timezone = this.moreDetails.timezone;

        //this.fetchAllStates();

        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
        if (this.moreDetails.cityLogo !== '') {
            this.imageShown = true;
            this.divshown = true;
            this.currentProfileImage = this._utils.imageUrl + this.moreDetails.cityLogo;

        } else {
            this.imageShown = false;
            this.divshown = false;
        }
    }

    /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
    enableButton() {
        this.btnStatus = true;
    }

    /**FETCH ALL USA STATES */
    fetchAllStates() {
        this._cityService.fetchUSAStates()
            .subscribe(response => {
                this.allStates = response;
            })
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
            || this.imageFile.type === 'image/jpg') {
            this.imageFileStatus = true;
        }
        else {
            this._snackBar.open('Please select a valid image file', 'CLOSE', {
                duration: 2000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
    }

    /**EDIT CITY DETAILS*/
    edit(value: any) {
        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.id);
        input.append('city', value.city);
        input.append('state', value.state);
        input.append('streetAddress', value.address);
        input.append('zipcode', value.zipCode);
        input.append('country', value.country);
        input.append('timezone', value.timezone);
        input.append('agencyName', value.agencyName);
        input.append('logo', this.imageFile);
        this._cityService.editData(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.editCity.close();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Update details';
                }
            });
    }

    fetchCountry() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchCountry(input)
            .subscribe(response => {
                const countryData = response.data;
                this.countryCode = countryData.countryCode;
                this.countryName = countryData.country;
                console.log(this.countryName);
                console.log(this.countryCode);
                //this.cities = response.data;
            });
    }



    /*CLOSE DIALOG*/
    close() {
        this.editCity.close();
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
                || file.type === 'image/jpg') {
                this.imageFileStatus = true;
                this.btnStatus = true;
                this.imageShown = true;
                this.divshown = true;


                let fileReader = new FileReader();
                fileReader.onload = () => {

                    // Set and show the image
                    this.currentProfileImage = fileReader.result;

                };
                this.openDialog(file);
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

    openDialog(file: any): void {
        let dialogRef = this._mdDialog.open(CropimagecityeditDialog, {

            data: { image: file }
        });

        dialogRef.afterClosed().subscribe(result2 => {


            if (result2 !== undefined) {


                this.imageFile = result2;
                this.currentProfileImage = result2;


            } else {

                this.imageShown = false;
                this.divshown = false;
                if (this.moreDetails.cityLogo !== '') {
                    this.imageShown = true;
                    this.divshown = true;
                    this.currentProfileImage = this._utils.imageUrl + this.moreDetails.cityLogo;

                }
            }

        });
    }
    /**FETCH ALL SELECTED COUNTRIES */
    fetchSelectedCountries() {

        this._cityService.fetchSelectedCountries()
            .subscribe(response => {
                this.countries = response;
            });
    }
    /**FETCH STATE */
    fetchState(value: any) {
        console.log('states');
        console.log(value);
        this._cityService.fetchStates(value)
            .subscribe(response => {
                this.allStates = response;
                this.countrySelected = true;
                console.log(value);
                console.log(this.allStates);
            });

        this._cityService.fetchtimezone(value)
            .subscribe(response => {
                const time = response;
                const len = time.length;
                this.timezones = [];
                for (let i = 0; i < len; i++) {

                    if (time[i].cid === value) {

                        this.timezones.push({
                            name: time[i].name
                        });
                    }

                }

                this.countrySelected = true;
            });
    }

}
@Component({

    templateUrl: 'cropimage.html',
})
export class CropimagecityeditDialog {

    imagedata: any;
    fileimage: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<CropimagecityeditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 150;
        this.cropperSettings.height = 150;
        this.cropperSettings.croppedWidth = 150;
        this.cropperSettings.croppedHeight = 150;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.keepAspect = false;

        var image: any = new Image();
        var file: File = data.image;
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };
        console.log(that.fileimage);
        myReader.readAsDataURL(file);

        this.imagedata = { image: image.src, file: data.image };
    }

    cancelme() {


        this.dialogRef.close();
    }
    saveme() {

        this.dialogRef.close();
    }
}
