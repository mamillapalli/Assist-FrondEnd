import {Component, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {leaverequest} from "../../../AssistModel/leaverequest";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import Swal from "sweetalert2";
import {filterCondition} from "../../../AssistModel/filterCondition";
import {filterFunction} from "../../../AssistModel/filterFunction";
import {CustomColumn} from "../../../AssistModel/CustomColumn";
import {AuthService} from "../../../modules/auth";
import { NotificationService } from 'src/app/AssistService/notification.service';
import {assistService} from "../../../AssistService/assist.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import { MatTableExporterModule } from 'mat-table-exporter';

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.scss']
})
export class LeaverequestComponent implements OnInit {
  dataSource: any = new MatTableDataSource<leaverequest>();
  @Output()  displayedColumns: string[] = ['columnSetting','name','startDate','endDate','numberOfDays','resourceId','approverComments','status','actions'];
  @Output()  fDisplayedColumns: string[] = ['name','startDate','endDate','numberOfDays','resourceId','approverComments','status'];
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
    this.aService.initializeColumnProperties(this.displayedColumns,this.columnShowHideList);
  }

  public getLeave() {
    const sb = this.aService.getMethod('http://localhost:8001/leaves', '',).subscribe((res) => {
      this.dataSource.data = res.content;
      this.totalRows = res.totalElements
    });
    this.subscriptions.push(sb);
  }

  newLeaveRequest() {
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

  openDeleteCustomer(deleteContent: TemplateRef<any>, element:any) {

  }
}
