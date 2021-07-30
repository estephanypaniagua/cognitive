import { containerFluid } from "#root/assets/jss/material-kit-react.js";

import imagesStyle from "#root/assets/jss/material-kit-react/imagesStyles.js";

const exampleStyle = {
  section: {
    padding: "70px 0",
  },
  container: {
    ...containerFluid,
    textAlign: "center !important",
  },
  ...imagesStyle,
  link: {
    textDecoration: "none",
  },
};

export default exampleStyle;
