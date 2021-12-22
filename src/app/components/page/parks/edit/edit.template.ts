import { AddParkCategoryDialog } from './../add/addCategory/addCategory.template';
import { AddAreaDialog } from './../add/addArea/addArea.template';
import { AddCityDetailsDialog } from './../../city/add/add.template';
import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
    //moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        UtilsService,
        ParksService
    ]
})

export class EditParkDetailsDialog implements OnInit {
    services6: string;
    services5: string;
    services4: string;
    services3: string;
    services1: string;
    services2: string;
    servicesOne: any;
    servicesTwo: any;
    servicesThree: any;
    servicesFour: any;
    servicesFive: any;
    servicesSix: any;

    serviceSix: boolean;
    serviceFive: boolean;
    serviceFour: boolean;
    serviceThree: boolean;
    serviceTwo: boolean;
    serviceOne: boolean;

    serviceSixDisabled: boolean;
    serviceFiveDisabled: boolean;
    serviceFourDisabled: boolean;
    serviceThreeDisabled: boolean;
    serviceTwoDisabled: boolean;
    serviceOneDisabled: boolean;

    divInActiveOne = false;
    divInActiveTwo = false;
    divInActiveThree = false;
    divInActiveFour = false;
    divInActiveFive = false;
    divInActiveSix = false;


    divOneStatus = false;
    divTwoStatus = false;
    divThreeStatus = false;
    divFourStatus = false;
    divFiveStatus = false;
    divSixStatus = false;

    serviceId: any;
    imageFileStatusBlueprint = true;
    imageFileStatusLogo = true;
    imageFileLogoBlueprint: any = '';
    imageFileLogo: any = '';
    categories: any;
    parkBluePrint: any;
    areas: any;
    parkImage: any;
    allStates: any;
    mystate: any;
    countrySelected: boolean;
    countries: any;
    parks: any;
    cities: any;
    imageUrl: string;
    btnStatus = true;
    btnLabel = 'Update Details';
    moreDetails: any;
    private authToken: any = this._utils.fetchAuthtokenTokenString();
    showme: boolean = false;

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
    currentProfileImage2: any;
    imageShown2: boolean;
    docshown2: boolean;
    divshown2: boolean;
    public selectedFiles2;
    private configImage2: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1

    };

    private configgif2: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };
    // parkName: any;
    // parkAddress: any;
    // parkState: any;
    // parkCountry: any;
    // parkZipCode: any;
    // address: string;
    address: string;
    addresses: string;
    selectPark: string;
    parkLongg: any;
    parkLatt: any;
    allParks: any;
    country: any;
    countryname: any;


    constructor(
        public _dialog: MatDialogRef<EditParkDetailsDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService,
        public _mdDialog: MatDialog,
        private ng4FilesService: Ng4FilesService,

    ) {
        this.imageUrl = this._utils.imageUrl;

        this.fetchSelectedCountries();
        this.fetchAreas();
        this.fetchParkCategory();

    }
    ngOnInit() {
        this.serviceId = this._utils.serviceId;
        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
        this.ng4FilesService.addConfig(this.configImage2, 'my-image-config2');
        this.ng4FilesService.addConfig(this.configgif2, 'my-gif-config2');
        this.mystate = this.moreDetails.state;
        this.fetchCities();
        this.selectServices();
        this.editDiv();
        this.fetchSelectedParks();

        this.country = this.moreDetails.country;

        // this.state = this.moreDetails.state;
        this.countryname = this.moreDetails.countryName;
        console.log('countryData');
        console.log(this.country);
        console.log(this.countryname);

        this.fetchState(this.country);

        // console.log(this.moreDetails.blueprint);
        if (this.moreDetails.parkImage !== '') {
            this.imageShown = true;
            this.divshown = true;
            this.currentProfileImage = this._utils.imageUrl + this.moreDetails.parkImage;

        }
        if (this.moreDetails.blueprint !== '') {
            this.imageShown2 = true;
            this.divshown2 = true;
            this.currentProfileImage2 = this._utils.imageUrl + this.moreDetails.blueprint;

        }
    }

    /**VALIDATE LOGO IMAGE FILE */
    fileEventLogo(fileInput: any) {
        this.imageFileLogo = fileInput.target.files[0];
        if (this.imageFileLogo.type === 'image/jpeg' || this.imageFileLogo.type === 'image/png' || this.imageFileLogo.type === 'image/gif'
            || this.imageFileLogo.type === 'image/jpg') {
            this.imageFileStatusLogo = true;
        }
        else {
            this._snackBar.open('Please select an image file!', 'CLOSE', {
                duration: 2000,
            });
            this.imageFileLogo = '';
            this.imageFileStatusLogo = false;
        }
    }

    /**VALIDATE BLUE PRINT IMAGE FILE */
    fileEventBlueprint(fileInput: any) {
        this.imageFileLogoBlueprint = fileInput.target.files[0];
        if (this.imageFileLogoBlueprint.type === 'image/jpeg' || this.imageFileLogoBlueprint.type === 'image/png' || this.imageFileLogoBlueprint.type === 'image/gif'
            || this.imageFileLogoBlueprint.type === 'image/jpg') {
            this.imageFileStatusBlueprint = true;
        }
        else {
            this._snackBar.open('Blueprint needs be an image file', 'CLOSE', {
                duration: 2000,
            });
            this.imageFileLogoBlueprint = '';
            this.imageFileStatusBlueprint = false;
        }
    }

    /**ADD NEW CITY */
    addNewCity() {
        const add = this._mdDialog.open(AddCityDetailsDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchCities();
        });
    }

    /**ADD NEW AREA */
    addNewArea() {
        const add = this._mdDialog.open(AddAreaDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchAreas();
        });
    }

    /**ADD NEW CATEGORY */
    addNewCategory() {
        const add = this._mdDialog.open(AddParkCategoryDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchParkCategory();
        });
    }



    /**FETCH ALL SELECTED COUNTRIES */
    fetchSelectedCountries() {
        this._parksService.fetchSelectedCountries()
            .subscribe(response => {
                this.countries = response;
                this.fetchState(this.moreDetails.country)
            });
    }

    /**FETCH ALL SELECTED PARKS */
    fetchSelectedParks() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchPark(input)
            .subscribe(response => {
                console.log(response);
                this.allParks = response.data[0].parks;
                console.log(this.allParks);
            });
    }


    /**CHECK COUNTRY SELECTED OR NOT AND ALLERT  */
    checkCountryStatus() {
        if (this.moreDetails.country === 'undefined') {
            this._snackBar.open('Select country to enable state', 'CLOSE', {
                duration: 4000,
            });

        }
    }

    /**FETCH STATE */
    fetchState(value: any) {
        this._parksService.fetchStates(value)
            .subscribe(response => {
                this.allStates = response;
                const len3 = this.allStates.length;
                if (len3 == 0) {
                    this.mystate = '';
                }
                this.countrySelected = true;
            });
    }

    /**FETCH AREAS */
    fetchAreas() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchAreas(input)
            .subscribe(response => {
                this.areas = response.data;
            })

    }

    /**FETCH CATEGORIES */
    fetchParkCategory() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchParkCategory(input)
            .subscribe(response => {
                this.categories = response.data;
            })

    }

    /**FETCH CITIES */
    fetchCities() {
        this.cities = [];
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchCities(input)
            .subscribe(response => {
                const mycity = response.data;
                const len = mycity.length;
                for (let i = 0; i < len; i++) {
                    console.log(mycity[i].state);
                    console.log(this.mystate);

                    if (mycity[i].state === this.mystate) {
                        this.cities.push({
                            city: mycity[i].city,
                            id: mycity[i].id
                        });
                    }

                }
                const len2 = this.cities.length;
                if (len2 == 0) {
                    this.moreDetails.cityId = '';
                }
                //this.cities = response.data;
            });
    }
    /** CODE FOR SELECT SERVICES */
    selectServices() {
        if (this.moreDetails.customerServiceOne === '1') {
            this.divInActiveOne = true;
        }
        if (this.moreDetails.customerServiceTwo === '2') {
            this.divInActiveTwo = true;
        }
        if (this.moreDetails.customerServiceThree === '3') {
            this.divInActiveThree = true;
        }
        if (this.moreDetails.customerServiceFour === '4') {
            this.divInActiveFour = true;
        }
        if (this.moreDetails.customerServiceFive === '5') {
            this.divInActiveFive = true;
        }
        if (this.moreDetails.customerServiceSix === '6') {
            this.divInActiveSix = true;
        }
        /** CODE FOR DISABLED */
        if (this.moreDetails.activeServiceOne === '1') {
            // this.serviceOne = true;
            this.serviceOneDisabled = true;
        }
        if (this.moreDetails.activeServiceTwo === '2') {
            // this.serviceTwo = true;
            this.serviceTwoDisabled = true;
        }
        if (this.moreDetails.activeServiceThree === '3') {
            // this.serviceThree = true;
            this.serviceThreeDisabled = true;
        }
        if (this.moreDetails.activeServiceFour === '4') {
            //  this.serviceFour = true;
            this.serviceFourDisabled = true;
        }
        if (this.moreDetails.activeServiceFive === '5') {
            //  this.serviceFive = true;
            this.serviceFiveDisabled = true;
        }
        if (this.moreDetails.activeServiceSix === '6') {
            //  this.serviceSix = true;
            this.serviceSixDisabled = true;
        }
    }


    /**EDIT USER DATA */
    edit(value: any) {

        if (this.servicesOne === true) {
            this.services1 = '1';
        } else {
            this.services1 = 'undefined';
        }
        if (this.servicesTwo === true) {
            this.services2 = '2';
        } else {
            this.services2 = 'undefined';
        }

        if (this.servicesThree === true) {
            this.services3 = '3';
        } else {
            this.services3 = 'undefined';
        }
        if (this.servicesFour === true) {
            this.services4 = '4';
        } else {
            this.services4 = 'undefined';
        }
        if (this.servicesFive === true) {
            this.services5 = '5';
        } else {
            this.services5 = 'undefined';
        }
        if (this.servicesSix === true) {
            this.services6 = '6';
        } else {
            this.services6 = 'undefined';
        }

        if (value.parkName && value.parkAddress && value.parkState && value.parkCountry && value.parkZipCode) {
            this.addresses = value.parkName + '+' + value.parkAddress + '+' + value.parkState + '+' + value.parkCountry + '+' + value.parkZipCode;
            this._parksService.fetchLatLong(this.addresses + '&key=AIzaSyCUO5Kg5i9s_4O6jfnT7S93xm0HWd6ArGI')
                //   this._parksService.fetchLatLong(this.addresses)

                .subscribe(response => {
                    console.log(response);
                    console.log(response.status);
                    if (response.status === 'OK') {
                        this.parkLatt = response.results['0'].geometry.location.lat;
                        this.parkLongg = response.results['0'].geometry.location.lng;
                    }
                    this.btnStatus = false;
                    this.btnLabel = 'Updating! Please wait...';


                    // console.log('latitude is ' + this.parkLatt);
                    // console.log('logitude is ' + this.parkLongg);

                    const input = new FormData();
                    console.log(this.moreDetails.id);
                    input.append('token', this.authToken);
                    input.append('id', this.moreDetails.id);
                    input.append('parkName', value.parkName);
                    input.append('parkAddress', value.parkAddress);
                    input.append('parkCity', value.parkCity);
                    input.append('parkState', this.mystate);
                    input.append('parkZipCode', value.parkZipCode);
                    input.append('parkPhone', value.parkPhone);
                    input.append('parkEmail', value.parkEmail);
                    input.append('parkWebsite', value.parkWebsite);
                    input.append('parkImage', this.imageFileLogo);
                    input.append('parkBluePrint', this.imageFileLogoBlueprint);
                    input.append('parkCategory', value.parkCategory);
                    input.append('parkArea', value.parkArea);
                    input.append('parkCountry', value.parkCountry);
                    input.append('parkLatt', this.parkLatt);
                    input.append('parkLongg', this.parkLongg);
                    input.append('selectPark', this.moreDetails.buildingUnder);

                    /** Park services */
                    input.append('parkServiceOne', this.services1);
                    input.append('parkServiceTwo', this.services2);
                    input.append('parkServiceThree', this.services3);
                    input.append('parkServiceFour', this.services4);
                    input.append('parkServiceFive', this.services5);
                    input.append('parkServiceSix', this.services6);

                    this._parksService.edit(input)
                        .subscribe(response => {
                            console.log(response);
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
                                this.btnLabel = 'Update Details';
                            }
                        })
                    // } else {
                    //     this._snackBar.open('Please double check your address!', 'CLOSE', {
                    //         duration: 5000,
                    //     });
                    // }
                })
        }
    }


    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
    funshowme() {
        this.showme = true;
    }
    funhideme() {
        this.showme = false;
    }
    public filesSelect(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles = selectedFiles.status;
            return;
        }

        // Handle error statuses here

        this.selectedFiles = Array.from(selectedFiles.files).map(file => {
            // Load the image in
            this.imageFileLogo = file;
            if (file.size > 5000000) {
                this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogo = '';
                this.imageFileStatusLogo = false;
            }
            else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                || file.type === 'image/jpg') {
                this.imageFileStatusLogo = true;
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
                this.imageFileLogo = '';
                this.imageFileStatusLogo = false;
            }


        });
    }
    public filesSelect2(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles2 = selectedFiles.status;
            return;
        }

        // Handle error statuses here

        this.selectedFiles2 = Array.from(selectedFiles.files).map(file => {
            // Load the image in
            this.imageFileLogoBlueprint = file;
            if (file.size > 5000000) {
                this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogoBlueprint = '';
                this.imageFileStatusBlueprint = false;
            }
            else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                || file.type === 'image/jpg') {
                this.imageFileStatusBlueprint = true;

                this.imageShown2 = true;
                this.divshown2 = true;


                let fileReader = new FileReader();
                fileReader.onload = () => {

                    // Set and show the image
                    this.currentProfileImage2 = fileReader.result;

                };

                fileReader.readAsDataURL(file);
            }
            else {
                this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogoBlueprint = '';
                this.imageFileStatusBlueprint = false;
            }


        });
    }
    openDialog(file: any): void {
        let dialogRef = this._mdDialog.open(CropimageeditDialog, {

            data: { image: file }
        });

        dialogRef.afterClosed().subscribe(result2 => {


            if (result2 !== undefined) {

                this.imageFileLogo = result2;
                this.currentProfileImage = result2;


            } else {
                this.imageShown = false;
                this.divshown = false;
                if (this.moreDetails.parkImage !== '') {
                    this.imageShown = true;
                    this.divshown = true;
                    this.currentProfileImage = this._utils.imageUrl + this.moreDetails.parkImage;

                }

            }

        });
    }

    // FUNCTION FOR CHANGING div W R TO SERVICES
    editDiv() {
        this.serviceId = this._utils.fetchServiceId();
        // console.log('serviceId');
        // console.log(this.serviceId);;
        // // if (this.serviceId === '1' && '4' && '2' && '5' && '6') {
        // if (this.serviceId === '4' || '2' || '5' || '6') {
        //     this.divOneStatus = true;
        //     console.log('status');
        //     console.log(this.divOneStatus);

        // } else if (this.serviceId === '2') {
        //     this.divTwoStatus = true;

        // } 
        if (this.serviceId === '3') {
            this.divThreeStatus = true;

        }
        else {
            this.divOneStatus = true;
        }
        // else if (this.serviceId === '4') {
        //     this.divFourStatus = true;

        // } else if (this.serviceId === '5') {
        //     this.divFiveStatus = true;

        // } else if (this.serviceId === '6') {
        //     this.divSixStatus = true;

        // }
    }
}
@Component({

    templateUrl: 'cropimage.html',
})
export class CropimageeditDialog {

    imagedata: any;
    fileimage: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', {static: undefined})
    cropper: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<CropimageeditDialog>,
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
