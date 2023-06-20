type Props = {
  title: string;
} & React.ComponentProps<"input">;

export const Input = ({ title, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1" aria-label={`${title}-field`}>
      <label className="font-light tracking-wide" htmlFor={title}>
        {title}
      </label>
      <input
        {...rest}
        className="p-2 text-lg rounded-md bg-gray-200 focus:border-blue-100 border-none"
        id={title}
      />
    </div>
  );
};
