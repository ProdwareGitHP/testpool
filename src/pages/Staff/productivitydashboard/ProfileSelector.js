import { useState, useEffect } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "../../../redux/commonSlice";
import { EvoButton } from "../../../components/EvoButton";

// import Loader from "./Loader";

const ProfileSelector = (props) => {
  const {
    classes,
    title,
    isLoading,
    resetSelectedProfile,
    selectprojectclickhandler,
  } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const profileName = commonReducer?.selectedProjectObjTeam?.profileName;
  const isLineManager = ["", undefined].includes(profileName);
  const dispatch = new useDispatch();
  useEffect(() => {
    const key = "previous_url";
    var currentPath = window.location.origin + window.location.pathname;
    if (key in commonReducer) {
      if (commonReducer[key] !== currentPath) {
        dispatch(
          updateState({ [key]: currentPath, selectedProjectObjTeam: {} })
        );
      }
    }
  }, []);
  return (
    <>
      <Stack flexDirection="row" gap={3} mb={1}>
        <Typography component={"div"} className={classes.projectTitle}>
          {title}
        </Typography>
        {/* <Loader isLoading={isLoading} /> */}
      </Stack>

      <Stack flexDirection="row" gap={1} alignItems="baseline">
        {resetSelectedProfile && (
          <EvoButton
            btnText="Line Manager"
            //variant="contained"
            onClick={resetSelectedProfile}
            // className={isLineManager ? classes.selectedButton : ""}
            // btnClass={{
            //   backgroundColor: "#124590",
            //   color: "#fff",
            //   fontSize: "12px",
            // }}
          />
        )}
        {selectprojectclickhandler && (
          <EvoButton
            btnText="select Profile"
            //variant="contained"
            onClick={selectprojectclickhandler}
            // className={!isLineManager ? classes.selectedButton : ""}
            // btnClass={{
            //   backgroundColor: "#124590",
            //   color: "#fff",
            //   fontSize: "12px",
            // }}
          />
        )}
        {Object.keys(commonReducer.selectedProjectObjTeam).length > 0 && (
          <Typography className={classes.projectname}>
            {" "}
            {commonReducer.selectedProjectObjTeam.profileName}{" "}
          </Typography>
        )}
      </Stack>
    </>
  );
};
export default ProfileSelector;
