import { Dialog } from "@headlessui/react";
import {
  Dispatch,
  SetStateAction,
} from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { ApiCollection } from "../api/ApiCollection";
import { ChangePasswordForm } from "../types/api";

interface ChangePasswordProps {
  open: boolean;

  setOpen: Dispatch<
    SetStateAction<boolean>
  >;
}

const ChangePassword = ({
  open,
  setOpen,
}: ChangePasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } =
    useForm<ChangePasswordForm>();

  const handleOnSubmit =
    async (
      data: ChangePasswordForm
    ) => {
      if (
        data.password !==
        data.confirmpass
      ) {
        toast.warning(
          "Passwords do not match"
        );

        return;
      }

      try {
        await ApiCollection.changePassword(
          {
            oldPassword:
              data.oldPassword,

            newPassword:
              data.password,
          }
        );

        toast.success(
          "Password changed successfully"
        );

        reset();

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
          Change Password
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Old Password"
            type="password"
            name="oldPassword"
            label="Old Password"
            className="w-full rounded"
            register={register(
              "oldPassword",
              {
                required:
                  "Old password required",
              }
            )}
            error={
              errors.oldPassword
                ?.message
            }
          />

          <Textbox
            placeholder="New Password"
            type="password"
            name="password"
            label="New Password"
            className="w-full rounded"
            register={register(
              "password",
              {
                required:
                  "Password required",
              }
            )}
            error={
              errors.password
                ?.message
            }
          />

          <Textbox
            placeholder="Confirm Password"
            type="password"
            name="confirmpass"
            label="Confirm Password"
            className="w-full rounded"
            register={register(
              "confirmpass",
              {
                required:
                  "Confirm password required",
              }
            )}
            error={
              errors.confirmpass
                ?.message
            }
          />
        </div>

        {isSubmitting ? (
          <div className="py-5">
            <Loading />
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse gap-3">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-white hover:bg-blue-700"
              label="Save"
            />

            <Button
              type="button"
              className="bg-white px-8 border"
              label="Cancel"
              onClick={() =>
                setOpen(false)
              }
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default ChangePassword;