import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Attempt to retrieve the token
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    }) as { iat: number; role: string } | null; // Adjust type to include 'role' property

    // If no token exists and the path is not the sign-in page, redirect to sign-in
    if (!token && path !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If a token exists, check session expiration
    if (token) {
        const currentTime = Math.floor(Date.now() / 1000);
        const sessionTimeout = 1800; // 5 seconds

        if (currentTime - token.iat > sessionTimeout) {
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }

        const role = token.role; // Access 'role' property

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
