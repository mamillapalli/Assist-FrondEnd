import {rolesrequest, sendrolesrequest} from "./rolesrequest";

interface addresource {
  firstName: string;
  lastName: string;
  birthDate: Date;
  joiningDate: Date;
  status: boolean;
  emailAddress : string;
  reportingTo : string;
  roles : [sendrolesrequest];
  report : [addresource];
}

const inits: addresource = {
  firstName: '',
  lastName: '',
  birthDate: new Date,
  joiningDate: new Date,
  status : true,
  emailAddress : '',
  reportingTo : '',
  roles : [{} as rolesrequest],
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
  status: boolean;
  roles: [sendrolesrequest];
  report : [addresource];
  constructor(d:any) {
    this.firstName = d.firstName;
    this.lastName = d.lastName;
    this.birthDate = d.birthDate;
    this.joiningDate = d.joiningDate;
    this.emailAddress = d.emailAddress;
    this.reportingTo = d.reportingTo;
    this.status = d.status;
    this.roles = d.roles;
  }

}
