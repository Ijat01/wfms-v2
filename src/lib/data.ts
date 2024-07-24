import { getAuthSession } from "./auth";
import { db } from "./db";


export async function getBookingTaskDataAll() {
  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }
  
  const result = await db.events.findMany({
   include:{
    bookings: true,
   }
  });

  return result.map((events) => ({
    bookingid: events?.booking_id,
    event_id: events.event_id.toString(),
    event_date: events?.event_date, // Access event_date from the events relation
    event_address: events?.event_address,
    eventtime: events.event_time, // Access event_address from the events relation
    event_type: events?.event_type,
    event_status: events?.event_status
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
          bookingdate: booking.created_at?.toLocaleDateString('en-GB'),
          contact: booking.contact_no,
          packagetype: booking.packages?.package_type,
          packagename: booking.packages?.package_name,
          packageid: booking.packages?.package_id,
          handleby:booking.lock_by,
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
    include:{
      packages:true
    }
  });

  return result.map((booking) => ({
    bookingid: booking.booking_id,
    customername: `${booking.groom_name} & ${booking.bride_name}`.toLocaleUpperCase(),
    contactno: booking.contact_no,
    packagename: booking.packages?.package_name,
  }));
};

export async function getEventDetailsTask(booking_id: string ) {
  const newbookingid = +booking_id;

  const result = await db.events.findMany({
    where: {
      booking_id: newbookingid,
    },
    include: {
      tasks: {
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

  const groupedResult = result.map((events) => ({
      eventid: events.event_id.toString(),
      eventtype: events.event_type,
      eventstatus: events.event_status,
      eventdate: events.event_date?.toLocaleDateString('en-GB'),
      assignments: events.tasks.map((assignment) => ({
      taskid: assignment.task_id,
      username: assignment.users?.user_fullname || null,
      userrole: assignment.users?.user_role || null,
      taskduedate: assignment.task_duedate?.toLocaleDateString('en-GB'),
      task_role: assignment.task_role || null,
      task_status: assignment.task_status || null,
    })),
  }));

  return groupedResult;
  
};

  export async function getAllTaskAssignment(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.tasks.findMany({
      include: {
        users: true,
        events: {
          include: {
            bookings: true,
          },
        },
      },
    });
  
    return result.map((task) => ({
      task_id: task.task_id.toString(),
      user_name: task.users?.user_fullname,
      user_role: task.users?.user_role,
      task_role: task.task_role,
      task_status: task.task_status,
      task_description: task.task_description,
      duedate: task.task_duedate?.toLocaleDateString('en-GB'),
      eventdate: task.events?.event_date,
      duedatecompare: task.task_duedate,
      eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
      eventaddress: task.events?.event_address,
      event_type: task.events?.event_type?.toLocaleUpperCase(),
      groom_name: task.events?.bookings?.groom_name,
      bride_name: task.events?.bookings?.bride_name,
      customername: `${task.events?.bookings?.groom_name} & ${task.events?.bookings?.bride_name}`.toLocaleUpperCase()
    }));

  

  }

  export async function getMytask(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.tasks.findMany({
      where: {
        user_id: session.user.id,
        task_status:"In Progress"
      },
      include: {
        users: true,
        events: {
          include: {
            bookings: true,
          },
        },
      },
    });
  
    return result.map((task) => ({
      task_id: task.task_id.toString(),
      user_name: task.users?.user_fullname,
      user_role: task.users?.user_role,
      task_role: task.task_role,
      task_status: task.task_status,
      task_description: task.task_description,
      duedate: task.task_duedate?.toLocaleDateString('en-GB'),
      duedatecompare: task.task_duedate,
      eventdate: task.events?.event_date?.toLocaleDateString('en-GB'),
      eventaddress: task.events?.event_address,
      event_type: task.events?.event_type?.toLocaleUpperCase(),
      groom_name: task.events?.bookings?.groom_name,
      bride_name: task.events?.bookings?.bride_name,
    }));
  }

  export async function getMyTaskKanban(){

    const session = await getAuthSession()

    if (!session){
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.tasks.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        users: true,
        events: {
          include: {
            bookings: true,
          },
        },
      },
    });
  
    return result.map((task) => ({
      task_id: task.task_id.toString(),
      user_name: task.users?.user_fullname,
      user_role: task.users?.user_role,
      task_role: task.task_role,
      task_status: task.task_status,
      task_description: task.task_description,
      duedate: task.task_duedate?.toLocaleDateString('en-GB'),
      duedatecompare: task.task_duedate,
      eventdate: task.events?.event_date?.toLocaleDateString('en-GB'),
      eventaddress: task.events?.event_address,
      event_type: task.events?.event_type?.toLocaleUpperCase(),
      groom_name: task.events?.bookings?.groom_name,
      bride_name: task.events?.bookings?.bride_name,
    }));
  }

  
  export async function getPaymentList() {
      const session = await getAuthSession();
  
      if (!session) {
        throw new Error('You must be signed in to create a user');
      }
  
      const result = await db.payments.findMany({
        include: {
          bookings: {
            select: {
              booking_id: true,
              groom_name: true,
              bride_name: true,
              created_at: true,
              contact_no: true,
            },
          },
        },
        orderBy: {
          payment_id: 'asc', // Sort by payment_id in ascending order
        },
      });
  
      return result.map((payment) => ({
        paymentid: payment.payment_id.toLocaleString(),
        bookingid: payment.booking_id?.toLocaleString(),
        customername: payment.bookings ? `${payment.bookings.groom_name} & ${payment.bookings.bride_name}`.toLocaleUpperCase() : 'Unknown',
        bookingdate: payment.bookings ? payment.bookings.created_at?.toLocaleDateString('en-GB') : 'Unknown',
        contact: payment.bookings ? payment.bookings.contact_no : 'Unknown',
        paymentbalance: payment.payment_balance?.toString(),
        paymenttotal: payment.payment_total?.toString(),
        paymentcreatedat: payment.created_at?.toLocaleDateString('en-GB'),
      }));
  }
  

  export async function getPaymentDataAll() {
   
      const result = await db.paymentdetails.findMany();
  
      return result.map((paymentDetail) => ({
        paymentdetails_id: paymentDetail.paymentdetails_id.toString(),
        paymentdetails_desc: paymentDetail.paymentdetails_desc,
        paymentdetails_type: paymentDetail.paymentdetails_type,
        paymentdetails_status: paymentDetail.paymentdetails_status,
        paymentdetails_amount: paymentDetail.paymentdetails_amount,
        payment_id: paymentDetail.payment_id,
        created_at: paymentDetail.created_at?.toLocaleDateString('en-GB'),
        updated_at: paymentDetail.updated_at?.toLocaleDateString('en-GB'),
      }));
  
  }

  export async function countBooking() {
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
  
    const result = await db.bookings.count({
      where: {
        // Assuming you have a field like `payment_date` that indicates when the task was paid
        created_at: {
          gte: new Date(`${currentYear}-${currentMonth}-01`),
          lte: new Date(`${currentYear}-${currentMonth + 1}-01`), // Next month's 1st day to include all days of current month
        },
      },
    });
  
    return result;
  }

  export async function countNewTaskUser() {
    const session = await getAuthSession();
  
      if (!session) {
        throw new Error('You must be signed in to create a user');
      }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
  
    const result = await db.tasks.count({
      where: {
        user_id: session.user.id,
        created_at: {
          gte: new Date(`${currentYear}-${currentMonth}-01`),
          lte: new Date(`${currentYear}-${currentMonth + 1}-01`), // Next month's 1st day to include all days of current month
        },
      },
    });
  
    return result;
  }

  export async function countPendingUser() {
    const session = await getAuthSession();
  
    if (!session) {
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.tasks.count({
      where: {
        user_id:session.user.id,
        task_status: "In Progress"
      },
    });
  
    return result;
  }

  export async function countCompleteUser() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
    
    const session = await getAuthSession();
  
    if (!session) {
      throw new Error('You must be signed in to create a user');
    }

    const result = await db.tasks.count({
      where: {
        user_id:session.user.id,
        task_status: "Complete",
        // Assuming you have a field like `completed_at` that indicates when the task was completed
        updated_at: {
          gte: new Date(`${currentYear}-${currentMonth}-01`),
          lte: new Date(`${currentYear}-${currentMonth + 1}-01`), // Next month's 1st day to include all days of current month
        },
      },
    });
  
    return result;
  }
  

  export async function countPending() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
  
    const result = await db.tasks.count({
      where: {
        task_status: "In Progress"
        // Assuming you have a field like `payment_date` that indicates when the task was paid
      },
    });
  
    return result;
  } // Assuming this is how you import your database instance

export async function countComplete() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed

  const result = await db.tasks.count({
    where: {
      task_status: "Complete",
      // Assuming you have a field like `completed_at` that indicates when the task was completed
      updated_at: {
        gte: new Date(`${currentYear}-${currentMonth}-01`),
        lte: new Date(`${currentYear}-${currentMonth + 1}-01`), // Next month's 1st day to include all days of current month
      },
    },
  });

  return result;
}

export async function getTaskList() {
  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }
  

  const result = await db.tasks.findMany({
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

  return result.map((task) => ({

    event_id:task.event_id?.toString(),
    task_id: task.task_id.toLocaleString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_due: task.task_duedate?.toLocaleDateString('en-GB'),
    due_date: task.task_duedate,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description:task.task_description,

  }))
  
};

export async function getEventList() {
  const result = await db.events.findMany({
   include:{
    bookings: true,
   },
   orderBy: {
    event_id: 'asc', // Sort by payment_id in ascending order
  },

   
  });

  return result.map((events) => ({
    bookingid: events?.booking_id?.toLocaleString(),
    customername:`${ events.bookings?.groom_name} & ${ events.bookings?.bride_name}`.toLocaleUpperCase(),
    event_id:events.event_id.toString(), 
    event_time:events.event_time,
    event_date: events?.event_date?.toLocaleDateString('en-GB'), // Access event_date from the events relation
    event_address: events?.event_address, // Access event_address from the events relation
    event_type: events?.event_type,
    event_status: events?.event_status
  }));
}

export async function getAllTaskUsersInprogress(){

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const result = await db.tasks.findMany({
    where:{
      user_id:session.user.id,
      task_status:"In Progress"
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
  
}

export async function getAllTaskUsersComplete(){

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const result = await db.tasks.findMany({
    where:{
      user_id:session.user.id,
      task_status:"Complete"
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
  
}

export async function getAllTaskUsersDueThisWeek() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be signed in to create a user');
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const startOfNextMonth = new Date(currentYear, currentMonth, 1);

  const result = await db.tasks.findMany({
    where: {
      user_id: session.user.id,
      task_duedate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
}

export async function getEventSchedule() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be signed in to create a user');
  }

  try {
    const events = await db.events.findMany({
      include: {
        bookings: true,
      },
    });

    if (!events) {
      return [];
    }

    return events
      .map(event => {
        if (!event.event_date) {
          return null;
        }

        const eventDate = new Date(event.event_date);
        
        // Format the date using 'en-GB' // Set time to end of the day

        return {
          start: event.event_date,
          end: event.event_date,
          title: `${event.event_type?.toUpperCase() ?? 'UNKNOWN EVENT TYPE'} of ${event.bookings?.groom_name ?? 'Unknown Groom'} & ${event.bookings?.bride_name ?? 'Unknown Bride'}`.toLocaleUpperCase(),
          allDay: true,
        };
      })
      .filter(event => event !== null);

  } catch (error) {
    console.error('Error fetching event schedule:', error);
    throw new Error('Failed to fetch event schedule');
  }
}

export async function getEventScheduleUser() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be signed in to create a user');
  }

  try {
    const events = await db.tasks.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        users: true,
        events: {
          include: {
            bookings: true,
          },
        },
      },
    });

    if (!events) {
      return [];
    }

    return events
      .map(event => {
        if (!event.events?.event_date) {
          return null;
        }

        const eventDate = new Date(event.events.event_date);
        
        // Format the date using 'en-GB' // Set time to end of the day

        return {
          start: event.events?.event_date,
          end: event.events?.event_date,
          title: `${event.task_role} for ${event.events.event_type?.toUpperCase() ?? 'UNKNOWN EVENT TYPE'} of ${event.events.bookings?.groom_name ?? 'Unknown Groom'} & ${event.events.bookings?.bride_name ?? 'Unknown Bride'}`.toLocaleUpperCase(),
          allDay: true,
        };
      })
      .filter(event => event !== null);

  } catch (error) {
    console.error('Error fetching event schedule:', error);
    throw new Error('Failed to fetch event schedule');
  }
}

export async function getAllPackage(){

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const packages = await db.packages.findMany();

return packages.map((packages) => ({

  package_id: packages.package_id,
  package_name: packages.package_name,
  package_type: packages.package_type,
  package_desc: packages.package_description,

}));

}

export async function getAllTaskInprogress(){

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const result = await db.tasks.findMany({
    where:{
      task_status:"In Progress"
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
  
}

export async function getAllTaskComplete(){

  const session = await getAuthSession()

  if (!session){
    throw new Error('You must be signed in to create a user');
  }

  const result = await db.tasks.findMany({
    where:{
      task_status:"Complete"
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
  
}

export async function getAllTaskDueThisWeek() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error('You must be signed in to create a user');
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-indexed
  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const startOfNextMonth = new Date(currentYear, currentMonth, 1);

  const result = await db.tasks.findMany({
    where: {
      task_duedate: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    include: {
      users: true,
      events: {
        include: {
          bookings: true,
        },
      },
    },
  });

  return result.map((task) => ({
    task_id: task.task_id.toString(),
    user_name: task.users?.user_fullname,
    user_role: task.users?.user_role,
    task_role: task.task_role,
    task_status: task.task_status,
    task_description: task.task_description,
    duedate: task.task_duedate?.toLocaleDateString('en-GB'),
    duedatecompare: task.task_duedate,
    eventdate: task.events?.event_date,
    eventdate_string: task.events?.event_date?.toLocaleDateString('en-GB'),
    eventaddress: task.events?.event_address,
    event_type: task.events?.event_type?.toLocaleUpperCase(),
    groom_name: task.events?.bookings?.groom_name,
    bride_name: task.events?.bookings?.bride_name,
  }));
}


