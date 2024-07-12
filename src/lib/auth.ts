import { db } from '@/lib/db';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

// Define authentication options for NextAuth
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1800, // 5 seconds
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        user_email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials are provided
        if (!credentials?.user_email || typeof credentials.password !== 'string') {
          throw new Error('Invalid credentials');
        }

        // Find user in the database
        const user = await db.users.findUnique({
          where: { user_email: credentials.user_email }
        });

        // User not found
        if (!user) {
          throw new Error('Please enter correct email');
        }

        // Validate password
        const isPasswordValid = await compare(credentials.password, user.user_password);

        // Invalid password
        if (!isPasswordValid) {
          throw new Error('Please enter correct password');
        }

        // Return user object
        return { id: user.user_id.toString(), name: user.user_fullname, role: user.user_role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, add user details to the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.iat = Math.floor(Date.now() / 1000); // Issue at time
      }
      return token;
    },
    async session({ session, token }) {
      // Make token information available in session
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure the redirect URL is valid
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // If redirect URL is a relative path
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
