import { Dialog } from "@headlessui/react";

import {
  Dispatch,
  SetStateAction,
} from "react";

import ModalWrapper from "./ModalWrapper";

import { Notification } from "@/types/notification";

interface ViewNotificationProps {
  open: boolean;

  setOpen: Dispatch<
    SetStateAction<boolean>
  >;

  el: Notification | null;
}

const ViewNotification = ({
  open,
  setOpen,
  el,
}: ViewNotificationProps) => {
  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
    >
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <Dialog.Title
          as="h3"
          className="font-bold text-xl text-center mb-2"
        >
          {el?.task?.title}
        </Dialog.Title>

        <p className="text-center text-gray-500">
          {el?.text}
        </p>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
            onClick={() =>
              setOpen(false)
            }
          >
            OK
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ViewNotification;