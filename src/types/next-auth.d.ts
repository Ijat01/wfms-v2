import type { User as NextAuthUser } from 'next-auth';
import 'next-auth/jwt';

type user_id = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: user_id;
    name: string;
    role: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: user_id;
    name: string;
    role: string;
  }

  interface Session {
    user: NextAuthUser & {
      id: user_id;
      role: string;
    };
  }
}