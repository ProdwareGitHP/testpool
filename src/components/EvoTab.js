import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { EvoHBox, EvoVBox } from "./EvoBox";
import { Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
  };
}

export default function EvoTab({
  tabsData,
  title,
  RightComponent,
  value,
  setValue,
}) {
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <EvoHBox gap={3}>
          {title && (
            <Typography style={{ fontSize: 15, fontWeight: "bold" }}>
              {title}
            </Typography>
          )}
          <Tabs value={value} onChange={handleChange}>
            {tabsData.map((tab, index) => (
              <Tab
                label={tab.title}
                {...a11yProps(index)}
                style={{ textTransform: "none" }}
              />
            ))}
          </Tabs>
          <Box style={{ flex: 1 }} />
          {RightComponent && <RightComponent />}
        </EvoHBox>
      </Box>
      {tabsData.map((tab, index) => {
        const { Content } = tab;
        return (
          <TabPanel value={value} index={index}>
            <EvoVBox divider style={{ paddingTop: "8px" }}>
              <Content />
            </EvoVBox>
          </TabPanel>
        );
      })}
    </Box>
  );
}
