import { db } from '@/lib/db';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        user_id: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials) {
        if (!credentials?.user_id || typeof credentials.password !== 'string') {
          return null;
        }

        const user = await db.users.findUnique({
          where: { user_id: credentials.user_id }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.user_password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.user_id.toString(),
          name: user.user_fullname,
          role: user.user_role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
    redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);