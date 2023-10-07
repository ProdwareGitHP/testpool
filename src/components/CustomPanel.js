import { Card, Box, Divider, Paper } from "@mui/material";
import React from "react";
import { CustomContent } from "./CustomContent";
import { EvoHNavBox, EvoVBox } from "./EvoBox";

export const CustomPanel = ({
  title,
  onClose,
  HeaderComponent,
  FooterComponent,
  headerStyle,
  contentStyle,
  style,
  ...props
}) => {
  return (
    <Paper style={{ ...style, display: "flex", flexDirection: "column" }}>
      {title && (
        <Card
          style={{
            ...headerStyle,
            padding: "10px",
            marginBottom: "1px",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <EvoHNavBox
            title={title}
            titleStyle={{
              padding: "3px 6px",
              fontSize: 16,
            }}
            onClose={onClose}
            Left={
              title && (
                <Divider
                  orientation="vertical"
                  style={{
                    height: 20,
                    width: 2,
                    backgroundColor: "#124590",
                  }}
                />
              )
            }
          >
            {HeaderComponent && <HeaderComponent />}
          </EvoHNavBox>
        </Card>
      )}

      <CustomContent {...props} style={contentStyle} />

      {FooterComponent && (
        <Box style={{ padding: "10px", borderTop: "1px solid lightgrey" }}>
          <EvoHNavBox>
            <FooterComponent />
          </EvoHNavBox>
        </Box>
      )}
    </Paper>
  );
};
