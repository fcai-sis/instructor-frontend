"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { submitDepartmentPreferenceAction } from "./actions";

const departmentPreferenceFormSchema = z.object({
  preferences: z.array(
    z.object({
      code: z.string(),
    })
  ),
});

export type DepartmentPreferenceFormValues = z.infer<
  typeof departmentPreferenceFormSchema
>;

export default function DepartmentPreferenceForm({
  departments,
}: Readonly<{ departments: any[] }>) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentPreferenceFormValues>({
    resolver: zodResolver(departmentPreferenceFormSchema),
    defaultValues: {
      preferences: departments.map((department) => ({
        code: department.code,
      })),
    },
  });

  const { fields, move } = useFieldArray({
    control,
    name: "preferences",
  });

  //uses move from useFieldArray to change the position of the form
  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const onSubmit = async (values: DepartmentPreferenceFormValues) => {
    const submitDepartmentPreferenceResponse =
      await submitDepartmentPreferenceAction(values);

    if (!submitDepartmentPreferenceResponse.success) {
      return toast.error(
        submitDepartmentPreferenceResponse.error?.message ??
          "Failed to submit department preferences"
      );
    }

    toast.success("Department preferences submitted successfully");
    router.push(`/`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Department Preference Form</h1>
      <DragDropContext onDragEnd={handleDrag}>
        <ul>
          <Droppable droppableId='preferences-items'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={`preferences[${index}]`}
                    draggableId={`preferences-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='bg-gray-100 p-2 mb-2'
                      >
                        <input
                          type='hidden'
                          {...register(`preferences.${index}.code` as const)}
                          value={field.code}
                        />
                        {
                          departments.find(
                            (department) => department.code === field.code
                          )?.name.en
                        }
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
