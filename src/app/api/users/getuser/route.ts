import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const users = await db.users.findMany({
        select:{
            user_id:true,
            user_fullname:true,
            user_email:true,
            user_role:true
        }
    });
    return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return new Response('Could not fetch packages', { status: 500 });
  }
}