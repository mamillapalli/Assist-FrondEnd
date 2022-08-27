import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {assistService} from "../../../../../AssistService/assist.service";
import {addresource} from "../../../../../AssistModel/addresource";


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

  constructor(private fb: FormBuilder,public aService: assistService) {}

  ngOnInit() {
    this.initForm();
    if(this.mode !== 'new')
    {
      this.updateForm();
      if(this.mode === 'auth' || this.mode === 'delete' || this.mode === 'view')
      {
        this.addResourceForm.disable()
        this.ReadOnlyCheckBox = true;
      }
    }
    this.updateParentModel({}, this.checkForm());
  }

  get f() {
    return this.addResourceForm.controls;
  }

  updateForm()
  {
    this.addResourceForm.patchValue(this.formValue)
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
      status: [this.defaultValues.status, [Validators.required]]

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

}

