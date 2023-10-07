import HomeIcon from "@mui/icons-material/Home";
import { Box, Grid, Popover, Typography } from "@mui/material";
import { groupBy } from "lodash-es";
import React from "react";

import LanIcon from "@mui/icons-material/Lan";
import { useSelector } from "react-redux";
import { AppVersion } from "./AppVersion";
import { EvoHBox } from "./EvoBox";
import EvoLink from "./EvoButton/link";

const MenuItem = ({ text, link, Icon, onClick }) => {
  return (
    <EvoHBox gap={0.1} >
      {Icon && (
        <Icon
          style={{
            fontSize: "18px",
            color: "#124590",
          }}
        />
      )}

      {!Icon && (
        <Box
          style={{
            width: "20px",
          }}
        ></Box>
      )}

      {link ? (
        <EvoLink
          to={"/" + link}
          onClick={onClick}
        >
          {text}
        </EvoLink>
      ) : (
        <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
          {text}
        </Typography>
      )}
    </EvoHBox>
  );
};

const homeMenu = [
  {
    groupName: "Home",
    taskName: "Dashboard",
    taskCode: "Dashboard",
  },
  {
    groupName: "Home",
    taskName: "Notifications",
    taskCode: "Notifications",
  },
  {
    groupName: "Home",
    taskName: "Web CheckIn",
    taskCode: "WebCheckIn",
  },
];

const MenuPopover = (props) => {
  const { anchorEl, handleCloseMenu } = props;

  const groupedData = useSelector((state) =>
    groupBy([...homeMenu, ...state.commonReducer.menuData], "groupName")
  );

  return (
    <Popover
      id={Boolean(anchorEl) ? "simple-popover" : undefined}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box style={{ margin: "15px", marginBottom: 0 }}>
        <Grid container direction="column" style={{ height: 300, width: 650 }}>
          {Object.entries(groupedData).map((menuGroup) => (
            <Grid style={{ marginBottom: "12px" }}>
              <MenuItem text={menuGroup[0]} Icon={LanIcon}  onClick={handleCloseMenu}/>
              {menuGroup[1].map((option) => (
                <MenuItem text={option.taskName} link={option.taskCode} onClick={handleCloseMenu}/>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
      <AppVersion />
    </Popover>
  );
};

export default MenuPopover;
