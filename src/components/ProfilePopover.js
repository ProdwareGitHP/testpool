import { MenuItem, Popover } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { resetState } from "../redux/commonSlice";
// import { useNavigate } from "react-router-dom";
//import { updateToken } from "../../services/axios";

const ProfilePopover = (props) => {
  const dispatch = useDispatch();
  const { anchorEl, handleCloseMenu } = props;

  const onLogout = () => {
    dispatch(resetState());
    //updateToken("");
    //navigate("/", { replace: true });
  };

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
      <MenuItem style={{ fontSize: "14px" }} onClick={onLogout}>
        Logout
      </MenuItem>
    </Popover>
  );
};

export default ProfilePopover;
