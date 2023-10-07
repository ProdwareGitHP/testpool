import { default as React, useContext } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

import { EvoButton } from "../../../components/EvoButton";
import { submitPersonTimesheet } from "../../../services/api";
import { PanelContext } from "../../../components/CustomContent/context";

function SubmitButton({ apprStatus, selectedRows, refetchList,resetSelectedRows }) {
  const { userId, startDate, endDate } = useSelector(
    (state) => state.commonReducer
  );

  const { setLoading, setSnakeBar } = useContext(PanelContext);

  const { mutate: submitPersonTimesheetMutate } = useMutation(
    submitPersonTimesheet,
    {
      onSuccess: (data) => {
        refetchList();
        resetSelectedRows()
        setSnakeBar({
          msz: data.data.data,
          type: "success",
        });
      },
      onError: (data) => {
        if (data && data.message) {
          setSnakeBar({
            msz: data.message,
            type: "error",
          });
        }
        if (data && data.response) {
          setSnakeBar({
            msz: data.response.data.status.description,
            type: "error",
          });
        }
      },
      onSettled: () => setLoading(false),
      onMutate: () => setLoading(true),
    }
  );

  const submitTimesheet = () => {
    var idArr = Array.from(selectedRows);
    if (idArr.length === 0) {
      setSnakeBar({
        msz: "Please select row(s).",
        type: "warning",
      });
      return;
    }

    submitPersonTimesheetMutate({
      personIds: idArr,
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    !apprStatus && (
      <EvoButton btnText="Submit TimeSheet(s)" onClick={submitTimesheet} />
    )
  );
}

export default SubmitButton;
