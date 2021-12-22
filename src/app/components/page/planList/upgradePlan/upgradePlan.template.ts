import { StripePaymentDialog } from './../stripePayment/stripePayment.template';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: './upgradePlan.template.html',
    styleUrls: ['./upgradePlan.template.css'],
    providers: [
        UtilsService
    ]
})
export class UpgradePlanDialog implements OnInit {
    enCodedValue: string;
    enCode: string;
    renewBtnStatus: boolean;
    stripeReturn: void;
    email: string;
    description: string;
    payAmount: number;
    imageUrl: string;
    moreDetails: any;
    planId: any;
    authToken = this._utils.fetchAuthtokenTokenString();
    constructor(
        public viewMore: MatDialogRef<UpgradePlanDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        public _mdDialog: MatDialog,
    ) {
        this.imageUrl = this._utils.imageUrl;
    }

    ngOnInit() {
        if (this.planId == this.moreDetails.id) {
            this.renewBtnStatus = true;
        }
        else {
            this.renewBtnStatus = false;
        }
    }

    /*CLOSE DIALOG*/
    close() {
        this.viewMore.close();
    }

    /** RENEW PLAN */
    payRenew() {
        this.enCode = this.moreDetails.id + '@#$' + this.authToken;
        this.enCodedValue = btoa(this.enCode);
        // console.log(btoa(this.enCodedValue));
        window.open(this._utils.defaultUrl + 'registration/renewPlan.php?id=' + this.enCodedValue, "_blank");
        // window.open(this._utils.defaultUrl + 'upgradeplans.php?id=' + this.planId + ',' + this.authToken, "_blank");
    }

    /**LINK TO STRIPE */
    pay() {
        this.enCode = this.moreDetails.id + '@#$' + this.authToken;
        this.enCodedValue = btoa(this.enCode);
        // console.log(btoa(this.enCodedValue));
        window.open(this._utils.defaultUrl + 'registration/upgradeplans.php?id=' + this.enCodedValue, "_blank");
        // window.open(this._utils.defaultUrl + 'upgradeplans.php?id=' + this.planId + ',' + this.authToken, "_blank");
    }

    // /**CUSTOM PAYEMENT TEMPLATE */
    // purchase() {
    //     const _dialog = this._mdDialog.open(StripePaymentDialog, { disableClose: true });
    // }


    // /**PURCHASE THE NEW PLAN */
    // purchase() {
    //     this.payAmount = this.moreDetails.price * 100;
    //     this.description = 'Purchase ' + this.moreDetails.planName;
    //     this.email = 'contact@zamorinstech.com';
    //     this._utils.openCheckout(this.payAmount, this.email, this.description);


    // }
}   