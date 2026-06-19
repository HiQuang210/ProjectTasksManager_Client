import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { ApiCollection } from "@/api/ApiCollection";

import {
  useAppDispatch,
} from "@/redux/hooks";

import {
  setCredentials,
} from "@/redux/slices/authSlice";

import { LoginDto } from "@/api/types";

export const useLogin = () => {
  const navigate =
    useNavigate();

  const dispatch =
    useAppDispatch();

  const loginHandler =
    async (
      data: LoginDto
    ) => {
      try {
        const result =
          await ApiCollection.login(
            data
          );

        dispatch(
          setCredentials(
            result
          )
        );

        toast.success(
          "Login successful"
        );

        navigate(
          "/dashboard"
        );
      } catch (
        error: unknown
      ) {
        const err =
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };

            message?: string;
          };

        toast.error(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Login failed"
        );
      }
    };

  return {
    loginHandler,
  };
};