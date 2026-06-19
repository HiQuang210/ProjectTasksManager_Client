import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalWrapper from "@/components/ModalWrapper";
import Textbox from "@/components/Textbox";
import Button from "@/components/Button";
import { ApiCollection } from "@/api/ApiCollection";

interface AddSubTaskForm {
  title: string;
  date: string;
  tag: string;
}

interface AddSubTaskProps {
  open: boolean;
  setOpen: (
    open: boolean
  ) => void;
  id?: string;
}

const AddSubTask = ({
  open,
  setOpen,
  id,
}: AddSubTaskProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<AddSubTaskForm>();

  const handleOnSubmit =
    async (
      data: AddSubTaskForm
    ) => {
      if (!id) {
        toast.error(
          "Task id missing"
        );

        return;
      }

      try {
        const response =
          await ApiCollection.createSubTask(
            id,
            data
          );

        toast.success(
          response.message ||
            "Sub task added successfully"
        );

        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (error) {
        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(
          handleOnSubmit
        )}
      >
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          ADD SUB-TASK
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register(
              "title",
              {
                required:
                  "Title is required",
              }
            )}
            error={
              errors.title
                ?.message
            }
          />

          <div className="flex items-center gap-4">
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register(
                "date",
                {
                  required:
                    "Date is required",
                }
              )}
              error={
                errors.date
                  ?.message
              }
            />

            <Textbox
              placeholder="Tag"
              type="text"
              name="tag"
              label="Tag"
              className="w-full rounded"
              register={register(
                "tag",
                {
                  required:
                    "Tag is required",
                }
              )}
              error={
                errors.tag
                  ?.message
              }
            />
          </div>
        </div>

        <div className="py-3 mt-4 flex sm:flex-row-reverse gap-4">
          <Button
            type="submit"
            disabled={
              isSubmitting
            }
            className="bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto"
            label={
              isSubmitting
                ? "Adding..."
                : "Add Task"
            }
          />

          <Button
            type="button"
            className="bg-white border text-sm font-semibold text-gray-900 sm:w-auto"
            onClick={() =>
              setOpen(false)
            }
            label="Cancel"
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;