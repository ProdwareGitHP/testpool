import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import React from "react";
import { CustomTextField } from ".";

export const PasswordTextField = (props) => {
  const { value, onChange } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CustomTextField
      type={showPassword ? "text" : "password"}
      value={value}
      width="100%"
      onChange={onChange}
      endIconButton={
        showPassword ? (
          <VisibilityOff onClick={handleClickShowPassword} />
        ) : (
          <Visibility onClick={handleClickShowPassword} />
        )
      }
    />
  );
};
