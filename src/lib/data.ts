import { getAuthSession } from "./auth";
import { db } from "./db";


export async function getBookingTaskDataAll() {
  const result = await db.tasks.findMany({
    
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
    orderBy: {
      task_id: 'asc' 
    },
  });

  return result.map((task) => ({
    bookingid: task.booking_id,
    bookingdate: task.created_at?.toLocaleDateString(),
    customername: `${task.bookings?.groom_name} & ${task.bookings?.bride_name}`.toLocaleUpperCase(),
    taskid: task.task_id,
    taskstatus: task.task_status,
    event_date: task.bookings?.event_date.toLocaleDateString(), 
    event_address: task.bookings?.event_address, 
    bride_name: task.bookings?.bride_name, 
    groom_name: task.bookings?.groom_name, 
    task_type: task.task_type,    
  }));
};

export async function getEventDetailsBooking(booking_id: string ) {

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const newbookingid = +booking_id;

  const result = await db.bookings.findMany({
    where: {
      booking_id: newbookingid,
    },
  });

  return result.map((booking) => ({
    bookingid: booking.booking_id,
    customername: `${booking.groom_name} & ${booking.bride_name}`.toLocaleUpperCase(),
    event_date: booking.event_date.toLocaleDateString(), 
    event_address: booking.event_address, 
  }));
};

export async function getEventDetailsTask(booking_id: string ) {
  const newbookingid = +booking_id;

  const result = await db.tasks.findMany({
    where: {
      booking_id: newbookingid,
    },
    include: {
      taskassignments: {
        include: {
          users: {
            select: {
              user_fullname: true,
              user_role: true,
            },
          },
        },
      },
    },
  });

  const groupedResult = result.map((task) => ({
      taskid: task.task_id,
      tasktype: task.task_type,
      taskstatus: task.task_status,
      assignments: task.taskassignments.map((assignment) => ({
      taskassignmentid: assignment.taskassignment_id,
      username: assignment.users?.user_fullname || null,
      userrole: assignment.users?.user_role || null,
      taskassignment_role: assignment.taskassignment_role || null,
      taskassignment_status: assignment.taskassignment_status || null,
    })),
  }));

  return groupedResult;
  
};

export async function getEventDetailsTaskAssignment(taskid: number ) {
  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }
  

  const result = await db.taskassignments.findMany({
    where:{
      task_id: taskid
    },
    include:{
      users:{
        select:{
          user_fullname: true,
          user_role:true
        }
      }
    },
  }
  )

  return result.map((taskassignment) => ({

    taskassignment_id: taskassignment.taskassignment_id.toLocaleString(),
    user_name: taskassignment.users?.user_fullname,
    user_role: taskassignment.users?.user_role,
    taskassignment_role: taskassignment.taskassignment_role,
    taskassignment_status: taskassignment.taskassignment_status,
    taskassignment_description:taskassignment.taskassignment_description,

  }))
  
};

export async function getBookingTaskDataPending() {
  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }
  

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
            },
            orderBy: {
              booking_id: 'asc', // Sort by booking_id in ascending order
            },
        });

        return result.map((booking) => ({
            booking_id: booking.booking_id.toLocaleString(),
            customername: `${booking.groom_name} & ${booking.bride_name}`.toLocaleUpperCase(),
            groomname: booking.groom_name.toUpperCase(),
            bridename: booking.bride_name.toLocaleUpperCase(),
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

  export async function getAllTaskAssignment(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.taskassignments.findMany({
      include:{
        users:{
          select:{
            user_fullname: true,
            user_role:true
          }
        }
      },
    }
    )

    return result.map((taskassignment) => ({

      taskassignment_id: taskassignment.taskassignment_id.toLocaleString(),
      user_name: taskassignment.users?.user_fullname,
      user_role: taskassignment.users?.user_role,
      taskassignment_role: taskassignment.taskassignment_role,
      taskassignment_status: taskassignment.taskassignment_status,
      taskassignment_description:taskassignment.taskassignment_description,
  
  }));

  }
