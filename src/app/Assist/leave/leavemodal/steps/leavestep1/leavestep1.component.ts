import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {leaverequest} from "../../../../../AssistModel/leaverequest";
import {assistService} from "../../../../../AssistService/assist.service";
import {AuthService, UserModel} from "../../../../../modules/auth";

@Component({
  selector: 'app-leavestep1',
  templateUrl: './leavestep1.component.html',
  styleUrls: ['./leavestep1.component.scss']
})
export class Leavestep1Component implements OnInit {

  @Input('updateParentModel') updateParentModel: (part: Partial<leaverequest>, isFormValid: boolean ) => void;
  @Input() defaultValues: Partial<leaverequest>;
  private unsubscribe: Subscription[] = [];
  leaveRequestForm: FormGroup;
  @Input() mode: any;
  @Input('formValue') formValue :  any;
  ReadOnlyCheckBox: boolean;
  userModal: any;

  constructor(private fb: FormBuilder,public aService: assistService,public authService: AuthService) {
    console.log(localStorage.getItem("userModal"))
  }

  ngOnInit() {
    this.initForm();
    if(this.mode !== 'new')
    {
      this.updateForm();
      if(this.mode === 'auth' || this.mode === 'delete' || this.mode === 'view')
      {
        this.leaveRequestForm.disable()
        this.ReadOnlyCheckBox = true;
      }
    } else {
        //this.f.emailAddress.setValue(this.userModal.emailAddress);
        //this.leaveRequestForm.patchValue(this.userModal)
      this.f.name.setValue(this.userModal.firstName+" "+ this.userModal.lastName)

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
      this.leaveRequestForm.get('ticketsTo')?.hasError('required')

    );
  }

  calNumberOfDays() {
    console.log("start Date is :" + this.f.startDate.value);
    console.log("end Date is :" + this.f.endDate.value);
    const dateone = new Date(this.f.startDate.value);
    const datetwo = new Date(this.f.endDate.value);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = datetwo.getTime() - dateone.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    this.f.numberOfDays.setValue(diffInDays);
  }
}
