import { Box } from "@mui/material";
import React from "react";
import { EvoHNavBox } from "./EvoBox";
import EvoErrorBoundary from "./EvoErrorBoundary";

const EvoSection = ({ title, header, footer, children }) => {
  return (
    <EvoErrorBoundary>
      <Box style={{ border: "1px solid #EDEDED" }}>
        {(title || header) && (
          <EvoHNavBox
            divider
            style={{
              padding: "8px",
              borderBottom: "1px solid #EDEDED",
              backgroundColor: "primary.lighter",
            }}
            title={title}
            titleStyle={{ fontSize: 14 }}
            {...header}
          />
        )}

        {children}

        {footer && (
          <EvoHNavBox
            divider
            style={{
              padding: "2px",
              borderTop: "1px solid #EDEDED",
              // backgroundColor: "primary.lighter",
            }}
            titleStyle={{ fontSize: 9, fontWeight: "normal" }}
            {...footer}
          />
        )}
      </Box>
    </EvoErrorBoundary>
  );
};

export default EvoSection;
