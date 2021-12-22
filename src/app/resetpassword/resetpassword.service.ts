import { Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ResetpasswordService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

constructor(
    private _http: HttpClient,
    private _utils: UtilsService
) { }


 /**RESET PASSWORD**/
 resetPwd(data: any) {
    this.filePath = 'user/resetpassword.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}


}