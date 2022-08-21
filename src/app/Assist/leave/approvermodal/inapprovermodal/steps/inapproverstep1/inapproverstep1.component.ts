import {Component, Input, OnInit} from '@angular/core';
import {leaverequest} from "../../../../../../AssistModel/leaverequest";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {assistService} from "../../../../../../AssistService/assist.service";

@Component({
  selector: 'app-inapproverstep1',
  templateUrl: './inapproverstep1.component.html',
  styleUrls: ['./inapproverstep1.component.scss']
})
export class Inapproverstep1Component implements OnInit {

  @Input('updateParentModel') updateParentModel: ( part: Partial<leaverequest>, isFormValid: boolean ) => void;
  @Input() defaultValues: Partial<leaverequest>;
  private unsubscribe: Subscription[] = [];
  leaveRequestForm: FormGroup;
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
        this.leaveRequestForm.disable()
        this.leaveRequestForm.value.approverComments.enable;
        this.ReadOnlyCheckBox = true;
      }
    }
    this.updateParentModel({}, this.checkForm());
  }

  get f() {
    return this.leaveRequestForm.controls;
  }

  updateForm()
  {
    this.leaveRequestForm.patchValue(this.formValue)
  }

  initForm() {
    this.leaveRequestForm = this.fb.group({
      name: [this.defaultValues.name, [Validators.required]],
      description: [this.defaultValues.description, [Validators.required]],
      startDate: [this.defaultValues.startDate, [Validators.required]],
      endDate: [this.defaultValues.endDate, [Validators.required]],
      numberOfDays: [this.defaultValues.numberOfDays, [Validators.required]],
      payPercentage: [this.defaultValues.payPercentage, [Validators.required]],
      resourceId: [this.defaultValues.resourceId, [Validators.required]],
      approverId: [this.defaultValues.approverId, [Validators.required]],
      contactAddress: [this.defaultValues.contactAddress, [Validators.required]],
      ticketsPaid: [this.defaultValues.ticketsPaid, [Validators.required]],
      ticketsTo: [this.defaultValues.ticketsTo, [Validators.required]],
      approverComments: [this.defaultValues.ticketsTo, [Validators.required]]
    });

    const formChangesSubscr = this.leaveRequestForm.valueChanges.subscribe((val) => {
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  isControlValid(controlName: string): boolean {
    const control = this.leaveRequestForm.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.leaveRequestForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.leaveRequestForm.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    return false;
  }

  checkForm() {
    return !(
      this.leaveRequestForm.get('resourceId')?.hasError('required') ||
      this.leaveRequestForm.get('approverId')?.hasError('required') ||
      this.leaveRequestForm.get('startDate')?.hasError('required') ||
      this.leaveRequestForm.get('endDate')?.hasError('required') ||
      this.leaveRequestForm.get('numberOfDays')?.hasError('required') ||
      this.leaveRequestForm.get('ticketsTo')?.hasError('required') ||
      this.leaveRequestForm.get('approverComments')?.hasError('required')

    );
  }

}
