import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Ng4FilesService,  Ng4FilesConfig,  Ng4FilesStatus,  Ng4FilesSelected } from 'angular4-files-upload';
import { ParksService } from './../../parks.service';
@Component({
    moduleId: module.id,
    templateUrl: './mfr.template.html',
    styleUrls: ['./mfr.template.css'],
    providers: [
        UtilsService,
        ParksService
        
    ]
})
export class mfrDialog implements OnInit {
   
    btnStatus = true;
    btnLabel = 'Save';
    moreDetails: any;
    formValues: any;
    mfr:any;
    pid:any;
    mfrass:any;
    manufacturer :any;
    model_no : any;
    imageFileLogo: any;
    imageFileStatusLogo = true;
    imageUrl: string;
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

    private authToken: any = this._utils.fetchAuthtokenTokenString();
    constructor(
        public _mdDialog: MatDialog,
        public _dialog: MatDialogRef<mfrDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        private _parksService: ParksService,
        private ng4FilesService: Ng4FilesService

    ) { }

    ngOnInit(): void {
       this.manufacturer=this.mfr.manufacturer;
       this.model_no=this.mfr.model_no;
       this.imageUrl = this._utils.imageUrl;
       this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
       this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');

       
       if (this.mfr.logo != null)
       {
           this.imageShown = true;
           this.divshown = true;
           this.currentProfileImage =  this._utils.imageUrl + this.mfr.logo;
      
       }
    }

    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
    /* MFR */
    mfradd() {
        console.log(this.manufacturer);
   if(this.manufacturer !=null && this.model_no != null)
 {
    this.btnStatus = false;
    this.btnLabel = 'Please wait...';
    const input = new FormData();
   
    input.append('token', this.authToken);
    input.append('manufacturer', this.manufacturer);
    input.append('model_no', this.model_no);
    input.append('logo', this.imageFileLogo);
    input.append('equipment_id', this.mfr.id);
    input.append('park_id', this.pid);
    this._parksService.manufactureredit(input)
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
            this.btnLabel = 'Save';
        }

    })
}else{
    this._snackBar.open('Please provide valid input', 'CLOSE', {
        duration: 5000,
    });
}
  
   
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
            || file.type === 'image/jpg' ) {
            this.imageFileStatusLogo = true;
            this.imageShown = true;
            this.divshown = true;
       

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
            this.imageFileLogo = '';
            this.imageFileStatusLogo = false;
        }
          

    });
  } 



}