import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { toast } from "react-toastify";
import ModalWrapper from "@/components/ModalWrapper";
import Textbox from "@/components/Textbox";
import UserList from "./UserList";
import SelectList from "@/components/SelectList";
import Button from "@/components/Button";
import { ApiCollection } from "@/api/ApiCollection";
import { dateFormatter } from "@/utils";
import type { Task } from "@/types/task";

const LISTS = [
  "TODO",
  "IN PROGRESS",
  "COMPLETED",
] as const;

const PRIORITY = [
  "HIGH",
  "MEDIUM",
  "NORMAL",
  "LOW",
] as const;

interface AddTaskForm {
  title: string;
  date: string;
}

interface AddTaskProps {
  open: boolean;
  setOpen: (
    open: boolean
  ) => void;
  task?: Task;
}

const uploadToCloudinary =
  async (
    file: File
  ): Promise<string> => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      import.meta.env
        .VITE_CLOUDINARY_KEY
    );

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env
            .VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",

          body: formData,
        }
      );

    if (!response.ok) {
      throw new Error(
        "Upload failed"
      );
    }

    const data =
      await response.json();

    return data.secure_url;
  };

const AddTask = ({
  open,
  setOpen,
  task,
}: AddTaskProps) => {
  const defaultValues: AddTaskForm =
    {
      title:
        task?.title || "",

      date: dateFormatter(
        String(
          task?.date ||
            new Date()
        )
      ),
    };

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<AddTaskForm>({
      defaultValues,
    });

  const [team, setTeam] =
    useState<string[]>(
      task?.team?.map(
        (member) =>
          member._id
      ) || []
    );

  const [stage, setStage] =
    useState<string>(
      task?.stage
        ?.toUpperCase() ||
        LISTS[0]
    );

  const [
    priority,
    setPriority,
  ] = useState<string>(
    task?.priority
      ?.toUpperCase() ||
      PRIORITY[2]
  );

  const [assets, setAssets] =
    useState<File[]>([]);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const submitHandler =
    async (
      data: AddTaskForm
    ) => {
      try {
        setUploading(true);

        const uploadedUrls =
          await Promise.all(
            assets.map(
              (
                file
              ) =>
                uploadToCloudinary(
                  file
                )
            )
          );

        const newData = {
          ...data,

          assets: [
            ...(task?.assets ||
              []),

            ...uploadedUrls,
          ],

          team,

          stage,

          priority,
        };

        const response =
          task?._id
            ? await ApiCollection.updateTask(
                task._id,
                newData
              )
            : await ApiCollection.createTask(
                newData
              );

        toast.success(
          response.message ||
            "Task saved successfully"
        );

        setTimeout(() => {
          setOpen(false);

          window.location.reload();
        }, 1200);
      } catch (error) {
        console.log(error);

        toast.error(
          "Something went wrong"
        );
      } finally {
        setUploading(false);
      }
    };

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !e.target.files
    ) {
      return;
    }

    setAssets(
      Array.from(
        e.target.files
      )
    );
  };

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(
          submitHandler
        )}
      >
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {task
            ? "UPDATE TASK"
            : "ADD TASK"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
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

          <UserList
            setTeam={
              setTeam
            }
            team={team}
          />

          <div className="flex gap-4">
            <SelectList
              label="Task Stage"
              lists={[
                ...LISTS,
              ]}
              selected={
                stage
              }
              setSelected={
                setStage
              }
            />

            <div className="w-full">
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
            </div>
          </div>

          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={[
                ...PRIORITY,
              ]}
              selected={
                priority
              }
              setSelected={
                setPriority
              }
            />

            <div className="w-full flex items-center justify-center mt-4">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
              >
                <input
                  id="imgUpload"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  className="hidden"
                  onChange={
                    handleSelect
                  }
                />

                <BiImages />

                <span>
                  Add Assets
                </span>
              </label>
            </div>
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {uploading ||
            isSubmitting ? (
              <span className="text-sm py-2 text-red-500">
                Uploading
                assets...
              </span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              />
            )}

            <Button
              type="button"
              label="Cancel"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() =>
                setOpen(
                  false
                )
              }
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;