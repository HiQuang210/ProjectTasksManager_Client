import { Dialog } from "@headlessui/react";
import {
  Dispatch,
  SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Button from "./Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux/hooks";
import {
  setCredentials,
} from "../redux/slices/authSlice";
import { User } from "../types/user";
import { AddUserDto } from "../types/api";
import { ApiCollection } from "../api/ApiCollection";

interface AddUserProps {
  open: boolean;

  setOpen: Dispatch<
    SetStateAction<boolean>
  >;

  userData?: User | null;
}

const AddUser = ({
  open,
  setOpen,
  userData,
}: AddUserProps) => {
  const defaultValues: Partial<AddUserDto> =
    userData ?? {};

  const { user } =
    useAppSelector(
      (state) => state.auth
    );

  const dispatch =
    useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserDto>({
    defaultValues,
  });

  const handleOnSubmit = async (
    data: AddUserDto
  ) => {
    try {
      if (userData) {
        const result =
          await ApiCollection.updateUser(
            data
          );

        toast.success(
          "Profile updated successfully"
        );

        if (
          userData._id ===
          user?._id
        ) {
          dispatch(
            setCredentials(
              result.user
            )
          );
        }
      } else {
        await ApiCollection.register(
          data
        );

        toast.success(
          "New user added successfully"
        );
      }

      setTimeout(() => {
        setOpen(false);
      }, 1000);
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
          className="text-base font-bold mb-4"
        >
          {userData
            ? "UPDATE PROFILE"
            : "ADD NEW USER"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register(
              "name",
              {
                required:
                  "Full name is required",
              }
            )}
            error={
              errors.name?.message
            }
          />

          <Textbox
            placeholder="Title"
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
              errors.title?.message
            }
          />

          <Textbox
            placeholder="Email"
            type="email"
            name="email"
            label="Email"
            className="w-full rounded"
            register={register(
              "email",
              {
                required:
                  "Email required",
              }
            )}
            error={
              errors.email?.message
            }
          />

          {!userData && (
            <Textbox
              placeholder="Password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded"
              register={register(
                "password",
                {
                  required:
                    "Password required",
                }
              )}
              error={
                errors.password?.message
              }
            />
          )}

          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded"
            register={register(
              "role",
              {
                required:
                  "Role required",
              }
            )}
            error={
              errors.role?.message
            }
          />
        </div>

        <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
          <Button
            type="submit"
            className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
            label="Submit"
          />

          <Button
            type="button"
            className="bg-white px-5 text-sm"
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

export default AddUser;