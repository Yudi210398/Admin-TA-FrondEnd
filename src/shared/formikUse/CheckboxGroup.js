import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "./input.css";
import classes from "./Select.module.css";
function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className={`form-control ${classes["form-control"]}`}>
      <label className={classes.labelcheck}>{label}</label>
      <br />
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  className={classes.labelInput}
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default CheckboxGroup;
