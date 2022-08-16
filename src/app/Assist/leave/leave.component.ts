import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {leaverequest} from "../../AssistModel/leaverequest";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {CustomColumn} from "../../AssistModel/CustomColumn";
import {filterCondition} from "../../AssistModel/filterCondition";
import {filterFunction} from "../../AssistModel/filterFunction";
import {AuthService} from "../../modules/auth";
import {NotificationService} from "../../AssistService/notification.service";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {assistService} from "../../AssistService/assist.service";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  dataSource: any = new MatTableDataSource<leaverequest>();
  @Output() displayedColumns:  string[] = ['columnSetting','name', 'startDate', 'endDate', 'status', 'approverComments','actions'];
  @Output() fDisplayedColumns: string[] = ['customerId', 'name', 'startDate', 'endDate', 'status','approverComments'];
  modalOption: NgbModalOptions = {};
  private subscriptions: Subscription[] = [];
  authRoles: any;


  //SORTING
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  sortData: any

  //filter
  public columnShowHideList: CustomColumn[] = []
  color = 'accent';
  public conditionsList = filterCondition;
  public searchValue: any = {};
  public searchLabel: any = {};
  public searchCondition: any = {};
  private _filterMethods = filterFunction;
  searchFilter: any = {};
  columns: { columnDef: string; header: string; }[];

  constructor(public authService: AuthService,public modalService: NgbModal,
              public notifyService: NotificationService,public aService: assistService) {
    const auth = this.authService.getAuthFromLocalStorage();
    this.authRoles = auth?.roles;
  }

  ngOnInit(): void {
    this.columns = [
      { columnDef: 'name', header: 'Name' },
      { columnDef: 'startDate', header: 'StartDate' },
      { columnDef: 'endDate', header: 'End Date' },
      { columnDef: 'approverComments', header: 'Approver Comments' },
      { columnDef: 'status', header: 'Status' },
    ]
    this.aService.initializeColumnProperties(this.displayedColumns,this.columnShowHideList);
  }

  public getLeave() {
    const sb = this.aService.getMethod('http://localhost:8001/leaves', '',).subscribe((res) => {
      this.dataSource.data = res.content;
      this.totalRows = res.totalElements
    });
    this.subscriptions.push(sb);
  }

  createLeaveRequest() {
  }

  openFilter() {
  }

  drop(event: CdkDragDrop<string[]>) {
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getLeave();
  }

  sortChanges(event: Sort) {
    this.sortData = event.active+','+event.direction
    this.getLeave();
  }

  public applyFilter(event: any,label:any) {
  }

  clearColumn(event:any,columnKey: string): void {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilter(null,null);
    this.getLeave();
  }

  openCorporatesDialog(element: any, view: string) {
  }

  openDeleteCustomer(element: any, view: string){
  }
}
