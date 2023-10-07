import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moduleSelector } from "../pages/allModules";
import { updateState } from "../redux/commonSlice";
import { useDynamicUserMenu } from "../services/api.hooks";

import MenuPopOver from "./MenuPopOver";

export const MenuButton = () => {
  const classes = makeStyles(() => ({
    grid4: {
      cursor: "pointer",
      verticalAlign: "middle",
      color: "black",
      height: 40,
      width: 40,
    },
  }))();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = new useDispatch();
  const { userId } = useSelector((state) => state.commonReducer);
  const { data: menuData, isLoading } = useDynamicUserMenu(
    {
      userId: userId,
    },
    moduleSelector
  );

  if (menuData) {
    dispatch(updateState({ menuData }));
  }

  return (
    <>
      <IconButton
        sx={{ "&:hover": { color: "#124590" } }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className={classes.grid4}
      >
        <MenuIcon />
      </IconButton>

      <MenuPopOver
        anchorEl={anchorEl}
        handleCloseMenu={() => setAnchorEl(null)}
      />
    </>
  );
};
