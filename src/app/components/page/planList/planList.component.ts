import { UpgradePlanDialog } from './upgradePlan/upgradePlan.template';
import { CustomPaymentDialog } from './customPayment/customPayment.template';
import { PlanMoreDetailsDialog } from './moreDetails/moreDetails.template';
import { AppComponent } from './../../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from './../../../utils.service';
import { PlanListService } from './planList.service';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planList',
  templateUrl: './planList.component.html',
  styleUrls: ['./planList.component.css'],
  providers: [
    PlanListService,
    UtilsService
  ]
})
export class PlanListComponent implements OnInit {
  planId: any;
  id: any;
  userName: any;
  clientCode: any;
  maximumUsers: any;
  maximumPlaygrounds: any;
  validDays: any;
  planName: any;
  expiryDate: any;
  licencedDate: any;
  commonDetails: any;
  snackMessage: any;
  plans: any;
  dataFetchStatus = false;
  authToken:any = this._utils.fetchAuthtokenTokenString();
  constructor(
    private _planListService: PlanListService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.fetchPlans();
    this.fetchCommonTask();
  }

  /**FETCH COMMON TASKS */
  fetchCommonTask() {
    const input = new FormData();
    input.append('token', this.authToken);
    this._utils.fetchCommonDetails(input)
      .subscribe(response => {
        this.planId = response.data[0].planId;
        this.commonDetails = response.data[0];
        this.licencedDate = response.data[0].licencedDate;
        this.expiryDate = response.data[0].expiryDate;
        this.planName = response.data[0].planName;
        this.validDays = response.data[0].validDays;
        this.maximumPlaygrounds = response.data[0].maximumPlaygrounds;
        this.maximumUsers = response.data[0].maximumUsers;
        this.clientCode = response.data[0].clientCode;
        this.userName = response.data[0].userName;
        this.id = response.data[0].id;
      });
  }

  /**FETCH LIST OF ALL PLANS */
  fetchPlans() {
    const input = new FormData();
    input.append('token', this.authToken);
    this._planListService.fetchPlans(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.plans = response.data;
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }

  /**VIEW MORE DETAILS ABOUT THE PLAN */
  viewMoreDetails(value) {
    const viewMore = this._mdDialog.open(PlanMoreDetailsDialog, { disableClose: true });
    viewMore.componentInstance.moreDetails = value;
  }

  /**CUSTOM PAYEMENT TEMPLATE */
  customPayment() {
    const _dialog = this._mdDialog.open(CustomPaymentDialog, { disableClose: true });
  }


  /**UPGRADE THE PLAN */
  upgradePlan(value) {
    const _dialog = this._mdDialog.open(UpgradePlanDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.componentInstance.planId = this.planId;
  }

}
