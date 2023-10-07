import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loader = ({ loading, children }) => {
  const stylesL = loading
    ? { ...styles.con, ...styles.loadongColors }
    : { ...styles.con };

  const blurStyles = loading ? styles.blur : {};

  return (
    <Box sx={stylesL}>
      <Box sx={blurStyles}>{children}</Box>
      <Box style={{ position: "absolute" }}>
        {loading ? <CircularProgress /> : null}
      </Box>
    </Box>
  );
};

const styles = {
  con: {
    width: "100%",
    height: "100%",
    zIndex: "-1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
  },
  loadongColors: {
    zIndex: "10000",
    //background: "#216ba55e",
  },
  blur: {
    filter: "blur(1px)",
    "-webkit-filter": "blur(1px)",
  },
};
