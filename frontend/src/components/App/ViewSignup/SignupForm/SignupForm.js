import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import React from "react";
import { useForm } from "react-hook-form";

import styles from "#root/assets/jss/material-kit-react/views/loginPage";
import CardBody from "#root/components/Card/CardBody";
import CardHeader from "#root/components/Card/CardHeader";
import CardFooter from "#root/components/Card/CardFooter";
import Button from "#root/components/CustomButtons/Button";
import CustomInput from "#root/components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

const SignupForm = ({ onSignup }) => {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSignup)}>
      <CardHeader color="primary" className={classes.cardHeader}>
        <h4>Registrarse</h4>
      </CardHeader>

      <p className={classes.divider}>Ingresa tus datos</p>

      <CardBody>
        <CustomInput
          control={control}
          defaultValue=""
          formControlProps={{ fullWidth: true }}
          id="name"
          inputProps={{
            type: "text",
            endAdornment: (
              <InputAdornment position="end">
                <People className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
          labelText="Nombre"
          name="name"
        />
        <CustomInput
          control={control}
          defaultValue=""
          formControlProps={{ fullWidth: true }}
          id="mail"
          inputProps={{
            type: "email",
            endAdornment: (
              <InputAdornment position="end">
                <Email className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
          labelText="Correo"
          name="mail"
        />
        <CustomInput
          control={control}
          defaultValue=""
          formControlProps={{ fullWidth: true }}
          id="pass"
          inputProps={{
            autoComplete: "off",
            type: "password",
            endAdornment: (
              <InputAdornment position="end">
                <Icon className={classes.inputIconsColor}>lock_outline</Icon>
              </InputAdornment>
            ),
          }}
          labelText="Contraseña"
          name="password"
        />
        <CustomInput
          control={control}
          defaultValue=""
          formControlProps={{ fullWidth: true }}
          id="university_code"
          inputProps={{
            autoComplete: "off",
            type: "text",
          }}
          labelText="Código de alumno"
          name="university_code"
        />
        <CustomInput
          control={control}
          defaultValue=""
          formControlProps={{ fullWidth: true }}
          id="cellphone"
          inputProps={{
            autoComplete: "off",
            type: "text",
          }}
          labelText="Número de teléfono"
          name="cellphone"
        />
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button simple color="primary" size="lg" type="submit">
          Ingresar
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignupForm;
