const LoginHero = () => {
  return (
    <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
      <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
        <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
          Manage all your task
          in one place!
        </span>

        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
          <span>
            Cloud-Based
          </span>

          <span>
            Project Tasks
            Manager
          </span>
        </p>

        <div className="cell">
          <div className="circle rotate-in-up-left" />
        </div>
      </div>
    </div>
  );
};

export default LoginHero;