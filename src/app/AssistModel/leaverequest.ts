interface leaverequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  numberOfDays: number
  payPercentage: number;
  resourceId : string;
  approverId : string;
  contactAddress : string;
  ticketsPaid : boolean
  ticketsTo : string
  approverComments: string
}
const inits: leaverequest = {
  name: '',
  description: '',
  startDate: new Date,
  endDate: new Date,
  numberOfDays: 0,
  payPercentage: 0,
  resourceId : '',
  approverId : '',
  contactAddress : '',
  ticketsPaid : true,
  ticketsTo : '',
  approverComments: ''
};
export { leaverequest, inits };

export class sendLeaverequest implements leaverequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  numberOfDays: number
  payPercentage: number;
  resourceId : string;
  approverId : string;
  contactAddress : string;
  ticketsPaid : boolean
  ticketsTo : string
  approverComments: string
  constructor(d:any) {
    this.name = d.name;
    this.description = d.description;
    this.startDate = d.startDate;
    this.endDate = d.endDate;
    this.numberOfDays = d.numberOfDays;
    this.payPercentage = d.payPercentage;
    this.resourceId = d.resourceId;
    this.approverId = d.approverId;
    this.contactAddress = d.contactAddress;
    this.ticketsPaid = d.ticketsPaid;
    this.ticketsTo = d.ticketsTo;
    this.approverComments = d.approverComments;
  }

}



