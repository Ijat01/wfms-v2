export interface Task {
  task_id: string;
  user_name: string | undefined;
  user_role: string | undefined;
  task_role: string | null;
  task_status: string | null;
  task_description: string | null;
}
  
  export interface BoardTypes {
    task_id: string;
    user_name: string | undefined;
    user_role: string | undefined; 
    task_role: string | null; 
    task_status: string | null; 
    task_description: string | null; 
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

export interface MyTask {
  task_id: string;
  user_name: string | undefined;
  user_role: string | undefined;
  task_role: string | null;
  task_status: string | null;
  task_description: string | null;
  duedate: string | undefined;
  eventdate: string | undefined;
  eventaddress: string | null | undefined;
  event_type: string | null | undefined;
  groom_name: string | undefined;
  bride_name: string | undefined;
}