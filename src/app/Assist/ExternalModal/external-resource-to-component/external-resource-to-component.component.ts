import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {addresource} from "../../../AssistModel/addresource";
import {assistService} from "../../../AssistService/assist.service";

@Component({
  selector: 'app-external-resource-to-component',
  templateUrl: './external-resource-to-component.component.html',
  styleUrls: ['./external-resource-to-component.component.scss']
})
export class ExternalResourceToComponentComponent implements OnInit {

  public displayedColumns: string[] = ['emailAddress','firstName' , 'lastName'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  dataSource: any = new MatTableDataSource<addresource>();

  constructor(public activeModal: NgbActiveModal,public aService: assistService) { }

  ngOnInit(): void {
    console.log('RM Modal')
    this.getRMList();
  }

  getRMList() {
    const sb = this.aService.getMethod('/assistadmin/resources', '',).subscribe((res) => {
      console.log("res is "+res)
      console.log("response is :"+ res)
      this.dataSource.data = res;
    });
  }

  closeModal() {
    console.log('close modal');
    this.activeModal.dismiss();
  }

  passRow(row: any) {
    this.activeModal.close(row);
  }

}
