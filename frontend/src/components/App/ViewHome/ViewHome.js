import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

const useStyles = makeStyles(styles);

const dashboardRoutes = [];

const ViewHome = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Laboratorio 414"
        color="transparent"
        changeColorOnScroll={{
          color: "white",
          height: 400,
        }}
        fixed
        rightLinks={<HeaderLinks />}
        routes={dashboardRoutes}
      />
      <Parallax filter image={require("assets/img/bg4.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Componentes electrónicos del L414</h1>
              <h4>
                Ahora la solicitud y reserva de componentes puede realizarse a través de esta web,
                para tener más transparencia en el proceso de prestamos de componentes electrónicos
              </h4>
              <br />
              <Link className={classes.link} to="/login">
                <Button color="info" size="lg">
                  Ingresar
                </Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={clsx(classes.main, classes.mainRaised)}>
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin /> */}
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        {/* <SectionExamples />
        <SectionDownload /> */}
      </div>
      <Footer />
    </div>
  );
};

export default ViewHome;
