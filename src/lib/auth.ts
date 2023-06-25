import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail } from "./users";

export const authOptions: NextAuthOptions = {
  session: {
    // strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
    // updateAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    // CredentialsProvider({
    //   name: "Sign in",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@example.com",
    //       value:"gorditomaloso@gmail.com"
    //     },
    //     password: { label: "Password", type: "password", value:"******" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) {
    //       return null;
    //     }
    //     const data = await getUserByEmail('email', credentials?.email as string)
    //     console.log('data', data)
    //     const user = { id: data.sid, name: data.username, email: "admin@admin.com" };
    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    signIn: ({ user, account, profile, email, credentials }) => {
      // console.log('credentials', credentials)
      // console.log('signIn', { user, account, profile, email, credentials })
      return true
    },
    session: ({ session, token, user }) => {
      session.user.sid = token.sid
      session.user.role = token.role
      session.user.uid = token.uid
      return session
    },
    jwt: async ({ token, user, account, profile }) => {
      if (account) {
        // token.accessToken = account.access_token;
        switch( account.type ){
          case 'oauth':
            // console.log('profile', profile)
            const data = await getUserByEmail('email', profile?.email as string)
            // const data = await oAUthToDbUser(user?.email || '', user?.name || '', user?.image|| '', account?.provider|| '')
            // token.sid = data.sid
            // token.role = data.role
            // console.log('data', data)
            token.sid = data.sid
            token.role = data.role
            token.uid = data.siteId
          break
          // case 'credentials':
          //   token.user = user;
          // break
        }
      }
      
      return token
    }
  },
};
