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