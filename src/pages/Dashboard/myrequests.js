import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomPanel } from "../../components/CustomPanel";
import RequestCreator from "../Staff/team/RequestCreator";
import data from "./myrequests.json";

const Index = () => {
  const { employeeId } = useSelector((state) => state.commonReducer);

  console.log(data);

  const [requestData, setRequestData] = useState(data.data);
  const [requestModal, setRequestModal] = useState(false);

  const togglerhandler = () => {
    setRequestModal((prev) => !prev);
  };

  return (
    <>
      <CustomPanel
        title="My Requests"
      >
        <RequestCreator userid={employeeId} person={{ personId: employeeId }} />
      </CustomPanel>
    </>
  );
};

export default Index;

 
