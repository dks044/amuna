import { authOptions } from "@/app/utils/authOptions";
import NextAuth from "next-auth/next";

//import { AuthOptions } from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
