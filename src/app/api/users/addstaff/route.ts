import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AddStaffSchema, AddStaffSchemaType } from '@/lib/validators/users';
import { hash } from 'bcrypt';
import { getAuthSession } from '@/lib/auth';
import { Resend } from 'resend';
import LoginPasswordEmail from '../../../../../emails/RegisterEmail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { icno, fullname, email, password, role } = AddStaffSchema.parse(body) as AddStaffSchemaType;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Ensure the user is authenticated
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse('You must be signed in to create a user', { status: 401 });
    }

    console.log('Session ID:', session.user.id);

    // Hash the password before storing it
    const hashedPassword = await hash(password, 12);

    // Create a new user record in the database
    const newUser = await db.users.create({
      data: {
        user_id: icno,
        user_fullname: fullname,
        user_email: email,
        user_password: hashedPassword,
        user_role: role,
        created_by: session.user.id,
      },
    });

    console.log('User successfully created:', newUser);

    const { data, error } = await resend.emails.send({
      from: "no-reply <no-reply@pwms.xyz>",
      to: email,
      subject: "Form Submission",
      react: LoginPasswordEmail({ password: password }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse('Unable to create user. Please try again later.', { status: 500 });
  }
}
