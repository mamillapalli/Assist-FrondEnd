interface leaverequest {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  numberOfDays: number
  payPercentage: string;
  resourceId : string;
  approverId : string;
  contactAddress : string;
  ticketsPaid : number
  ticketsTo : string
  approverComments: string
}

const inits: leaverequest = {
  name: '',
  description: '',
  startDate: new Date,
  endDate: new Date,
  numberOfDays: 0,
  payPercentage: '',
  resourceId : '',
  approverId : '',
  contactAddress : '',
  ticketsPaid : 0,
  ticketsTo : '',
  approverComments: ''
};

export { leaverequest, inits };
