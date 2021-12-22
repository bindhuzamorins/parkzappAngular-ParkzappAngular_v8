import { UtilsService } from './../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchaseService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;


    constructor(
        private _http: HttpClient,
        private _utils: UtilsService

    ) { }

        /* CODE FOR SENDING OTP */
    sendVerificationCode(data: any) {
        this.filePath = 'registration/sendVerificationCode.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }


}