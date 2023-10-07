import { Box, Typography } from "@mui/material";
import React from "react";
import { parseValue } from "../../utils/commonService";
import { EvoHBox, EvoVBox } from "../EvoBox";
import EvoErrorBoundary from "../EvoErrorBoundary";
import { getEditor } from "./enrichItem";
import ReadOnlyElement from "./readOnly";

const LabelElement = ({
  labelColor,
  placement,
  labelWidth,
  required,
  label,
  direction,
}) =>
  label && (
    <Typography
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        color: labelColor,
        width:
          direction === "row" || placement === "top" ? undefined : labelWidth,
      }}
    >
      <Box textAlign={placement === "top" ? "left" : "right"}>
        {required && "* "}
        {label}
      </Box>
    </Typography>
  );

const EvoDataFormElement = (props) => {
  const { type, value, readOnly, placement, Editor = getEditor(props) } = props;
  const EvoBox = placement === "top" ? EvoVBox : EvoHBox;

  return (
    <EvoBox style={{}}>
      <LabelElement {...props} />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {readOnly ? (
          <ReadOnlyElement type={type} value={value} />
        ) : (
          <EvoErrorBoundary small>{Editor}</EvoErrorBoundary>
        )}
      </Box>
    </EvoBox>
  );
};

export default EvoDataFormElement;
