import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const packages = await db.packages.findMany();
    return new Response(JSON.stringify(packages), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return new Response('Could not fetch packages', { status: 500 });
  }
}