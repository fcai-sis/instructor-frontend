"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";
import { StudentType, studentLocalizedFields } from "@fcai-sis/shared-models";

const updateProfileFormSchema = z.object({
  fullName: z.string().min(1).optional(),
  phoneNumber: z
    .string()
    .length(11)
    .refine((value) => {
      return !isNaN(Number(value));
    }, "Phone number must be a numeric string")
    .optional(),
  address: z.string().min(1).optional(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const profileFieldsLookup = profileData.editableFields.reduce(
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
      phoneNumber: profileFieldsLookup["phoneNumber"],
      address: profileFieldsLookup["address"],
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
        <div className="mb-5">
          {profileData.editableFields.map((field: any) => {
            const key = Object.keys(field)[0];
            return (
              <div key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  {...register(key as keyof updateProfileValues)}
                  type="text"
                  id={key}
                  defaultValue={profileFieldsLookup[key]}
                />
                {errors[key as keyof updateProfileValues] && (
                  <span className="text-red-500">
                    {errors[key as keyof updateProfileValues]?.message}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div>
          {profileData.viewableFields.map((field: any) => {
            const key = Object.keys(field)[0] as keyof StudentType;
            return (
              <div key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  id={key}
                  defaultValue={field[key]}
                  disabled
                />
              </div>
            );
          })}
        </div>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
