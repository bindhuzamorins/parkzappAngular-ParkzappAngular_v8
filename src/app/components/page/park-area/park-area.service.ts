import { Injectable } from '@angular/core';
import { UtilsService } from './../../../utils.service';
// import { UtilsService } from 'app/utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ParkAreaService {
  filePath: string;
  public defaultUrl = this._utils.defaultUrl;

  constructor(
    private _http: HttpClient,
    private _utils: UtilsService
  ) { }

  /**FETCH AREA DETAILS*/
  fetchData(data: any) {
    this.filePath = 'area/fetchArea.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

  // /**FETCH USA STATES*/
  // fetchUSAStates() {
  //   return this._http
  //     .get('assets/json/USAstates.json')
  //     .map((response: Response) => response);
  // }

  //   /**ADD CITY DETAILS*/
  //   addData(data: any) {
  //     this.filePath = 'city/addCity.php';
  //     const input = data;
  //     const headers = new Headers;
  //     headers.append('Content-type', 'application/Json;charset=utf-8');
  //     return this._http
  //       .post(this.defaultUrl + this.filePath, data, headers)
  //       .map((response: Response) => response);
  //   }

  /**EDIT AREA DETAILS*/
  editData(data: any) {
    this.filePath = 'area/updateArea.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }
  /**FETCH CITIES*/
  fetchCities(data: any) {
    this.filePath = 'city/fetchAllCity.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }

  /**DELETE CITY DETAILS*/
  deleteData(data: any) {
    this.filePath = 'area/deleteArea.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
      .post(this.defaultUrl + this.filePath, data, {headers:headers})
      .map((response: any) => response);
  }
  //   /**FETCH SELECTED COUNTRIES*/
  //   fetchSelectedCountries() {
  //     return this._http
  //       .get('assets/json/selectedCountries.json')
  //       .map((response: Response) => response);
  //   }

  //   /**FETCH STATES*/
  //   fetchStates(value: any) {
  //     return this._http
  //       .get('assets/json/states/' + value + '.json')
  //       .map((response: Response) => response);
  //   }
  //   /**FETCH TIMEZONE*/
  //   fetchtimezone(value: any) {
  //     return this._http
  //       .get('assets/json/timezone.json')
  //       .map((response: Response) => response);
  //   }
}


