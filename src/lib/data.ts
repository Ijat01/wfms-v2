import { getAuthSession } from "./auth";
import { db } from "./db";


export async function getBookingTaskDataAll() {
  const result = await db.tasks.findMany({
    orderBy: {
        task_status: 'desc' 
      },
    include: {
      bookings: {
        select: {
          event_date: true,
          event_address: true,
          bride_name: true,
          groom_name: true,
        },
      },
    },
  });

  return result.map((task) => ({
    bookingdate: task.created_at,
    taskid: task.task_id,
    taskstatus: task.task_status,
    event_date: task.bookings?.event_date, 
    event_address: task.bookings?.event_address, 
    bride_name: task.bookings?.bride_name, 
    groom_name: task.bookings?.groom_name, 
    task_type: task.task_type,    
  }));
};

export async function getBookingTaskDataPending() {

    const result = await db.tasks.findMany({
     where:{
        task_status: 'Pending'
     },
      include: {
        bookings: {
          select: {
            event_date: true,
            event_address: true,
            bride_name: true,
            groom_name: true,
          },
        },
      },
    });
  
    return result.map((task) => ({
      bookingdate: task.created_at,
      taskid: task.task_id,
      taskstatus: task.task_status,
      event_date: task.bookings?.event_date, 
      event_address: task.bookings?.event_address, 
      bride_name: task.bookings?.bride_name, 
      groom_name: task.bookings?.groom_name, 
      task_type: task.task_type,  
    }));
  };

  export async function staffTask(){

    const result = await db.taskassignments.findMany({
        select: {
          taskassignment_id: true,
          taskassignment_role: true,
          taskassignment_status: true,
          users: {
            select: {
              user_fullname: true,
            },
          },
          tasks: {
            select: {
              bookings: {
                select: {
                  event_date: true,
                  event_address: true,
                  bride_name: true,
                  groom_name: true,
                },
              },
            },
          },
        },
      });

      return result.map((task) => ({
        taskassignmentid : task.taskassignment_id,
        taskassignmentrole: task.taskassignment_role,
        tasksassignmentstatus: task.taskassignment_status,
        staffname: task.users?.user_fullname,
        event_date: task.tasks?.bookings?.event_date, 
        event_address: task.tasks?.bookings?.event_address, 
        bride_name: task.tasks?.bookings?.bride_name, 
        groom_name: task.tasks?.bookings?.groom_name, 
      }));

  }

  export async function Mytask(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.taskassignments.findMany({
      where: {
        user_id: session.user.id
      },
        select: {
          taskassignment_id: true,
          taskassignment_role: true,
          taskassignment_status: true,
          users: {
            select: {
              user_fullname: true,
            },
          },
          tasks: {
            select: {
              bookings: {
                select: {
                  event_date: true,
                  event_address: true,
                  bride_name: true,
                  groom_name: true,
                },
              },
            },
          },
        },
      }
  );

      return result.map((task) => ({
        taskassignmentid : task.taskassignment_id,
        taskassignmentrole: task.taskassignment_role,
        tasksassignmentstatus: task.taskassignment_status,
        staffname: task.users?.user_fullname,
        event_date: task.tasks?.bookings?.event_date, 
        event_address: task.tasks?.bookings?.event_address, 
        bride_name: task.tasks?.bookings?.bride_name, 
        groom_name: task.tasks?.bookings?.groom_name,  
      }));

  }

  export async function getBookingList() {

    try {
        const session = await getAuthSession();

        if (!session) {
            throw new Error('You must be signed in to create a user');
        }

        const result = await db.bookings.findMany({
            include: {
                packages: true,
            }
        });

        return result.map((booking) => ({
            booking_id: booking.booking_id.toLocaleString(),
            groomname: booking.groom_name,
            bridename: booking.bride_name,
            bookingdate: booking.created_at?.toLocaleDateString(),
            eventdate: booking.event_date?.toLocaleDateString(),
            eventaddress: booking.event_address,
            contact: booking.contact_no,
            packagetype: booking.packages?.package_type,
            packagename: booking.packages?.package_name,
            packageid: booking.packages?.package_id
        }));

    } catch (error) {
        console.error('Error fetching booking list:', error);
        throw error;
    }
}

  export async function getAllUser(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.users.findMany({
      select:{
          user_email:true,
          user_id:true,
          user_role:true,
          user_fullname:true,
      } 
  });

  return result.map((users) => ({

    user_email: users.user_email,
    user_id: users.user_id,
    user_role: users.user_role,
    user_fullname: users.user_fullname,

}));

  }
