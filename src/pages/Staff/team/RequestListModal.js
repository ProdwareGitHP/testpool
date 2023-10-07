import React, { useState } from "react";

import { CustomDialog } from "../../../components/CustomDialog";
import { useGetRequestList } from "../../../services/team";
import RequestCreator from "./RequestCreator";

export const RequestListModal = (props) => {
  const { togglerHandler, oriPagedata, person } = props;

  const [snakeBarProps, setSnakeBarProps] = useState({});

  const {
    data: requestData,
    isLoading,
    refetch,
  } = useGetRequestList({
    personId: person?.personId,
  });

  return (
    <>
      <CustomDialog
        title={`Requests (${person.personName})`}
        open="true"
        isLoading={isLoading}
        handleClose={togglerHandler}
        snakeBarProps={snakeBarProps}
      >
        <RequestCreator
          userid={person?.personId}
          person={person}
          setSnakeBarProps={setSnakeBarProps}
        />
      </CustomDialog>
    </>
  );
};
