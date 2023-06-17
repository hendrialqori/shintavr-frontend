import { ComponentProps } from "react";


type Props = ComponentProps<"input"> & {
  names: string
}

export const Checkbox = ({ names, ...rest }: Props) => {
  return (
    <div className="checkbox-wrapper">
      <div className="round">
        <input {...rest} type="radio" id={names} />
        <label htmlFor={names}></label>
      </div>
    </div>
  );
};