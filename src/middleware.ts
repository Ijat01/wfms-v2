import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Attempt to retrieve the session
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // If no session exists and the path is not the sign-in page, redirect to sign-in
    if (!session && path !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If a session exists, determine the user's role and check path access
    if (session) {
        const role = session.role;

        // Redirect based on role if accessing the root or sign-in page
        if (path === '/' || path === '/sign-in') {
            if (role === 'Admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            } else if (role === 'Marketer') {
                return NextResponse.redirect(new URL('/marketer/dashboard', req.url));
            } else if (role === 'Crew') {
                return NextResponse.redirect(new URL('/crew/dashboard', req.url));
            }
        }

        // Restrict access to role-specific paths
        if (role === 'Admin' && !path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else if (role === 'Marketer' && !path.startsWith('/marketer')) {
            return NextResponse.redirect(new URL('/marketer/dashboard', req.url));
        } else if (role === 'Crew' && !path.startsWith('/crew')) {
            return NextResponse.redirect(new URL('/crew/dashboard', req.url));
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/admin/:path*',
        '/marketer/:path*',
        '/crew/:path*',
    ],
};