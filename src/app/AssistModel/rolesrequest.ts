interface rolesrequest {
  roles_id : string;
  name: string;
  desc: string;
  createdUser : string;
  createdDate : string;
  transactionStatus : string
}
const inits: rolesrequest = {
  roles_id : '',
  name: '',
  desc: '',
  createdUser : '',
  createdDate : '',
  transactionStatus : ''

};
export { rolesrequest, inits };

export class sendrolesrequest implements rolesrequest {
  name: string;
  desc: string;
  createdDate: string;
  createdUser: string;
  roles_id: string;
  transactionStatus: string;
  constructor(d:any) {
    this.name = d.name;
  }
}



