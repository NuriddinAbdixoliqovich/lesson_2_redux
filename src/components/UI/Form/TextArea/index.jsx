// TextArea.js
import React from "react";
import { forwardRef } from "react";

const TextArea = ({ placeholder, value, onChange, ...restProps }, ref) => {
  return (
    <textarea
      ref={ref}
      className=" border rounded-md p-2 w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
};

export default forwardRef(TextArea);
