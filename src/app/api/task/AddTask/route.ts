import { db } from '@/lib/db';
import { TaskSchemaType, TaskSchema } from '@/lib/validators/task';
import { getAuthSession } from '@/lib/auth';
import { Resend } from 'resend';
import SingleTaskEmail from '../../../../../emails/SingleTaskEmail';
import MultipleTaskEmail from '../../../../../emails/MultipleTaskEmail';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { task_role, user_id, event_id, event_date, bookingid, confirmation } = TaskSchema.parse(body) as TaskSchemaType;
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      throw new Error('You must be signed in to create a task');
    }

    console.log('Session ID:', session.user.id);

    const newbookingid = +bookingid;
    const newEventId = +event_id;

    const staffdetails = await db.users.findUnique({
      where:{
        user_id: user_id
      }
    })

    if (!staffdetails || !staffdetails.user_email) {
      throw new Error('Staff email not found');
    }

    const staffemail: string = staffdetails.user_email;
     
    const booking = await db.bookings.findUnique({
      where:{
        booking_id: newbookingid,
      }
    })

    const event = await db.events.findUnique({
      where: {
        event_id: newEventId,
      },
    })

    if (!event || !event.event_date) {
      throw new Error('Event not found or event date is missing');
    }

    const otherEvent = await db.events.findFirst({
      where: {
        booking_id: newbookingid,
        event_date: event.event_date,
        event_id: {
          not: newEventId, 
        },
      },
    });

    const eventDate = new Date(event.event_date);
    let taskDueDate = new Date(eventDate);
   
    if (["Main Photographer", "Main Videographer", "Extra Videographer", "Extra Photographer"].includes(task_role)) {
      const conflictingTasks = await db.tasks.findMany({
          where: {
              user_id: user_id,
              event_id: {
                  not: newEventId,
              },
              events: {
                  event_date: event.event_date,
                  booking_id: {
                      not: event.booking_id,
                  },
              },
          },
      });

      if (conflictingTasks.length > 0) {
          throw new Error('Staff is already assigned to an event on the same date');
      }
  }

    if (task_role === "Video Editor" || task_role === "Photo Editor") {
      taskDueDate.setMonth(eventDate.getMonth() + 1);
    }

    if (["Main Photographer", "Main Videographer", "Video Editor", "Photo Editor"].includes(task_role)) {
        const existingTasks = await db.tasks.findMany({
          where: {
            event_id: newEventId,
            OR: [
              { task_role: "Main Photographer" },
              { task_role: "Main Videographer" },
              { task_role: "Main Video Editor" },
              { task_role: "Main Photo Editor" },
            ],
          },
        });
  
        // Check if the role to be assigned already exists for this event
        const roleAlreadyAssigned = existingTasks.some(task => task.task_role === task_role);
  
        if (roleAlreadyAssigned) {
          throw new Error(`Role already exist in this event, consider updating the existing one or delete`);
        }
      }

  if (["Main Photographer", "Main Videographer", "Extra Videographer", "Extra Photographer"].includes(task_role)) {
      
      
      const conflictingUser = await db.tasks.findMany({
          where: {
              user_id: user_id,
              event_id: newEventId,
              task_role: task_role,
              events: {
                  booking_id: otherEvent?.event_id ,
              },
          },
      });

      if (conflictingUser.length < 0) {
        
          throw new Error('Staff is already assigned to an event on the same date');
          }
      }

      if (otherEvent) {

        const sameuser = await db.tasks.findMany({
          where:{
            event_id: otherEvent.event_id,
            user_id: user_id
          }
        })

        if (sameuser.length === 1){

          const newfirstTask = await db.tasks.create({
            data: {
              user_id: user_id,
              event_id: newEventId,
              task_role: task_role,
              task_description: "assigned",
              task_status: "In Progress",
              task_duedate: taskDueDate.toISOString(), // Ensure ISO-8601 format
            },
          });

          const updateEvent = await db.events.update({
            where:{
                event_id:newEventId,
            },
            data:{
                event_status:"Task Assigned"
            }

            
        })

        const { data, error } = await resend.emails.send({
          from: "no-reply <no-reply@pwms.xyz>",
          to: staffemail,
          subject: "Task Assigned",
          react: SingleTaskEmail({  
            name: staffdetails?.user_fullname,
            taskrole: task_role,
            groomname:booking?.groom_name,
            bridename:booking?.bride_name,
            eventtype:event.event_type,
            eventdate: event.event_date.toLocaleDateString('en-GB'),
            eventtime:event.event_time, }),
        });

        }else{

        const newsecondTask = await db.tasks.create({
          data: {
            user_id: user_id,
            event_id: otherEvent.event_id,
            task_role: task_role,
            task_description: "assigned",
            task_status: "In Progress",
            task_duedate: taskDueDate.toISOString(), // Ensure ISO-8601 format
          },
        });

        const newfirstTask = await db.tasks.create({
          data: {
            user_id: user_id,
            event_id: newEventId,
            task_role: task_role,
            task_description: "assigned",
            task_status: "In Progress",
            task_duedate: taskDueDate.toISOString(), // Ensure ISO-8601 format
          },
        });

        const updateEvent = await db.events.update({
          where:{
              event_id:newEventId,
          },
          data:{
              event_status:"Task Assigned"
          }
      })
        const updateOtherEvent = await db.events.update({
          where:{
              event_id:otherEvent.event_id,
          },
          data:{
              event_status:"Task Assigned"
          }
      })

      const { data, error } = await resend.emails.send({
        from: "no-reply <no-reply@pwms.xyz>",
        to: staffemail,
        subject: "Task Assigned",
        react: MultipleTaskEmail({  
          name: staffdetails?.user_fullname,
          taskrole: task_role,
          groomname:booking?.groom_name,
          bridename:booking?.bride_name,
          eventtype:event.event_type,
          eventdate: event.event_date.toLocaleDateString('en-GB'),
          eventtime:event.event_time,
          seceventtype:otherEvent.event_type,
          seceventdate:otherEvent.event_date?.toLocaleDateString('en-GB'),
          seceventtime:otherEvent.event_time, }),
      });

      }
      }else{

        const newfirstTask = await db.tasks.create({
          data: {
            user_id: user_id,
            event_id: newEventId,
            task_role: task_role,
            task_description: "assigned",
            task_status: "In Progress",
            task_duedate: taskDueDate.toISOString(), // Ensure ISO-8601 format
          },
        });

        const updateEvent = await db.events.update({
          where:{
              event_id:newEventId,
          },
          data:{
              event_status:"Task Assigned"
          }
      })

      const { data, error } = await resend.emails.send({
        from: "no-reply <no-reply@pwms.xyz>",
        to: staffemail,
        subject: "Task Assigned",
        react: SingleTaskEmail({  
          name: staffdetails?.user_fullname,
          taskrole: task_role,
          groomname:booking?.groom_name,
          bridename:booking?.bride_name,
          eventtype:event.event_type,
          eventdate: event.event_date.toLocaleDateString('en-GB'),
          eventtime:event.event_time, }),
      });

      }
     
  
     
  
   
  
      // Return a 201 Created response with the newly created task
      return new Response('OK', { status: 201 });
    }  catch (error: unknown) {
    console.error('Error creating task:', error);

    let errorMessage = 'Unable to create task.';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Role already exist in this event, consider updating the existing one or delete')) {
        errorMessage = error.message;
        statusCode = 405;
      }if (error.message.includes('Staff is already assigned to an event on the same date')) {
        errorMessage = error.message;
        statusCode = 401;
      } else if (error.message.includes('You must be signed in')) {
        errorMessage = error.message;
        statusCode = 402;
      } else if (error.message.includes('Event not found')) {
        errorMessage = error.message;
        statusCode = 404;
      }
    }

    // Return a response with the specific error message and status code
    return new Response(errorMessage, { status: statusCode });
  }
}