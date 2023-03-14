import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import classes from "./Select.module.css";
import "./input.css";
function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className={`form-control ${classes["form-control"]}`}>
      <br />
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className={
          rest.error && rest?.toucheds
            ? `form-select border border-danger form-control `
            : `form-control form-select`
        }
      >
        {options.map((option) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Select;
