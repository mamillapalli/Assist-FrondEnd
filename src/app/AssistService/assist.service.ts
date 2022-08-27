import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, delay, Observable, of, throwError} from "rxjs";
import {catchError, finalize, retry} from "rxjs/operators";
import {AuthService} from "../modules/auth";
import {AuthModel} from "../modules/auth/models/auth.model";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "./notification.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class assistService {

  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _errorMessage = new BehaviorSubject<string>('');
  private authToken: AuthModel | any;
  httpHeaders: any

  constructor(private http: HttpClient, private authService: AuthService,private spinner: NgxSpinnerService,
              public notifyService: NotificationService) {
    this.authToken = this.authService.getAuthFromLocalStorage();
    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authToken?.jwt}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getMethod(url: any, statusType: any) {
    console.log('get method')
    this.spinner.show()
    this.authToken = this.authService.getAuthFromLocalStorage();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.authToken?.jwt}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    if(statusType === 'MASTER')
    {
      let httpParams = new HttpParams();
      httpParams = httpParams.append('status' , true);
      return this.http.get<any>(url, {headers: httpHeaders}).pipe(
        delay(100),
        catchError((err) => {
          this.notifyService.showError(err.error.message, 'Error')
          this.spinner.hide()
          return of([]);
        }),
        finalize(() => this.spinner.hide())
      );
    }
    return this.http.get<any>(url, {headers: httpHeaders}).pipe(
      delay(100),
      catchError((err) => {
        this.notifyService.showError(err.error.message, 'Error')
        this.spinner.hide()
        return of([]);
      }),
      finalize(() => this.spinner.hide())
    );
  }

  public initializeColumnProperties(displayedColumns:any ,columnShowHideList : any ) {
      displayedColumns.forEach((element: any, index: any) => {
      columnShowHideList.push(
        {
          possition: index, name: element, isActive: true
        }
      );
    });
  }

  public toggleColumn(column: any,displayedColumns:any) {
    if (column.isActive && column.name !== 'columnSetting') {
      if (column.possition > displayedColumns.length - 1) {
        displayedColumns.push(column.name);
      } else {
        displayedColumns.splice(column.possition, 0, column.name);
      }
    } else {
      let i = displayedColumns.indexOf(column.name);
      let opr = i > -1 ? displayedColumns.splice(i, 1) : undefined;
    }
  }


  callMethod(url:any,mode:any,data:any,activeModal:any): any{
    if(mode == "new") {
      this.postMethod(url, mode, data).subscribe(res => {
        if (res !== undefined) {
          Swal.fire({
            title: 'Add Record Successfully',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
              Swal.close();
              activeModal.close();
            }
          });
          return "success";
        } else {
          Swal.fire({
            title: 'Error is occurred.',
            icon: 'error'
          }).then((result) => {
            if (result.value) {
              Swal.close();
            }
          });
          return "failure";
        }
      }, (error: { message: any; }) => {
        console.error('There was an error!', error.message);
        activeModal.close();
        return;
      });
    }
    else if(mode == "edit") {
      this.putMethod(url, mode, data).subscribe(res => {
        if (res !== undefined) {
          Swal.fire({
            title: 'Edit Record Successfully',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
              Swal.close();
              activeModal.close();
            }
          });
          return "success";
        } else {
          Swal.fire({
            title: 'Error is occurred.',
            icon: 'error'
          }).then((result) => {
            if (result.value) {
              Swal.close();
            }
          });
          return "failure";
        }
      }, (error: { message: any; }) => {
        console.error('There was an error!', error.message);
        activeModal.close();
        return;
      });
    }
    else if(mode == "auth") {
      this.putMethod(url, mode, data).subscribe((res: any) => {
        if (res !== undefined) {
          Swal.fire({
            title: 'Approved Record Successfully',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
              Swal.close();
              activeModal.close();
            }
          });
          return "success";
        } else {
          Swal.fire({
            title: 'Error is occurred.',
            icon: 'error'
          }).then((result) => {
            if (result.value) {
              Swal.close();
            }
          });
          return "failure";
        }
      }, (error: { message: any; }) => {
        console.error('There was an error!', error.message);
        activeModal.close();
        return;
      });
    }
    else if(mode == "rej") {
      this.putMethod(url, mode, data).subscribe((res: any) => {
        if (res !== undefined) {
          Swal.fire({
            title: 'Approved Record Successfully',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
              Swal.close();
              activeModal.close();
            }
          });
          return "success";
        } else {
          Swal.fire({
            title: 'Error is occurred.',
            icon: 'error'
          }).then((result) => {
            if (result.value) {
              Swal.close();
            }
          });
          return "failure";
        }
      }, (error: { message: any; }) => {
        console.error('There was an error!', error.message);
        activeModal.close();
        return;
      });
    }
    else if(mode == "delete") {
      this.deleteMethod(url, mode).subscribe((res: any) => {
        if (res !== undefined) {
          Swal.fire({
            title: 'Delete Record Successfully',
            icon: 'success'
          }).then((result) => {
            if (result.value) {
              Swal.close();
              activeModal.close();
            }
          });
          return "success";
        } else {
          Swal.fire({
            title: 'Error is occurred.',
            icon: 'error'
          }).then((result) => {
            if (result.value) {
              Swal.close();
            }
          });
          return "failure";
        }
      }, (error: { message: any; }) => {
        console.error('There was an error!', error.message);
        activeModal.close();
        return;
      });
    }
  }


  public postMethod(url:any,mode:any,data:any): Observable<any>{
    this.spinner.show();
    const dataJsonFormat = JSON.stringify(data);
    console.log(dataJsonFormat);
    console.log(url);
    return this.http.post<any>(url, dataJsonFormat, {
      headers: this.httpHeaders
    }).pipe(
      delay(100),
      catchError((err) => {
        this.notifyService.showError(err.message, 'Error')
        return of(undefined);
      }),
      finalize(() => this.spinner.hide())
    );
  }

  public putMethod(url: any, mode: any, data: any) {
    this.spinner.show();
    const dataJsonFormat = JSON.stringify(data);
    console.log(dataJsonFormat);
    return this.http.put<any>(url, dataJsonFormat, {
      headers: this.httpHeaders
    }).pipe(
      delay(100),
      catchError((err) => {
        this.notifyService.showError(err.message, 'Error')
        return of(undefined);
      }),
      finalize(() => this.spinner.hide())
    );
  }

  private deleteMethod(url: any, mode: any,) {
    this.spinner.show();
    return this.http.delete<any>(url,  {
      headers: this.httpHeaders
    }).pipe(
      delay(100),
      catchError((err) => {
        this.notifyService.showError(err.message, 'Error')
        return of(undefined);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
