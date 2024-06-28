"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";

const updateProfileFormSchema = z.object({
  fullName: z.string(),
  officeHours: z.string(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const profileFieldsLookup = profileData.data.reduce(
    (acc: Record<string, any>, item: Record<string, any>) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    },
    {}
  );

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileValues>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      fullName: profileFieldsLookup["fullName"],
      officeHours: profileFieldsLookup["officeHours"],
    },
  });

  const onSubmit = async (values: updateProfileValues) => {
    const updateProfileResponse = await updateProfileAction(values);

    if (!updateProfileResponse.success) {
      return toast.error(updateProfileResponse.error?.message);
    }

    toast.success("Profile Updated Successfully");
    router.push(`/profile`);
  };

  return (
    <>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input
          {...register("fullName")}
          type='text'
          defaultValue={profileFieldsLookup["fullName"]}
        />
        {errors.fullName && (
          <p className='text-red-600'>{errors.fullName?.message}</p>
        )}

        <label>Office Hours</label>
        <input
          {...register("officeHours")}
          type='text'
          defaultValue={profileFieldsLookup["officeHours"]}
        />
        {errors.officeHours && (
          <p className='text-red-600'>{errors.officeHours?.message}</p>
        )}

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
