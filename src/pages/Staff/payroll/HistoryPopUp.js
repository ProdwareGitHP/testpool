import { CustomDialog } from "../../../components/CustomDialog";
import History from "./History";
import React from "react";

const HistoryPopUp = (props) => {
  const { handleClose, data } = props;
  const title = "History";

  return (
    <CustomDialog
      title={title}
      handleClose={handleClose}
      open="true"
      maxWidth="md"
    >
      <History data={data} />
    </CustomDialog>
  );
};

export default HistoryPopUp;
