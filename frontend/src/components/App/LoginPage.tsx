import { Avatar, Button, Card, CardActions, CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LockIcon from "@material-ui/icons/Lock";
import { useState } from "react";
import { Notification, useLogin, useNotify } from "react-admin";
import { Field, withTypes } from "react-final-form";
import { useLocation, useHistory } from "react-router-dom";

import { theme } from "#root/helpers/theme";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "98vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(/assets/landing.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  card: {
    minWidth: 300,
    marginTop: "6em",
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[500],
  },
  form: {
    padding: "0 1em 1em 1em",
  },
  input: {
    marginTop: "1em",
  },
  actions: {
    padding: "0 1em 1em 1em",
  },
}));

const renderInput = ({
  meta: { touched, error } = { touched: false, error: undefined },
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

interface FormValues {
  username?: string;
  password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const notify = useNotify();
  const login = useLogin();
  const history = useHistory();
  const location = useLocation<{ nextPathname: string } | null>();

  const handleSubmit = (auth: FormValues) => {
    setLoading(true);
    login(auth, location.state ? location.state.nextPathname : "/").catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        "warning",
        {
          _: typeof error === "string" ? error : error && error.message ? error.message : undefined,
        }
      );
    });
  };

  const validate = (values: FormValues) => {
    const errors: FormValues = {};
    if (!values.username) {
      errors.username = "Este campo es requerido";
    }
    if (!values.password) {
      errors.password = "Este campo es requerido";
    }
    return errors;
  };

  return (
    <div className={classes.main}>
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <Card className={classes.card}>
                <div className={classes.avatar}>
                  <Avatar className={classes.icon}>
                    <LockIcon />
                  </Avatar>
                </div>
                <div className={classes.hint}>Consejo: admin / admin</div>
                <div className={classes.form}>
                  <div className={classes.input}>
                    <Field
                      autoFocus
                      name="username"
                      // @ts-ignore
                      component={renderInput}
                      label="Correo"
                      disabled={loading}
                    />
                  </div>
                  <div className={classes.input}>
                    <Field
                      name="password"
                      // @ts-ignore
                      component={renderInput}
                      label="Contraseña"
                      type="password"
                      disabled={loading}
                    />
                  </div>
                </div>
                <CardActions className={classes.actions}>
                  <Button
                    color="secondary"
                    disabled={loading}
                    fullWidth
                    onClick={() => history.push("/signup")}
                    variant="outlined"
                  >
                    {loading && <CircularProgress size={25} thickness={2} />}
                    Registrarse
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                    fullWidth
                  >
                    {loading && <CircularProgress size={25} thickness={2} />}
                    Ingresar
                  </Button>
                </CardActions>
              </Card>
              <Notification />
            </div>
          </form>
        )}
      />
      <Card className={classes.card} style={{ padding: "2rem 1rem" }}>
        <p>Para más información ...</p>

        <Button
          color="secondary"
          disabled={loading}
          fullWidth
          onClick={() => history.push("/landing")}
          variant="outlined"
        >
          {loading && <CircularProgress size={25} thickness={2} />}
          Haz click aquí
        </Button>
      </Card>
    </div>
  );
};
const LoginWithTheme = (props: any) => (
  <ThemeProvider theme={theme}>
    <Login {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;
