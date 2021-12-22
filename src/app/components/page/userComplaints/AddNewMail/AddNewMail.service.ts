import { Injectable } from '@angular/core';
import { UtilsService } from '../../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';


@Injectable()
export class AddNewMailService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;


constructor(
    private _http: HttpClient,
    private _utils: UtilsService
) { }


  /**FETCH EMAIL DETAILS*
  fetchData(data: any) {
     this.filePath = 'emails/fetchEmails.php';
     const input = data;
     const headers = new Headers;
     headers.append('Content-type', 'application/Json;charset=utf-8');
     return this._http
         .post(this.defaultUrl + this.filePath, data, headers)
         .map((response: Response) => response.json());
 }

    /**ADD EMAIL*/
    add(data: any) {
        this.filePath = 'emails/addEmails.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
}