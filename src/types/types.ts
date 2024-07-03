export interface Task {
  taskassignment_id: string; 
  user_name: string | undefined; 
  user_role: string | undefined; 
  taskassignment_role: string | null; 
  taskassignment_status: string | null; 
  taskassignment_description: string | null; 
}
  
  export interface BoardTypes {
    taskassignment_id: string;
    user_name: string | undefined;
    user_role: string | undefined; 
    taskassignment_role: string | null; 
    taskassignment_status: string | null; 
    taskassignment_description: string | null; 
  }

export interface Booking {
  booking_id: string;
  customername: string;
  groomname: string;
  bridename: string;
  bookingdate: string;
  eventdate: string;
  eventaddress: string;
  contact: string;
  packagetype: string | undefined;
  packagename: string | undefined;
  packageid: string | undefined;
}

export interface TaskList {
    bookingdate: string | undefined;
    customername: string;
    taskid: number;
    taskstatus: string | null;
    event_date: string | undefined;
    event_address: string | undefined;
    bride_name: string | undefined;
    groom_name: string | undefined;
    task_type: string | null
}