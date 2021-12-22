import { UtilsService } from './../../../../utils.service';
import { UsersService } from './../users.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { Ng4FilesService,  Ng4FilesConfig,  Ng4FilesStatus,  Ng4FilesSelected } from 'angular4-files-upload';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
@Component({
    moduleId: module.id,
    templateUrl: './edit.template.html',
    styleUrls: ['./edit.template.css'],
    providers: [
        UsersService,
        UtilsService
    ]
})

export class EditUserDialog implements OnInit {
    serviceId; any;
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

    divActiveOne = false;
    divActiveTwo = false;
    divActiveThree = false;
    divActiveFour = false;
    divActiveFive = false;
    divActiveSix = false;

    countrySelected: boolean;
    date1 : any;
    date2 : any;
    minDate = new Date();
    allStates: any;
    countries: any;
    image: any;
    today = Date();
    btnStatus = true;
    btnLabel = 'Update user details';
    imageFileStatus = true;
    imageFile: any='';
    workTypes: any;
    roles: any;
    authToken: any;
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
    constructor(
        public _dialog: MatDialogRef<EditUserDialog>,
        public _usersService: UsersService,
        private _utils: UtilsService,
        private _snackBar: MatSnackBar,
        public _mdDialog: MatDialog,
        private ng4FilesService: Ng4FilesService,
    ) {

    }

    ngOnInit() {
        this.selectServices();
        this.fetchRoles();
        this.fetchWorkType();
        this.fetchSelectedCountries();
        this.fetchState(this.moreDetails.country);
        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
        const imagepic =this.moreDetails.profile_image;
        if (this.moreDetails.profile_image !== '' && !imagepic.includes('defaultuserimage.png'))
        {
            this.imageShown = true;
            this.divshown = true;
            this.currentProfileImage =  this._utils.imageUrl + this.moreDetails.profile_image;
        }
        const dateass = new Date(this.moreDetails.certificate_expiery_date);
        const year  = dateass.getFullYear();
        const month = dateass.getMonth()+1;
        const day = dateass.getDate();
        this.date1 = new Date(month+"/"+day+"/"+year);
        
        if(this.date1=='Invalid Date')
        {
            this.date1='0/0/0000';
        
        }
        const dateass1 = new Date(this.moreDetails.dob);
        const year1 = dateass1.getFullYear();
        const month1 = dateass1.getMonth()+1;
        const day1 = dateass1.getDate();
        this.date2 = new Date(month1+"/"+day1+"/"+year1);
        if(this.date2=='Invalid Date')
        {
            this.date2='0/0/0000';
         
          
        }
       
    }

    /**FETCH ALL ROLES */
    fetchRoles() {
        const input = new FormData();
        this.authToken = this._utils.fetchAuthtokenTokenString();
        input.append('token', this.authToken);
        this._usersService.fetchRoles(input)
            .subscribe(response => {
                this.roles = response.data;
            });
    }

    /**VALIDATE IMAGE FILE */
    fileEvent(fileInput: any) {
        this.imageFile = fileInput.target.files[0];
        if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
            || this.imageFile.type === 'image/jpg') {
            this.imageFileStatus = true;
        } else {
            this._snackBar.open('Please select a valid image file', 'CLOSE', {
                duration: 2000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
    }

    /**CHECK COUNTRY SELECTED OR NOT AND ALLERT  */
    checkCountryStatus() {
        if (this.moreDetails.country === 'undefined') {
            this._snackBar.open('Select country to enable state', 'CLOSE', {
                duration: 4000,
            });

        }
    }

    /**FETCH WORK TYPES */
    fetchWorkType() {
        this._usersService.fetchWorkType()
            .subscribe(response => {
                this.workTypes = response;
            });
    }

    /**FETCH ALL SELECTED COUNTRIES */
    fetchSelectedCountries() {
        this._usersService.fetchSelectedCountries()
            .subscribe(response => {
                this.countries = response;
            });
    };

    /**FETCH STATE */
    fetchState(value: any) {
        this._usersService.fetchStates(value)
            .subscribe(response => {
                this.allStates = response;
                this.countrySelected = true;
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

       // console.log(value);
        // console.log('from 1   ' + this.servicesOne);
        // console.log('from 2   ' + this.serviceTwo);
        // console.log('from 3   ' + this.serviceThree);
        // console.log('from 4   ' + this.serviceFour);
        // console.log('from 5   ' + this.serviceFive);
        // console.log('from 6   ' + this.serviceSix);

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

        // console.log('from 1   ' + this.services1);
        // console.log('from 2   ' + this.services2);
        // console.log('from 3   ' + this.services3);
        // console.log('from 4   ' + this.services4);
        // console.log('from 5   ' + this.services5);
        // console.log('from 6   ' + this.services6);

        this.btnStatus = false;
        this.btnLabel = 'Updating! Please wait...';
        const input = new FormData();
        input.append('profile_image', this.imageFile);
        console.log(this.imageFile)
        input.append('token', this.authToken);
        input.append('id', this.moreDetails.user_id);
        input.append('first_name', value.first_name);
        input.append('last_name', value.last_name);
        input.append('user_name', value.username);
        input.append('password', value.password);
        input.append('email', value.email);
        input.append('role', value.role);
        input.append('phone', value.phone);
        input.append('street_address', value.address);
        input.append('country', value.country);
        input.append('state', value.state);
        input.append('city', value.city);
        input.append('zip_code', value.zipcode);
        input.append('work_type', value.workType);

        /**services */
        input.append('serviceId', this.serviceId);
        input.append('userServiceOne', this.services1);
        input.append('userServiceTwo', this.services2);
        input.append('userServiceThree', this.services3);
        input.append('userServiceFour', this.services4);
        input.append('userServiceFive', this.services5);
        input.append('userServiceSix', this.services6);

        if (value.certExpiry!="" && value.certExpiry!='0/0/0000') 
        {
            const year  = value.certExpiry.getFullYear();
            const month = value.certExpiry.getMonth()+1;
            const day = value.certExpiry.getDate();
            this.date1 = year + "-" + month + "-" + day;
           
        }else{
            this.date1='';
        }
        if (value.dob && value.dob!='0/0/0000') 
        {
            const year1  = value.dob.getFullYear();
            const month1 = value.dob.getMonth()+1;
            const day1 = value.dob.getDate();
            this.date2 = year1+"-"+month1+"-"+day1;
           
        }else{
            this.date2='';
        }
        input.append('certificate_expiery_date',  this.date1);
        input.append('certification_no', value.CertNumber);
        // input.append('dob', this.date2);
        this._usersService.editData(input)
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
                    this.btnLabel = 'Update user details';
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
                || file.type === 'image/jpg' ) {
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
      openDialog(file : any): void {
        let dialogRef = this._mdDialog.open(CropimageusereditDialog, {
         
          data: { image: file }
        });
    
        dialogRef.afterClosed().subscribe(result2 => {
        
          
          if(result2 !== undefined)
          {
          
            this.imageFile =  result2;
            this.currentProfileImage = result2;
           
             
          }else
          {
               this.currentProfileImage = "";
               this.imageShown = false;
               this.divshown = false;
               if (this.moreDetails.profile_image !== '')
               {
                   this.imageShown = true;
                   this.divshown = true;
                   this.currentProfileImage =  this._utils.imageUrl + this.moreDetails.profile_image;
               }
          }
          
        });
      }

}
@Component({
    
      templateUrl: 'cropimage.html',
    })
    export class CropimageusereditDialog {
    
      imagedata: any;
      fileimage : any;
      cropperSettings: CropperSettings;
      @ViewChild('cropper', undefined)
      cropper:ImageCropperComponent;
   
    constructor(
        public dialogRef: MatDialogRef<CropimageusereditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
         
          this.cropperSettings = new CropperSettings();
          this.cropperSettings.width = 150;
          this.cropperSettings.height = 150;
          this.cropperSettings.croppedWidth =150;
          this.cropperSettings.croppedHeight = 150;
          this.cropperSettings.canvasWidth = 400;
          this.cropperSettings.canvasHeight = 300;
          this.cropperSettings.noFileInput = true;
          this.cropperSettings.keepAspect = false;
          
          var image:any = new Image();
          var file:File = data.image;
          var myReader:FileReader = new FileReader();
          var that = this;
          myReader.onloadend = function (loadEvent:any) {
              image.src = loadEvent.target.result;
              that.cropper.setImage(image);
           
          };
       console.log(that.fileimage);
          myReader.readAsDataURL(file);
        
          this.imagedata = {image : image.src, file :  data.image };
         }
    
      cancelme() {
         
         
        this.dialogRef.close();
      }
      saveme() {
        
          this.dialogRef.close();
        }
  }