import dbConnect from "@/database";
import {
  InstructorModel,
  IUser,
  TeachingAssistantModel,
  UserModel,
} from "@fcai-sis/shared-models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
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

        const [instructor, teachingAssistant] = await Promise.all([
          InstructorModel.findOne({
            email: credentials.email,
          }),
          TeachingAssistantModel.findOne({
            email: credentials.email,
          }),
        ]);

        if (!instructor && !teachingAssistant) return null;
        const instructorOrTA = instructor || teachingAssistant;

        const user: IUser | null = await UserModel.findById(
          instructorOrTA.user
        );

        if (!user) return null;

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) return null;

        return {
          id: user._id as string,
          email: user._id as string,
          name: user.role as string,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
