import GroupsIcon from "@mui/icons-material/Groups";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../redux/commonSlice";
import { isPreviousURLMatched } from "../utils/commonService";
import { CustomFilterModal } from "./CustomFilterModal";
import { EvoHBox } from "./EvoBox";
import { EvoButton } from "./EvoButton";

const template = {
  btnName: "Select Scheduler Profile",
  methodName: "useProfileList",
  filterKey: "profileName",
  filterId: "profileName",
  columns: [
    {
      key: "profileName",
      name: "Profile",
      width: 120,
    },
    {
      key: "approver",
      name: "Employee(s)",
      width: 150,
      excludeFromSearch: true,
    },
    {
      key: "centralTeam",

      name: "Central Team",
      width: 250,
      excludeFromSearch: true,
    },
    {
      key: "role",
      name: "Role",
      width: 120,
      excludeFromSearch: true,
    },
  ],
  // rows: [
  //   {
  //     profileId: 3038,
  //     profileName: "Nursing",
  //     role: "Creator",
  //   },
  //   {
  //     profileId: 3039,
  //     profileName: "Technicians",
  //     role: "Creator",
  //   },
  // ],
};

const ProfileSelector = (props) => {
  const { managerFlag } = props;

  const commonReducer = useSelector((state) => state.commonReducer);
  const isLineManager = ["", undefined].includes(
    commonReducer?.selectedProjectObjTeam?.profileName
  );
  const [project, setProject] = useState(false);
  const dispatch = new useDispatch();

  const selectprojectclickhandler = () => {
    setProject(true);
  };

  const resetSelectedProfile = () => {
    dispatch(
      updateState({
        selectedProjectObjTeam: {},
      })
    );
  };

  useEffect(() => {
    if (!isPreviousURLMatched(commonReducer)) {
      const key = "previous_url";
      var currentPath = window.location.origin + window.location.pathname;
      if (managerFlag) {
        dispatch(
          updateState({ [key]: currentPath, selectedProjectObjTeam: {} })
        );
      } else {
        dispatch(updateState({ [key]: currentPath, selectedProjectObj: {} }));
      }
    }
  }, []);

  const handleProfileChange = (profile) => {
    managerFlag
      ? dispatch(updateState({ selectedProjectObjTeam: profile }))
      : dispatch(updateState({ selectedProjectObj: profile }));
    setProject(false);
  };

  return (
    <>
      <EvoHBox>
        {resetSelectedProfile && managerFlag && (
          <EvoButton
            btnText="Line Manager"
            variant={isLineManager ? "contained" : "outlined"}
            onClick={resetSelectedProfile}
            startIcon={<GroupsIcon />}
          />
        )}

        {selectprojectclickhandler && (
          <EvoButton
            btnText="Select Profile"
            variant={isLineManager ? "outlined" : "contained"}
            onClick={selectprojectclickhandler}
            startIcon={<WidgetsIcon />}
          />
        )}
        <Typography
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
            fontWeight: "800",
          }}
        >
          {managerFlag
            ? Object.keys(commonReducer.selectedProjectObjTeam).length > 0
              ? commonReducer?.selectedProjectObjTeam?.profileName + " "
              : ""
            : commonReducer?.selectedProjectObj?.profileName
            ? commonReducer?.selectedProjectObj?.profileName + " "
            : ""}
        </Typography>
      </EvoHBox>

      {project && (
        <CustomFilterModal
          modalData={{ ...template}}
          onSelect={handleProfileChange}
          togglerhandler={setProject}
          type="searchBox"
        />
      )}
    </>
  );
};
export default ProfileSelector;
