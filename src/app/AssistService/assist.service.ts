import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, delay, Observable, of, throwError} from "rxjs";
import {catchError, finalize, retry} from "rxjs/operators";
import {AuthService} from "../modules/auth";
import {AuthModel} from "../modules/auth/models/auth.model";
import {NgxSpinnerService} from "ngx-spinner";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})

export class assistService {

  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  protected _errorMessage = new BehaviorSubject<string>('');
  private authToken: AuthModel | any;

  constructor(private http: HttpClient, private authService: AuthService,private spinner: NgxSpinnerService,
              public notifyService: NotificationService) {
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

  toggleColumn(column: any,displayedColumns:any) {
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

}
