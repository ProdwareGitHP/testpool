import UploadFileIcon from "@mui/icons-material/UploadFile";
import React from "react";
import { EvoButton } from "../EvoButton";
import HandleExport from "./HandleExport";

const ExportButton = ({ gridElement, fileName }) => {
  return (
    <EvoButton
      btnText="Export To Excel"
      variant="outlined"
      startIcon={<UploadFileIcon />}
      onClick={() => HandleExport(gridElement, fileName)}
    />
  );
};

export default ExportButton;
