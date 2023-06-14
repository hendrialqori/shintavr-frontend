import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Props = React.ComponentProps<"input">;

export const InputPassword = ({ type = "password", ...rest }: Props) => {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className="flex flex-col gap-1" aria-label="password-field">
      <label
        className="text-sm font-light tracking-wide text-gray-700"
        htmlFor="password"
      >
        password
      </label>
      <div className="relative w-full">
        <input
          {...rest}
          className="p-2 text-sm w-full rounded-md bg-gray-200 focus:border-blue-100 border-none"
          type={seePassword ? "text" : "password"}
          id="password"
          required
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSeePassword((prev) => !prev)}
          className="absolute text-lg top-2 right-2"
        >
          {seePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </div>
      </div>
    </div>
  );
};
