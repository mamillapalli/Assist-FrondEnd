
interface addresource {
  firstName: string;
  lastName: string;
  birthDate: Date;
  joiningDate: Date;
  status: string;
  emailAddress : string;
  reportingTo : string;
  roles : string;
  report : [addresource];
}

const inits: addresource = {
  firstName: '',
  lastName: '',
  birthDate: new Date,
  joiningDate: new Date,
  status : '',
  emailAddress : '',
  reportingTo : '',
  roles : '',
  report: [{} as addresource]
};
export { addresource, inits };

export class addResourcerequest implements addresource {
  firstName: string;
  lastName: string;
  birthDate: Date;
  joiningDate: Date;
  emailAddress: string;
  reportingTo: string;
  status: string;
  roles: string;
  report : [addresource];
  constructor(d:any) {
    this.firstName = d.firstName;
    this.lastName = d.lastName;
    this.birthDate = d.birthDate;
    this.joiningDate = d.joiningDate;
    this.emailAddress = d.emailAddress;
    this.reportingTo = d.reportingTo;
    this.status = d.status;
    roles: d.roles;
  }

}
