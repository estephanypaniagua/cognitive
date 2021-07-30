import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

import styles from "#root/assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

const CustomInput = ({
  control,
  name,
  defaultValue,

  formControlProps,
  labelText,
  id,
  labelProps,
  inputProps,
  error,
  white,
  inputRootCustomClasses,
  success,
}) => {
  const classes = useStyles();

  const labelClasses = clsx({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const underlineClasses = clsx({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });

  const marginTop = clsx({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined,
  });

  const inputClasses = clsx({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });

  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = clsx(formControlProps.className, classes.formControl);
  } else {
    formControlClasses = classes.formControl;
  }

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined && (
        <InputLabel className={`${classes.labelRoot} ${labelClasses}`} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      )}
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              {...field}
              classes={{
                input: inputClasses,
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses,
              }}
              id={id}
              {...inputProps}
            />
          )}
        />
      ) : (
        <Input
          classes={{
            input: inputClasses,
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses,
          }}
          id={id}
          name={name}
          defaultValue={defaultValue}
          {...inputProps}
        />
      )}
    </FormControl>
  );
};

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
};

export default CustomInput;
