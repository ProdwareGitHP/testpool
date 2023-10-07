import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { EvoHBox } from "./EvoBox";
import { LogoBox } from "./LogoBox";
import { MenuButton } from "./MenuButton";
import { ProfileButton } from "./ProfileButton";
import { RefreshButton } from "./RefreshButton";

export const Header = () => {
  return (
    <Box style={{ height: "64px" }}>
      <AppBar color="secondary">
        <Toolbar>
          <MenuButton />
          <Link to={"/Dashboard"}>
            <LogoBox />
          </Link>
          <Box style={{ flex: 1 }}></Box>
          <EvoHBox>
            <ProfileButton />
            <RefreshButton />
          </EvoHBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
