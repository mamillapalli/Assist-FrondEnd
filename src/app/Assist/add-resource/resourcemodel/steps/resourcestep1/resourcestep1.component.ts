import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {assistService} from "../../../../../AssistService/assist.service";
import {addresource} from "../../../../../AssistModel/addresource";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ExternalResourceToComponentComponent} from "../../../../ExternalModal/external-resource-to-component/external-resource-to-component.component";


@Component({
  selector: 'app-resourcestep1',
  templateUrl: './resourcestep1.component.html',
  styleUrls: ['./resourcestep1.component.scss']
})


export  class Resourcestep1Component implements OnInit {

  @Input('updateParentModel') updateParentModel: ( part: Partial<addresource>, isFormValid: boolean ) => void;
  @Input() defaultValues: Partial<addresource>;
  private unsubscribe: Subscription[] = [];
  addResourceForm: FormGroup;
  @Input() mode: any;
  @Input('formValue') formValue :  any;
  ReadOnlyCheckBox: boolean;
  dropdownList:any = [];
  dropdownSettings = {
    singleSelection: false,
    text: "Select Roles",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",
    autoPosition: true,
    badgeShowLimit: 3,
    lazyLoading: true,
    showCheckbox: true,
    maxHeight: 120
  };
  selectedItems: any = [];
  modalOption: NgbModalOptions = {};

  constructor(private fb: FormBuilder,public aService: assistService,public modalService: NgbModal) {}

  ngOnInit() {
    this.initForm();

    if(this.mode !== 'new')
    {
      this.getRolesData();
      this.updateForm();
      if(this.mode === 'auth' || this.mode === 'delete' || this.mode === 'view') {
        this.addResourceForm.disable()
        this.ReadOnlyCheckBox = true;
      }
    } else {
      this.getRolesData();
    }
    this.updateParentModel({}, this.checkForm());
  }

  get f() {
    return this.addResourceForm.controls;
  }

  updateForm()
  {
    this.addResourceForm.patchValue(this.formValue)
    let va = this.formValue.roles
    console.log('va'+va[0].name)
    console.log('va'+va.length)
    for (let i = 0; i < va.length; i++) {
      var tempObj = {"id": 0, "itemName": "", "name": ""};
      tempObj.id = i;
      tempObj.itemName = va[i].name;
      tempObj.name = va[i].name;
      console.log(tempObj)
      this.selectedItems.push(tempObj);
      this.dropdownList.push(tempObj);
    }
  }

  initForm() {
    this.addResourceForm = this.fb.group({
      firstName: [this.defaultValues.firstName, [Validators.required]],
      lastName: [this.defaultValues.lastName, [Validators.required]],
      birthDate: [this.defaultValues.birthDate, [Validators.required]],
      joiningDate: [this.defaultValues.joiningDate, [Validators.required]],
      emailAddress: [this.defaultValues.emailAddress, [Validators.required]],
      roles: [this.defaultValues.roles, [Validators.required]],
      reportingTo: [this.defaultValues.reportingTo, [Validators.required]],
      status: [this.defaultValues.status, [Validators.required]],
      report: [this.defaultValues.report,[Validators.required]],

    });

    const formChangesSubscr = this.addResourceForm.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  isControlValid(controlName: string): boolean {
    const control = this.addResourceForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.addResourceForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.addResourceForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    return false;
  }

  checkForm() {
    return !(
      this.addResourceForm.get('resourceId')?.hasError('required') ||
      this.addResourceForm.get('approverId')?.hasError('required') ||
      this.addResourceForm.get('startDate')?.hasError('required') ||
      this.addResourceForm.get('endDate')?.hasError('required') ||
      this.addResourceForm.get('numberOfDays')?.hasError('required') ||
      this.addResourceForm.get('ticketsTo')?.hasError('required')

    );
  }

  getRolesData(): void {
    let tmp: any = [];
    const sb = this.aService.getMethod('/assistadmin/roles', '',).subscribe((res) => {
      console.log('response is '+res)
      for(let i=0; i < res.length; i++) {
        tmp.push({ id: i ,  itemName: res[i].name, name: res[i].name });
      }
      this.dropdownList = tmp;
    });
  }

  onItemSelect(item:any) {
    console.log(item);
  }

  OnItemDeSelect(item:any) {
    console.log(item);
  }

  onSelectAll(items:any) {
    console.log(items);
  }

  onDeSelectAll(items:any) {
    console.log(items);
  }

  openResourceDialog() {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size='lg';
    const modalRef = this.modalService.open(ExternalResourceToComponentComponent, this.modalOption);
    modalRef.result.then((result) => {
      if (result) {
        console.log("row result is " + result)
        this.f.reportingTo.setValue(result.emailAddress);
        this.f.report.setValue(result);
      }
    }, (reason) => {
      console.log('reason is' + reason);
    });
  }

}

