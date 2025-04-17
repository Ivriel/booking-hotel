import NextAuth from "next-auth"
import {prisma} from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:PrismaAdapter(prisma),
  providers: [Google],
  session:{strategy:"jwt"},
  pages:{
    signIn:"/signin"
  },
  callbacks:{ // setting tipe user based role 
    jwt({token,user}) {
      if (user) token.role = user.role;
      return token;
    },
    session({session,token}){
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    }
  }
})