
import {map} from 'rxjs/operators';
import { environment } from './../environments/environment';

//import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilsService {

    filePath: string;
    authToken: string;
    constructor(
        private _http: HttpClient,
    ) {
        this.fetchServiceId();
    }


    /*------------------------------------- HELP VEDIOS URL FOR DEVELOPMENT-----------------------------------*/
    // public videoUrl = environment.videoUrl;
    public videoUrl = 'https://s3.amazonaws.com/parkzappdev/helpvideos/';

    /*------------------------------------- HELP VEDIOS URL FOR PRODUCTION-----------------------------------*/
    // public videoUrl = 'https://s3.amazonaws.com/parkzappprod/helpvideos/';


    /*------------------------------------- WEBSERVICES DEVELOPMENT URL-----------------------------------*/

    // public defaultUrl = 'http://localhost/parkZappWebservices/src/';
    // public defaultUrl = 'http://admin.parkzapp.com/webservices/parkzappAngular/parkZappWS2.4/src/';
    // public defaultUrl = 'http://admin.parkzapp.com/webservices/parkzappAngular/parkZappWS2.5.1/src/';

    // public defaultUrl = environment.webServiceBase;

    /*------------------------------------- WEBSERVICES PRODUCTION URL-----------------------------------*/
    public defaultUrl = 'https://www.parkzapp.com/webservices/parkZappWS2.5/src/';

    /*------------------------------------- S3 URL DEVELOPMENT-----------------------------------*/
    // public imageUrl = environment.imageUrl;
    // public imageUrl = 'https://s3.amazonaws.com/parkzappdev/';
    public imageUrl = 'https://s3.amazonaws.com/parkzappprod/';
    /*------------------------------------- S3 URL PRODUCTION-----------------------------------*/
    // public imageUrl = 'https://s3.amazonaws.com/parkzappprod/';

    /*------------------------------------- WEBSERVICES-----------------------------------*/
    /*DEFAULT DEVELOPMENT WEBSERVICE URL*/
    //public defaultUrl = 'https://www.parkzapp.com/webservices/parkZappWS2.2/src/';
    //public defaultUrl = 'https://www.parkzapp.com/webservices/parkZappWS2.3/src/';
    // public defaultUrl = 'http://localhost/webservices/parkZappWS2.3/src/';

    /*------------------------------------- WEBSERVICES-----------------------------------*/

    /*------------------------------------- S3 URL-----------------------------------*/
    /*DEFAULT PRODUCTION S3 URL*/

    /*DEFAULT PRODUCTION S3 URL*/
    /*------------------------------------- S3 URL-----------------------------------*/
    public serviceId: any = '';

    /**FETCH AUTH TOKEN*/
    fetchAuthtoken() {
        this.authToken = localStorage.getItem(btoa('authToken'));
        if (!this.authToken || this.authToken == 'false') {
            return false;
        } else {
            return true;
        }
    }

    /**FETCH AUTH TOKEN STRING */
    fetchAuthtokenTokenString() {
        this.authToken = localStorage.getItem(btoa('authToken'));
        if (!this.authToken || this.authToken == 'false') {
            return false;
        } else {
            return this.authToken;
        }
    }

    /**SET AUTH TOKEN */
    setAuthtoken(value: any) {
        localStorage.setItem(btoa('authToken'), value);
    }

    /**FETCH COMMON DETAILS */
    fetchCommonDetails(data: any) {
        this.filePath = 'commonDetails/commonDetails.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**STRIPE PAYMENT */
    openCheckout(amount, email, description) {
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_vYRQsrhZHZU1fuCDltMGoUra',
            image: 'https://www.zamorinstech.com/assets/images/logo.jpg',
            locale: 'auto',
            token: (token: any) => {

                // var stripe = require("stripe")(
                //     "sk_test_XaS5h82zg4eznCgTnBeezV3p"
                // );

                // stripe.charges.retrieve(
                //     "ch_1AtXBRAGoHCnebjftQ5PP6RL",
                //     function (err, charge) {
                //         // asynchronously called
                //     }
                // );
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
            }
        });

        handler.open({
            name: 'ParkZapp Subscription',
            description: description,
            amount: amount,
            email: email
        });

    }

    // FUNCTION FOR SETTING SERVICE ID
    createServiceId(value: any) {
        localStorage.setItem(btoa('serviceId'), value);
        this.serviceId = localStorage.getItem(btoa('serviceId'));
    }
    // FUNCTION FOR SETTING SERVICE ID
    fetchServiceId() {
        this.serviceId = localStorage.getItem(btoa('serviceId'));
        return this.serviceId;
    }
}