import dbConnect from "@/database";
import { StudentModel, UserModel } from "@fcai-sis/shared-models";
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
        studentId: { label: "Student ID", type: "number" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.password === undefined ||
          credentials?.studentId === undefined
        ) {
          return null;
        }

        await dbConnect();

        const student = await StudentModel.findOne({
          studentId: credentials.studentId,
        });

        if (!student) return null;

        const user = await UserModel.findById(student.user);

        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) return null;

        return {
          id: user._id,
          email: user._id,
          name: Role.STUDENT,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
