import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../redux/commonSlice";
import {
  updatePreviousURL,
  isPreviousURLMatched,
  resetDate,
} from "../utils/commonService";
import { CustomPanel } from "./CustomPanel";
import ProfileSelector from "./ProfileSelector";

export const CustomPage = (props) => {
  const dispatch = new useDispatch();
  const commonReducer = useSelector((state) => state.commonReducer);
  useEffect(() => {
    document.title = props.title;
    if (!isPreviousURLMatched(commonReducer)) {
      resetDate(dispatch, updateState);
    }

    updatePreviousURL(dispatch, updateState);
  }, []);

  const HeaderComponent = props.profileSelector
    ? () => <ProfileSelector managerFlag={props.profileSelector.managerFlag} />
    : null;

  return (
    <CustomPanel
      HeaderComponent={HeaderComponent}      
      {...props}
      contentStyle={{ minHeight: "calc(100vh - 140px)", padding: "8px 15px" }}
    />
  );
};
