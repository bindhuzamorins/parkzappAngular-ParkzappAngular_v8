import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UtilsService } from 'app/utils.service';

@Injectable()
export class ParkCategoryService {
  filePath: string;
  public defaultUrl = this._utils.defaultUrl;
  constructor(
    private _http: HttpClient,
    private _utils: UtilsService
  ) { }

  fetchData(data: any) {
    this.filePath = 'parkCategory/fetchParkCategory.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }



  /**EDIT AREA DETAILS*/
  editData(data: any) {
    this.filePath = 'parkCategory/updateParkCategory.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }
  // /**FETCH CITIES*/
  // fetchCities(data: any) {
  //   this.filePath = 'city/fetchAllCity.php';
  //   const input = data;
  //   const headers = new Headers;
  //   headers.append('Content-type', 'application/Json;charset=utf-8');
  //   return this._http
  //     .post(this.defaultUrl + this.filePath, data, headers)
  //     .map((response: Response) => response);
  // }

  // /**DELETE CITY DETAILS*/
  deleteData(data: any) {
    this.filePath = 'parkCategory/deleteParkCategory.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

}


