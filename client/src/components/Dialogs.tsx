import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import {
  FaQuestion,
  FaExclamationTriangle,
} from "react-icons/fa";

import Button from "./Button";
import ModalWrapper from "./ModalWrapper";
export type DialogType =
  | "delete"
  | "deleteAll"
  | "restore"
  | "restoreAll";

interface ConfirmationDialogProps {
  open: boolean;

  setOpen: (
    open: boolean
  ) => void;

  msg?: string | null;

  setMsg?: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  onClick?: () => void;

  type?: DialogType;

  setType?: React.Dispatch<
    React.SetStateAction<DialogType>
  >;
}

const ConfirmationDialog = ({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}: ConfirmationDialogProps) => {
  const closeDialog =
    () => {
      setType("delete");

      setMsg(null);

      setOpen(false);
    };

  const isRestore =
    type === "restore" ||
    type === "restoreAll";

  return (
    <ModalWrapper
      open={open}
      setOpen={closeDialog}
    >
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3">
          <p
            className={clsx(
              "p-3 rounded-full",
              isRestore
                ? "text-yellow-600 bg-yellow-100"
                : "text-red-600 bg-red-200"
            )}
          >
            <FaExclamationTriangle
              size={50}
            />
          </p>
        </Dialog.Title>

        <p className="text-center text-gray-500">
          {msg ??
            "Are you sure you want to delete the selected record?"}
        </p>

        <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
          <Button
            type="button"
            className={clsx(
              "px-8 text-sm font-semibold text-white sm:w-auto",
              isRestore
                ? "bg-yellow-600"
                : "bg-red-600 hover:bg-red-500"
            )}
            onClick={onClick}
            label={
              isRestore
                ? "Restore"
                : "Delete"
            }
          />

          <Button
            type="button"
            className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
            onClick={closeDialog}
            label="Cancel"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmationDialog;

interface UserActionProps {
  open: boolean;

  setOpen: (
    open: boolean
  ) => void;

  onClick?: () => void;
}

export const UserAction = ({
  open,
  setOpen,
  onClick = () => {},
}: UserActionProps) => {
  const closeDialog =
    () => {
      setOpen(false);
    };

  return (
    <ModalWrapper
      open={open}
      setOpen={closeDialog}
    >
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title as="h3">
          <p className="p-3 rounded-full text-red-600 bg-red-200">
            <FaQuestion size={60} />
          </p>
        </Dialog.Title>

        <p className="text-center text-gray-500">
          Are you sure you want
          to activate or
          deactivate this
          account?
        </p>

        <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse gap-4">
          <Button
            type="button"
            className="px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500"
            onClick={onClick}
            label="Yes"
          />

          <Button
            type="button"
            className="bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
            onClick={closeDialog}
            label="No"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};