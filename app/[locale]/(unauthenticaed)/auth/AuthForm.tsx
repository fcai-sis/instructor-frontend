"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useI18n } from "@/locales/client";

const authFormSchema = z.object({
  studentId: z.string().regex(/^\d+$/),
  password: z.string(),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export default function AuthForm() {
  const t = useI18n();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { studentId: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      studentId: values.studentId,
      password: values.password,
    });

    if (result?.ok) {
      toast.success(t("auth.success"));
      router.push("/");
    } else {
      toast.error(t("auth.error.invalidCredentials"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{t("auth.studentId")}</label>
      <input {...register("studentId")} type="text" />
      <label>{t("auth.password")}</label>
      <input {...register("password")} type="password" />
      <button className="btn" type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? t("general.loading") : t("auth.login")}
      </button>
    </form>
  );
}
