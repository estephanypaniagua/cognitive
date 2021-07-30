import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
// import { useMutation, useQuery } from "react-query";

import Header from "#root/components/Header/Header";
import HeaderLinks from "#root/components/Header/HeaderLinks";
import Footer from "#root/components/Footer/Footer";
import GridContainer from "#root/components/Grid/GridContainer";
import GridItem from "#root/components/Grid/GridItem";
import Card from "#root/components/Card/Card";

import styles from "#root/assets/jss/material-kit-react/views/loginPage";
import image from "#root/assets/img/bg7.jpg";

import SignupForm from "./SignupForm";
import { dataRequest } from "api/axios";

const useStyles = makeStyles(styles);

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ViewSignup = () => {
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  // const {isLoading, mutateAsync, } = useMutation("signupData", signupData => {
  //   fetch({ url: "http://localhost:5000/signup", method: "POST", json: signupData });
  // });

  setTimeout(() => {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const handleSignup = async payload => {
    console.log("submit", payload);
    try {
      const res = await dataRequest.post("/signup", payload);
      console.log({ res });
      if (res.status >= 200 && res.status < 300) {
        setToastSeverity("success");
        setToastMessage("Usuario registrado exitosamente");
        setIsToastOpen(true);
        return;
      }

      setToastSeverity("error");
      setToastMessage("Algo malo ocurrió ...");
      setIsToastOpen(true);
    } catch (err) {
      console.log({ err });
      if (!err.isAxiosError) {
        setToastSeverity("error");
        setToastMessage("Algo malo ocurrió ...");
        setIsToastOpen(true);
        return;
      }
      setToastSeverity("error");
      setToastMessage(err.response?.data?.message ?? "Algo malo ocurrió ...");
      setIsToastOpen(true);
    }
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
                <SignupForm onSignup={handleSignup} />
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
      <Snackbar autoHideDuration={6000} onClose={() => setIsToastOpen(false)} open={isToastOpen}>
        <Alert onClose={() => setIsToastOpen(false)} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewSignup;
