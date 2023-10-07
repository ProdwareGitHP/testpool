import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useSelector } from "react-redux";

import { EvoButton } from "./EvoButton";
import ProfilePopover from "./ProfilePopover";

export const ProfileButton = () => {
  const { userName } = useSelector((state) => state.commonReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <EvoButton
        variant="outlined"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<PersonIcon />}
        btnText={userName}
      />

      <ProfilePopover
        anchorEl={anchorEl}
        handleCloseMenu={() => setAnchorEl(null)}
      />
    </>
  );
};
