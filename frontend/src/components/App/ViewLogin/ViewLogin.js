import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import React, { useState } from "react";
// @material-ui/icons

import Header from "#root/components/Header/Header";
import HeaderLinks from "#root/components/Header/HeaderLinks";
import Footer from "#root/components/Footer/Footer";
import GridContainer from "#root/components/Grid/GridContainer";
import GridItem from "#root/components/Grid/GridItem";
import Button from "#root/components/CustomButtons/Button";
import Card from "#root/components/Card/Card";
import CardBody from "#root/components/Card/CardBody";
import CardHeader from "#root/components/Card/CardHeader";
import CardFooter from "#root/components/Card/CardFooter";
import CustomInput from "#root/components/CustomInput/CustomInput";

import styles from "#root/assets/jss/material-kit-react/views/loginPage";
import image from "#root/assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const ViewLogin = () => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("submit");
  };

  return (
    <div>
      <Header absolute brand="Laboratorio 414" color="transparent" rightLinks={<HeaderLinks />} />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Iniciar sesi??n</h4>
                  </CardHeader>

                  <p className={classes.divider}>Ingresa tus datos</p>

                  <CardBody>
                    <CustomInput
                      formControlProps={{ fullWidth: true }}
                      id="first"
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      labelText="Nombres"
                    />
                    <CustomInput
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
                    />
                    <CustomInput
                      formControlProps={{ fullWidth: true }}
                      id="pass"
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>lock_outline</Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      labelText="Contrase??a"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Ingresar
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default ViewLogin;
