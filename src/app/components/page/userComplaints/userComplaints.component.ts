import { NgForm } from '@angular/forms/';
import { EmailsService } from './../emails/emails.service';
import { WorkOrderService } from './../workOrder/workOrder.service';
import { ParksService } from './../parks/parks.service';
import { ViewComplaintDetailsDialog } from './viewMore/viewMore.template';
import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from "app/utils.service";
import { userComplaintService } from "./userComplaints.service";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4FilesService,  Ng4FilesConfig,  Ng4FilesStatus,  Ng4FilesSelected } from 'angular4-files-upload';
import { AddNewMailDialog } from './AddNewMail/AddNewMail.template';

@Component({
  selector: 'app-userComplaints',
  templateUrl: './userComplaints.component.html',
  styleUrls: ['./userComplaints.component.css'],
  providers: [
    userComplaintService,
    UtilsService,
    ParksService,
    WorkOrderService,
    EmailsService
  ]
})
export class UserComplaintsComponent implements OnInit {
  serviceId: any;
  emails: any;
  snackMessage: string;
  image: string;
  description: any;
  email: any;
  park: any;
  wonumber: any;
  imageFile: any;
  parks: any;
  workOrderNumber: number;
  btnStatus = true;
  btnLabel = 'Generate Work Order';
  imageFileStatus = true;
  authToken:any = this._utils.fetchAuthtokenTokenString();
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
  serviceThree: boolean;
  inspectionName: string;
  insType: string;
  priority: any;
  recurrence: any;
  recurrences: any;
  // searchStatus: boolean;
  // loadStatus: boolean;
  // messageStatus = false;
  // len: any;
  // btnStatus = true;
  // btnLabel = 'Search';
  // userSearchComplaints: any;
  // toDate: any;
  // fromDate: any;
  // userComplaints: any;
  // items: any;
  // snackMessage: any;
  // dataFetchStatus = false;
  // authToken: string | boolean;
  // filterArray: any = { parkName: '' };
  // color = 'accent';

  constructor(
    // public _userComplaintService: userComplaintService,
     public _mdDialog: MatDialog,
    // private _appComponent: AppComponent
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _parkService: ParksService,
    private _workOrderService: WorkOrderService,
    private _snackBar: MatSnackBar,
    private _emailsService: EmailsService,
    private ng4FilesService: Ng4FilesService,

  ) { }


  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.cerateRandum();
    this.fetchParks();
    this.fetchEmail();
    this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
    this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
    this.serviceWorkorder();
    this.fetchRecurrence();

  }
  //  CODE FOR GENERATE WORK ORDER NUMBER
  cerateRandum() {
    this.wonumber = 'W.O # W' + Math.floor((Math.random() * 9999999999) + 1111111111);
    // console.log(this.workOrderNumber);
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._parkService.fetchData(input)
      .subscribe(response => {
        this.parks = response.data[0].parks;
      });
  }

  /**FETCH EMAIL LIST */
  fetchEmail() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._emailsService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.emails = response.data;
        } else {
          this.snackMessage = 'No emails in the email list.';
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });

  }

  /**VALIDATE LOGO IMAGE FILE */
  fileEvent(fileInput: any) {
    this.imageFile = fileInput.target.files[0];
    // console.log(this.imageFile);
    if (this.imageFile.type === 'image/jpeg' || this.imageFile.type === 'image/png' || this.imageFile.type === 'image/gif'
      || this.imageFile.type === 'image/jpg') {
      this.imageFileStatus = true;
    }
    else {
      this._snackBar.open('Please select an image file!', 'CLOSE', {
        duration: 2000,
      });
      this.imageFile = '';
      this.imageFileStatus = false;
    }
  }

 /**FETCH RECCURENCE */
 fetchRecurrence() {
  const input = new FormData();
  input.append('token', this.authToken);
  input.append('serviceId', this.serviceId);
  this._parkService.fetchRecurrence(input)
      .subscribe(response => {
          this.recurrences = response.data;
          console.log(this.recurrences)
      })

}

  /** genertae workorder */
  generate(form: NgForm) {
    this.btnStatus = false;
    this.btnLabel = 'Generating! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    input.append('workOrderNumber', this.wonumber);
    input.append('ParkId', this.park);
    input.append('email', this.email);
    input.append('description', this.description);
    input.append('attachment', this.imageFile);
    input.append('priority', this.priority);
    input.append('recurrence', this.recurrence);


    // console.log(this.wonumber);
     console.log(this.priority);
    this._workOrderService.generate(input)
      .subscribe(response => {
        console.log(response);
        if (response.response_code === '1') {
          this.currentProfileImage = '';
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
           form.reset();
          this.imageShown = false;
          this.divshown = false;
          this.currentProfileImage = '';
          this.cerateRandum();
          this.btnLabel = 'Generate Work Order';
          this.btnStatus = true;
        } else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          // this.btnStatus = true;
          // this.btnLabel = 'Add new recurrence';
        }
      });
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
        if (file.size > 100000000) {
            this._snackBar.open('Maximum size 100MB', 'CLOSE', {
                duration: 6000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
            || file.type === 'image/jpg' ) {
              
            this.imageFileStatus = true;
            this.imageShown = true;
            this.divshown = true;


        let fileReader = new FileReader();
        fileReader.onload = () => {

            // Set and show the image
            this.currentProfileImage = fileReader.result;

        };

        // Read in the file
        fileReader.readAsDataURL(file);


        }else {
            this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                duration: 6000,
            });
            this.imageFile = '';
            this.imageFileStatus = false;
        }
          
    });
  }



  /* FETCH ALL COMPLAINTS */
  // fetchComplaints() {
  //   this.authToken = this._utils.fetchAuthtokenTokenString();
  //   const input = new FormData();
  //   input.append('token', this.authToken);
  //   this._userComplaintService.fetchUserComplaints(input)
  //     .subscribe(response => {
  //       if (response.response_code === '1') {
  //         this.dataFetchStatus = true;
  //         this.searchStatus = true;
  //         this.userComplaints = response.data;
  //         const len = this.userComplaints.length;

  //         this.items = [];
  //         for (let i = 0; i < len; i++) {
  //           this.items.push({
  //             parkName: response.data[i].parkName,
  //           });
  //         }
  //       } else {
  //         this.snackMessage = response.message;
  //         this._snackBar.open(this.snackMessage, 'OKAY', {
  //           duration: 5000,
  //         });
  //         this.messageStatus = true;
  //       }
  //     });
  // }
  /**VIEW MORE BUTTON */
  // viewMore(value) {
  //   const viewMore = this._mdDialog.open(ViewComplaintDetailsDialog, { disableClose: true });
  //   viewMore.componentInstance.moreDetails = value;
  // }
  /**SEARCH COMPLAINT BY DATE */
  // searchComplaints() {
  //   this.btnStatus = false;
  //   this.btnLabel = 'Searching! Please wait...';
  //   this.authToken = this._utils.fetchAuthtokenTokenString();
  //   const input = new FormData();
  //   input.append('token', this.authToken);
  //   input.append('fromDate', this.fromDate);
  //   input.append('toDate', this.toDate);
  //   this._userComplaintService.fetchUserComplaints(input)
  //     .subscribe(response => {
  //       if (response.response_code === '1') {
  //         this.dataFetchStatus = true;
  //         this.loadStatus = false;
  //         this.userComplaints = response.data;
  //         this.messageStatus = false;
  //         const len = this.userComplaints.length;
  //         this.items = [];
  //         for (let i = 0; i < len; i++) {
  //           this.items.push({
  //             parkName: response.data[i].parkName,
  //           });
  //         }
  //         this.btnStatus = true;
  //         this.btnLabel = 'Search';
  //       } else {
  //         this.snackMessage = response.message;
  //         this._snackBar.open(this.snackMessage, 'OKAY', {
  //           duration: 5000,
  //         });
  //         this.btnStatus = true;
  //         this.btnLabel = 'Search';
  //         this.messageStatus = true;
  //         this.dataFetchStatus = false;
  //       }
  //     });
  // }
  /**ADD NEW MAIL */
  openmailDialog() {
    const _dialog = this._mdDialog.open(AddNewMailDialog, { disableClose: true });
    _dialog.afterClosed().subscribe(result => {
      this.fetchEmail();
     
  });

  }

  serviceWorkorder() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1' ) {
      this.insType = 'Select Park';

    } 

    if (this.serviceId === '2' ) {
      this.insType = 'Select Park';

    }

    if (this.serviceId === '3' ) {
        this.serviceThree = true;
        this.insType = 'Select Building';


    }
    if (this.serviceId === '4' ) {
      this.insType = 'Select Park';

    }
    if (this.serviceId === '5' ) {
      this.insType = 'Select Park';

    }
    if (this.serviceId === '6' ) {
      this.insType = 'Select Park';

    }

  }
    
}
