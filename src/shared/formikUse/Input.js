import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "./input.css";
function Input(props) {
  const { label, name, classnew, ...rest } = props;
  return (
    <div className="bungkus">
      <label className="margin" htmlFor={name}>
        {label}
      </label>

      <Field
        id={name}
        name={name}
        {...rest}
        className={
          rest.error && rest?.toucheds
            ? `border border-danger form-control ${classnew}`
            : `form-control ${classnew}`
        }
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
