import { ViewParksUserDialog } from './viewParks/viewParks.template';
import { DeleteUserDialog } from './delete/delete.template';
import { EditUserDialog } from './edit/edit.template';
import { AddUserDialog } from './add/add.template';
import { ViewMoreUserDialog } from './viewMore/viewMore.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';
import { UsersService } from './users.service';
import { AppComponent } from './../../../app.component';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [
    UsersService,
    UtilsService,
  ]

})
export class UsersComponent implements OnInit {
  serviceId: any;
  loadingStatus: boolean;
  assignedParks: any;
  adminId: any;
  adminStatus: boolean;
  notificationStatus: boolean;
  snackMessage: any;
  items: any[];
  users: any;
  dataFetchStatus: boolean;
  authToken: any;
  filterArray: any = { first_name: '' };
  color = 'accent';
  userAssignHead: string;
  userAssignButton: string;
  userName: any;


  constructor(
    public _usersService: UsersService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.fetchData();
    this.viewUser();
    this.fetchCommonTask();
  }

  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.userName = response.data[0].userName;



      });
  }
  /**FETCH ALL USERS */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._usersService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;

          this.users = response.data;
          // console.log(response.data);
          // if (response.data.role_id !== '1') {
          //   this.adminStatus = true;

          // }
          // else {
          //   this.adminStatus = false;
          // }

          const len = this.users.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              first_name: response.data[i].first_name
            });
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }

  /**VIEW MORE USER DETAILS */
  viewMore(value: any) {

    console.log(value);
    const dialog = this._mdDialog.open(ViewMoreUserDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
  }

  /**ADD USER */
  // add(value: any) {
  add() {
    // if (this.users.length >= this._appComponent.maximumUsers) {
    //   this.snackMessage = 'Cannot add more users. Limit is ' + this._appComponent.maximumUsers + '. Upgrade plan for more users';
    //   this._snackBar.open(this.snackMessage, 'OKAY', {
    //     duration: 10000
    //   });
    // }
    // else {
    //   const dialog = this._mdDialog.open(AddUserDialog, { disableClose: true });
    //   // dialog.componentInstance.moreDetails = value;
    //   dialog.afterClosed().subscribe(result => {
    //     this.fetchData();
    //   });
    // }
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);

    this._usersService.checkUserCount(input)
      .subscribe(response => {
        if (response.response_code == 0) {
          this._snackBar.open(response.message + ' Upgrade plan for more users', 'CLOSE', {
            duration: 5000,
          });
        }
        else {
          const dialog = this._mdDialog.open(AddUserDialog, { disableClose: true });
          // dialog.componentInstance.moreDetails = value;
          dialog.afterClosed().subscribe(result => {
            this.fetchData();
          });
        }
      })
  }


  /**EDIT USER DETAILS */
  edit(value: any) {
    const dialog = this._mdDialog.open(EditUserDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE USER DETAILS */
  delete(value: any) {
    this.adminId = this._appComponent.id;
    if (this.adminId === value.user_id) {
      this.snackMessage = 'Cannot delete main admin account!';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 5000,
      });

    } else {
      const dialog = this._mdDialog.open(DeleteUserDialog, { disableClose: true });
      dialog.componentInstance.moreDetails = value;
      dialog.afterClosed().subscribe(result => {
        this.fetchData();
      });
    }
  }

  /**VIEW PARKS ASSIGNED TO USER */
  viewParks(value: any) {
    this.loadingStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', value.user_id);
    input.append('serviceId', this.serviceId);

    this._usersService.fetchAssignedParks(input)
      .subscribe(response => {
        console.log(response);
        if (response.response_code === '1') {
          this.loadingStatus = true;
          if (response.data == null) {
            this.snackMessage = 'No park assigned!';
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000,
            });
          } else {
            this.loadingStatus = false;
            this.assignedParks = response.data;
            const dialog = this._mdDialog.open(ViewParksUserDialog, { disableClose: true });
            dialog.componentInstance.moreDetails = value;
            dialog.componentInstance.assignedParks = this.assignedParks;
          }
        } else {
          this.loadingStatus = false;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }


      })
  }

  /**TOGGLE NOTIFICATION FOR SELECTED USER */
  toggleNotification(value: any) {
    this.loadingStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', value.user_id);
    this._usersService.toggleNotification(input)
      .subscribe(response => {
        this.loadingStatus = false;
        this.snackMessage = response.message;
        this._snackBar.open(this.snackMessage, 'OKAY', {
          duration: 5000,
        });
        this.fetchData();
      })
  }
  viewUser() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1') {
      this.userAssignHead = 'Assigned Parks ';
      this.userAssignButton = 'View Assigned Parks';
    }

    if (this.serviceId === '2') {
      this.userAssignHead = 'Assigned Parks ';
      this.userAssignButton = 'View Assigned Parks';
    }

    if (this.serviceId === '3') {
      this.userAssignHead = 'Assigned Buildings';
      this.userAssignButton = 'View Assigned Buildings';

    }

    if (this.serviceId === '4') {
      this.userAssignHead = 'Assigned Parks';
      this.userAssignButton = 'View Assigned Parks';

    }

    if (this.serviceId === '5') {
      this.userAssignHead = 'Assigned Parks ';
      this.userAssignButton = 'View Assigned Parks';

    }

    if (this.serviceId === '6') {
      this.userAssignHead = 'Assigned Parks ';
      this.userAssignButton = 'View Assigned Parks';

    }
  }


}