import clsx from "clsx";

interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({
  title,
  className,
}: TitleProps) => {
  return (
    <h2
      className={clsx(
        "text-2xl font-semibold capitalize",
        className
      )}
    >
      {title}
    </h2>
  );
};

export default Title;