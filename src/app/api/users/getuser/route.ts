import { db } from '@/lib/db';

  export async function GET(req: Request) {
    try {
      const user = await db.users.findMany();
      return new Response(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      console.error('Error fetching packages:', error);
      return new Response('Could not fetch packages', { status: 500 });
    }
  }