import dbConnect from "@/database";
import {
  InstructorModel,
  UserModel,
} from "@fcai-sis/shared-models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Role } from "@fcai-sis/shared-middlewares";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Instructor E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.password === undefined ||
          credentials?.email === undefined
        ) {
          return null;
        }

        await dbConnect();

        const instructor = await InstructorModel.findOne({
          email: credentials.email,
        });

        if (!instructor) return null;

        const user = await UserModel.findById(instructor.user);

        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) return null;

        return {
          id: user._id,
          email: user._id,
          name: Role.INSTRUCTOR,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
