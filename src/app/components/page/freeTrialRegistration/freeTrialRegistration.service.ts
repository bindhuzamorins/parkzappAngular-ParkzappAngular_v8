import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class FreeRegistrationService {
    public defaultUrl = this._utils.defaultUrl;
    filePath: string;


    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**CHECK USER NAME UNIQUE OR NOT */
    checkUsername(data: any) {
        this.filePath = 'registration/checkUserName.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**SEND VERIFICATION CODE */
    sendVerificationCode(data: any) {
        this.filePath = 'registration/sendVerificationCode.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FREE TRIAL REGISTRATION */
    freeTrial(data: any) {
        this.filePath = 'registration/trialVersion.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
}