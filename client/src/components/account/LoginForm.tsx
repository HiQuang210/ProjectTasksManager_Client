import {
  useForm,
} from "react-hook-form";

import Textbox from "@/components/Textbox";
import Button from "@/components/Button";
import Loading from "@/components/Loader";
import { LoginDto } from "@/api/types";

interface LoginFormProps {
  onSubmit: (
    data: LoginDto
  ) => Promise<void>;
}

const LoginForm = ({
  onSubmit,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<LoginDto>();

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="form-container w-full md:w-100 flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
    >
      <div>
        <p className="text-blue-600 text-3xl font-bold text-center">
          Welcome back!
        </p>

        <p className="text-center text-base text-gray-700">
          Please enter your
          credential.
        </p>
      </div>

      <div className="flex flex-col gap-y-5">
        <Textbox
          id="email"
          placeholder="email@example.com"
          type="email"
          name="email"
          label="Email Address"
          className="w-full rounded-full"
          register={register(
            "email",
            {
              required:
                "Email Address is required!",
            }
          )}
          error={
            errors.email
              ?.message
          }
        />

        <Textbox
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          label="Password"
          className="w-full rounded-full"
          register={register(
            "password",
            {
              required:
                "Password is required!",
            }
          )}
          error={
            errors.password
              ?.message
          }
        />

        {isSubmitting ? (
          <Loading />
        ) : (
          <Button
            type="submit"
            label="Login"
            className="w-full h-10 bg-blue-700 text-white rounded-full"
          />
        )}
      </div>
    </form>
  );
};

export default LoginForm;