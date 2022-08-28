import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {

  filterForm: FormGroup;
  @Input() fDisplayedColumns: any;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.fDisplayedColumns)
    this.filterForm = this.fb.group({
      filterOption: this.fb.array([this.newFilterOption()])
    });
  }

  getFilterValue(check: any) {
    if (check === 'Yes') {
      this.activeModal.close(this.filterForm)
    }else if (check === 'reset') {
      this.activeModal.close('reset')
    } else {
      this.activeModal.dismiss()
    }
  }

  newFilterOption(): FormGroup {
    return this.fb.group({
      filterId: '',
      filterValue: '',
    })
  }

  addFilterOption() {
    this.filterOption().push(this.newFilterOption());
  }

  filterOption(): FormArray {
    return this.filterForm.get("filterOption") as FormArray
  }

  removeFilter(i: any) {
    const fil = this.filterForm.get('filterOption') as FormArray
    if (fil.length > 1) {
      this.filterOption().removeAt(i);
    } else {
      this.filterOption().reset()
    }

  }
}
