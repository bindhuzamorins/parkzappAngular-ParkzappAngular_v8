import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UtilsService } from 'app/utils.service';
import 'rxjs/add/operator/map';

@Injectable()
export class InspectionNoteService {

  filePath: string;
  public defaultUrl = this._utils.defaultUrl;

  constructor(
    private _http: HttpClient,
    private _utils: UtilsService
  ) { }

  /**FETCH RECORDS*/
  fetchData(data: any) {
    this.filePath = 'records/fetchRecord.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

  /**FETCH RECORDS*/
  fetchParks(data: any) {
    this.filePath = 'park/listAllParks.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

  /**ADD RECORDS*/
  addData(data: any) {

    this.filePath = 'inspectionNotes/addNote.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }
  fetchNote(data: any) {
    this.filePath = 'inspectionNotes/fetchNote.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }
  addCheckListData(data: any) {

    this.filePath = 'assesmentNotes/addNote.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }


  /**DELETE RECORDS*/
  deleteData(data: any) {
    this.filePath = 'records/deleteRecord.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

}