"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";
import { InstructorType } from "@fcai-sis/shared-models";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { tt } from "@/lib";

const updateProfileFormSchema = z.object({
  fullName: z.string(),
  office: z.string(),
  officeHoursFrom: z.string(),
  officeHoursTo: z.string(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({
  editableFields,
  viewableFields,
}: {
  editableFields: any;
  viewableFields: any;
}) {
  const locale = useCurrentLocale();
  const t = useI18n();
  const profileFieldsLookup = editableFields.reduce(
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
      office: profileFieldsLookup["office"],
      officeHoursFrom: profileFieldsLookup["officeHoursFrom"],
      officeHoursTo: profileFieldsLookup["officeHoursTo"],
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
    <div className='flex justify-center items-center '>
      <div className='w-full max-w-lg p-6 bg-white shadow-lg rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex flex-col'>
            <label className='text-lg font-medium'>Full Name</label>
            <input
              {...register("fullName")}
              type='text'
              defaultValue={profileFieldsLookup["fullName"]}
              className='p-2 border border-gray-300 rounded-lg'
            />
            {errors.fullName && (
              <p className='text-red-600'>{errors.fullName?.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label className='text-lg font-medium'>Office</label>
            <input
              {...register("office")}
              type='text'
              defaultValue={profileFieldsLookup["office"]}
              className='p-2 border border-gray-300 rounded-lg'
            />
            {errors.office && (
              <p className='text-red-600'>{errors.office?.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label className='text-lg font-medium'>Office Hours</label>
            <div className='flex gap-4'>
              <input
                {...register("officeHoursFrom")}
                type='time'
                defaultValue={profileFieldsLookup["officeHoursFrom"]}
                className='p-2 border border-gray-300 rounded-lg'
              />
              <span className='self-center'>to</span>
              <input
                {...register("officeHoursTo")}
                type='time'
                defaultValue={profileFieldsLookup["officeHoursTo"]}
                className='p-2 border border-gray-300 rounded-lg'
              />
            </div>
            {errors.officeHoursFrom && (
              <p className='text-red-600'>{errors.officeHoursFrom?.message}</p>
            )}
            {errors.officeHoursTo && (
              <p className='text-red-600'>{errors.officeHoursTo?.message}</p>
            )}
          </div>

          <div className='mb-5'>
            {viewableFields.map((field: any) => {
              const key = Object.keys(field)[0] as keyof InstructorType;
              return (
                <div key={key} className='mb-4'>
                  <label
                    htmlFor={key}
                    className='flex text-lg font-medium text-gray-700 mb-1'
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type='text'
                    id={key}
                    defaultValue={tt(locale, field[key].name)}
                    disabled
                    className='mt-1 p-2 flex border border-gray-300 rounded-md bg-gray-100 sm:text-sm'
                  />
                </div>
              );
            })}
          </div>

          <div className='flex justify-between'>
            <button
              className='btn flex justify-center'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
            <button
              className='btn-secondary flex justify-center'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              {t("general.back")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
