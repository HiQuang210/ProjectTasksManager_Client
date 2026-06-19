import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAppSelector,
} from "@/redux/hooks";

import LoginHero from "@/components/account/LoginHero";
import LoginForm from "@/components/account/LoginForm";

import {
  useLogin,
} from "@/hooks/useLogin";

const Login = () => {
  const navigate =
    useNavigate();

  const { user } =
    useAppSelector(
      (state) =>
        state.auth
    );

  const {
    loginHandler,
  } = useLogin();

  useEffect(() => {
    if (user) {
      navigate(
        "/dashboard"
      );
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <LoginHero />

        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <LoginForm
            onSubmit={
              loginHandler
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login;