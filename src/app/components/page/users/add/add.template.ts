import { UtilsService } from './../../../../utils.service';
import { UsersService } from './../users.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        UsersService,
        UtilsService
    ]
})
export class AddUserDialog implements OnInit {
    divInActiveOne = false;
    divInActiveTwo = false;
    divInActiveThree = false;
    divInActiveFour = false;
    divInActiveFive = false;
    divInActiveSix = false;
    commonDetailsSix: any;
    commonDetailsFive: any;
    commonDetailsFour: any;
    commonDetailsThree: any;
    commonDetailsTwo: any;
    commonDetailsOne: any;

    fetchData: any;
    serviceId: any;
    today = Date();
    dob: any;
    certExpiry: any;
    CertNumber: any;
    workType: any;
    image: any;
    zipcode: any;
    city: any;
    state: any;
    country: any;
    address: any;
    phone: any;
    role: any;
    email: any;
    password: any;
    username: any;
    lastname: any;
    firstname: any;
    imageFile: any;
    countries: any;
    workTypes: any;
    roles: any;
    authToken: any;
    countrySelected = false;
    minDate = new Date();
    allStates: any;
    moreDetails: any;
    btnStatus = true;
    btnLabel = 'Add new user';
    imageFileStatus = true;
    currentProfileImage: any;
    imageShown: boolean;
    docshown: boolean;
    divshown: boolean;
    serviceOne: boolean;
    serviceTwo: boolean;
    serviceThree: boolean;
    serviceFour: boolean;
    serviceFive: boolean;
    serviceSix: boolean;
    userServiceSix: string;
    userServiceFive: string;
    userServiceFour: string;
    userServiceThree: string;
    userServiceTwo: string;
    userServiceOne: string;
    public selectedFiles;
    private configImage: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };

    private configgif: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };
    constructor(
        public _dialog: MatDialogRef<AddUserDialog>,
        public _usersService: UsersService,
        private _utils: UtilsService,
        public _mdDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private ng4FilesService: Ng4FilesService,
    ) {
    }

    ngOnInit() {
        this.serviceId = this._utils.serviceId;
        this.authToken = this._utils.fetchAuthtokenTokenString();
        this.fetchCommonTask();
        // this.userName();
        this.setService();
        this.fetchRoles();
        this.fetchWorkType();
        this.fetchSelectedCountries();
        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
    }

    /**FETCH COMMON TASKS */
    fetchCommonTask() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._utils.fetchCommonDetails(input)
            .subscribe(response => {
                this.commonDetailsOne = response.data[0].customerServiceOne;
                this.commonDetailsTwo = response.data[0].customerServiceTwo;
                this.commonDetailsThree = response.data[0].customerServiceThree;
                this.commonDetailsFour = response.data[0].customerServiceFour;
                this.commonDetailsFive = response.data[0].customerServiceFive;
                this.commonDetailsSix = response.data[0].customerServiceSix;
                this.selectServices();
            });
    }

    /** CODE FOR SHOWING SERVICES W.R.TO ACTIVE SERVICES*/
    selectServices() {
        if (this.commonDetailsOne === '1') {
            this.divInActiveOne = true;
        }
        if (this.commonDetailsTwo === '2') {
            this.divInActiveTwo = true;
        }
        if (this.commonDetailsThree === '3') {
            this.divInActiveThree = true;
        }
        if (this.commonDetailsFour === '4') {
            this.divInActiveFour = true;
        }
        if (this.commonDetailsFive === '5') {
            this.divInActiveFive = true;
        }
        if (this.commonDetailsSix === '6') {
            this.divInActiveSix = true;
        }
    }



    /** FUNCTION FOR SELECTING SERVICES BY DEFAULT */
    setService() {
        if (this.serviceId == 1) {
            this.serviceOne = true;
            // this.serviceOneClass = 'style="pointer-events: none"';
        } else if (this.serviceId == 2) {
            this.serviceTwo = true;
        } else if (this.serviceId == 3) {
            this.serviceThree = true;
        } else if (this.serviceId == 4) {
            this.serviceFour = true;
        } else if (this.serviceId == 5) {
            this.serviceFive = true;
        } else {
            this.serviceSix = true;
        }
    }

    /**CODE FOR VALIDATING GMAIL ALREADY EXIST OR NOT IN USER TABLE */
    validateEmail() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('email', this.email);
        this._usersService.validateEmail(input)
            .subscribe(response => {
                if (response.response_code == 1) {
                    // this._snackBar.open(response.message, 'CLOSE', {
                    //     duration: 5000,
                    // });
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.email = '';
                }
            });
    }


    /**FETCH ALL SELECTED COUNTRIES */
    fetchSelectedCountries() {
        this._usersService.fetchSelectedCountries()
            .subscribe(response => {
                this.countries = response;
            });
    }

    /**FETCH ALL ROLES */
    fetchRoles() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        this._usersService.fetchRoles(input)
            .subscribe(response => {
                this.roles = response.data;
            });
    }

    /**FETCH WORK TYPES */
    fetchWorkType() {
        this._usersService.fetchWorkType()
            .subscribe(response => {
                this.workTypes = response;
            });
    }

    /**FETCH STATE */
    fetchState(value: any) {
        this._usersService.fetchStates(value)
            .subscribe(response => {
                this.allStates = response;
                this.countrySelected = true;
            });
    }

    /**CHECK COUNTRY SELECTED OR NOT AND ALLERT  */
    checkCountryStatus() {
        if (!this.country) {
            this._snackBar.open('Select country to enable state', 'CLOSE', {
                duration: 4000,
            });

        }
    }

    /**VALIDATE IMAGE FILE */
    fileEvent(fileInput: any) {
        this.imageFile = fileInput.target.files[0];
        if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
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

    /**ADD DATA TO DATABASE */
    add() {
        this.btnStatus = false;
        this.btnLabel = 'Adding! Please wait...';
        this.authToken = this._utils.fetchAuthtokenTokenString();

        if (this.serviceOne === true) {
            this.userServiceOne = '1';
        } else {
            this.userServiceOne = 'undefined';
        }

        if (this.serviceTwo === true) {
            this.userServiceTwo = '2';
        } else {
            this.userServiceTwo = 'undefined';
        }

        if (this.serviceThree === true) {
            this.userServiceThree = '3';
        } else {
            this.userServiceThree = 'undefined';
        }
        if (this.serviceFour === true) {
            this.userServiceFour = '4';
        } else {
            this.userServiceFour = 'undefined';
        }
        if (this.serviceFive === true) {
            this.userServiceFive = '5';
        } else {
            this.userServiceFive = 'undefined';
        }
        if (this.serviceSix === true) {
            this.userServiceSix = '6';
        } else {
            this.userServiceSix = 'undefined';
        }


        const input = new FormData();
        input.append('first_name', this.firstname);
        input.append('last_name', this.lastname);
        input.append('user_name', this.username);
        input.append('password', this.password);
        input.append('email', this.email);
        input.append('role', this.role);
        input.append('phone', this.phone);
        input.append('street_address', this.address);
        input.append('country', this.country);
        input.append('state', this.state);
        input.append('city', this.city);
        input.append('zip_code', this.zipcode);
        input.append('work_type', this.workType);

        /** Park services */
        input.append('userServiceOne', this.userServiceOne);
        input.append('userServiceTwo', this.userServiceTwo);
        input.append('userServiceThree', this.userServiceThree);
        input.append('userServiceFour', this.userServiceFour);
        input.append('userServiceFive', this.userServiceFive);
        input.append('userServiceSix', this.userServiceSix);

        if (this.certExpiry) {
            const year = this.certExpiry.getFullYear();
            const month = this.certExpiry.getMonth() + 1;
            const day = this.certExpiry.getDate();
            this.certExpiry = year + "-" + month + "-" + day;

        } else {
            this.certExpiry = '';
        }
        this.dob = '';
        // if (this.dob) {
        //     const year1 = this.dob.getFullYear();
        //     const month1 = this.dob.getMonth() + 1;
        //     const day1 = this.dob.getDate();
        //     this.dob = year1 + "-" + month1 + "-" + day1;

        // } else {
        //     this.dob = '';
        // }
        input.append('certificate_expiery_date', this.certExpiry);
        input.append('certification_no', this.CertNumber);
        input.append('dob', this.dob);
        input.append('profile_image', this.imageFile);
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);

        // console.log('username ' + this.firstname);
        // console.log('last name  ' + this.lastname);
        // console.log('username' + this.username);
        // console.log('password  ' + this.password);
        // console.log('email    ' + this.email);
        // console.log(this.role);
        // console.log(this.phone);
        // console.log(this.address);
        // console.log(this.country);
        // console.log(this.state);
        // console.log(this.city);
        // console.log(this.zipcode);
        // console.log(this.workType);
        // console.log(this.certExpiry);
        // console.log(this.CertNumber);
        // console.log(this.dob);
        // console.log(this.imageFile);
        // console.log(this.authToken);
        // console.log(this.serviceId);
        //  console.log(this.userServiceOne);
        //  console.log(this.userServiceTwo);
        //  console.log(this.userServiceThree);
        //  console.log(this.userServiceFour);
        //  console.log(this.userServiceFive);
        //  console.log(this.userServiceSix);


        this._usersService.addData(input)
            .subscribe(response => {
                if (response.response_code === 1) {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this._dialog.close();
                    this.fetchData();
                }
                else {
                    this._snackBar.open(response.message, 'CLOSE', {
                        duration: 5000,
                    });
                    this.btnStatus = true;
                    this.btnLabel = 'Add new user';
                    this._dialog.close();
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
                || file.type === 'image/jpg') {
                this.imageFileStatus = true;

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
        let dialogRef = this._mdDialog.open(CropimageuseraddDialog, {

            data: { image: file }
        });

        dialogRef.afterClosed().subscribe(result2 => {


            if (result2 !== undefined) {



                this.imageFile = result2;
                this.currentProfileImage = result2;


            } else {
                this.currentProfileImage = "";
                this.imageShown = false;
                this.divshown = false;
            }

        });
    }
}
@Component({

    templateUrl: 'cropimage.html',
})
export class CropimageuseraddDialog {

    imagedata: any;
    fileimage: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<CropimageuseraddDialog>,
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
