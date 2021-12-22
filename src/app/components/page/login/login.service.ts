import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**CHECK USER LOGIN */
    checkUser(data: any) {
        this.filePath = 'auth/login.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**SEND VERIFICATION CODE */
    sendVerificationCode(data: any) {
        this.filePath = 'auth/sendVerificationCode.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    
    /**reset password */
    resetPwd(data: any) {
        this.filePath = 'auth/resetPassword.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

}