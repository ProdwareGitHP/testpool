import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const EvoLink = (props) => {
  const classes = makeStyles(() => ({
    link: {
      fontSize: "14px",
      // fontFamily: "Inter",
      color: "#124590",
      textDecoration: "none",
      "&:hover": {
        "text-decoration": "underline",
      },
    },
  }))();

  return <Link {...props} className={classes.link} />;
};

export default EvoLink;
