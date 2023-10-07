import AddIcon from "@mui/icons-material/Add";
import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import EvoDatePicker from "../../../components/EvoDateTime/date";
import { useMutation, useQuery, useQueries } from "react-query";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoButton } from "../../../components/EvoButton";
import ProgressLoader from "../../../components/Loader";
import { CustomTextField } from "../../../components/TextField";
import {
  useGetProfileCriteriaById,
  useScheduleUserData,
  useGetInitialData,
} from "../../../services/accesscontrol";
import {
  deleteManageProfile,
  submitManageSchedulerProfile,
  updateManageSchedulerProfile,
} from "../../../services/api";

import { EvoDataForm } from "../../../components/EvoDataForm";
import EvoDataGrid from "../../../components/EvoDataGrid";
import DeleteModal from "../../../components/DeleteModal";
import {
  generateAddUserRow,
  generateApiError,
  generateColumnsAddUser,
  generateColumnsProfileCriteria,
  generateProfileCriteriaRow,
  generateSnakeBarProps,
  generateUserRolePayload,
  generateProfileCriteriaPayload,
  prepopulateUserType,
  generateEditedProfileCriteria,
  generateEditedUserRows,
} from "./utils";
import { dateConverter } from "../../../utils/commonService";
import getTemplate from "../../../components/getTemplate";
import { EvoHBox } from "../../../components/EvoBox";

const ManageProfileModal = (props) => {
  const { handleClose, editData, getAllProjectRefetch, setErrorProps } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [profileCriteriaRows, setProfileCriteriaRows] = useState([]);
  const [addUserRows, setAddUserRows] = useState([]);
  const [profileName, setProfileName] = useState(
    editData == undefined ? "" : editData?.profileName
  );
  const [startDate, setStartDate] = useState(
    editData == undefined
      ? null
      : new Date(moment(editData?.startDate).format("DD-MMM-YYYY"))
  );
  const [endDate, setEndDate] = useState(
    editData == undefined
      ? null
      : new Date(moment(editData?.endDate).format("DD-MMM-YYYY"))
  );
  const [userRemovalListFromBE, setUserRemovalListFromBE] = useState([]);

  const [snakeBarProps, setSnakeBarProps] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const startDateChange = (effectiveDatevalue) => {
    setStartDate(effectiveDatevalue);
  };
  const endDateChange = (effectiveDatevalue) => {
    setEndDate(effectiveDatevalue);
  };
  const deleteProfilePopUp = () => {
    setOpenDeleteModal(true);
  };

  const { isLoadingCombined, responses: combinedRes } = useGetInitialData();

  const {
    data: profileCriteriaResOnEdit,
    isLoading: Loading1,
    isFetching,
  } = useGetProfileCriteriaById({
    id: editData?.profileId,
  });
  const { data: usersListResOnEdit, isLoading: Loading2 } = useScheduleUserData(
    {
      profileId: editData?.profileId,
    }
  );

  useEffect(() => {
    if (profileCriteriaResOnEdit && editData) {
      setProfileCriteriaRows(profileCriteriaResOnEdit);
    }
  }, [profileCriteriaResOnEdit, editData]);

  useEffect(() => {
    if (!editData || !usersListResOnEdit) return;
    setAddUserRows(generateEditedUserRows(usersListResOnEdit));
  }, [usersListResOnEdit, editData]);

  //Api for save
  const { mutate: createManageScheduler, isLoading: isLoadingOnSave } =
    useMutation(submitManageSchedulerProfile, {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    });

  const onSuccessCreateRequest = (data, context) => {
    if (data) {
      getAllProjectRefetch();
      handleClose();
      setErrorProps({
        type: "success",
        msz: `${context.profileName} is saved`,
      });
    }
    // setIsLoadingBut(false);
  };

  // getProfileCriteriaById
  const onErrorCreateRequest = (error) => {
    setSnakeBarProps(generateApiError(error));
  };

  const saveHandler = () => {
    if (!profileName) {
      setSnakeBarProps(generateSnakeBarProps["VALID_PROFILE"]);
      return;
    }

    if (!startDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_START_DATE"]);
      return;
    }

    if (!endDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_END_DATE"]);
      return;
    }

    if (startDate > endDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_DATE"]);
      return;
    }
    let pdata = {
      profileName: profileName,
      startDate: dateConverter(startDate),
      endDate: dateConverter(endDate),
      createdBy: commonReducer.userId,
      lastUpdatedBy: commonReducer.userId,
      userRoleDetails: generateUserRolePayload(addUserRows),
      userProfileCriteriaDetails:
        generateProfileCriteriaPayload(profileCriteriaRows),
    };
    createManageScheduler(pdata);
  };

  // Api for update profile
  const { mutate: updateManageScheduler, isLoading: isLoadinOnUpdate } =
    useMutation(updateManageSchedulerProfile, {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context),
      onError: (data, context, variables) => onErrorUpdateRequest(data),
    });
  const onSuccessUpdateRequest = (data, context) => {
    if (data) {
      getAllProjectRefetch();
      handleClose();
      setErrorProps({
        msz: `${editData.profileName} is Updated.`,
        type: "success",
      });
    }
  };
  const onErrorUpdateRequest = (error) => {};

  const updateHandler = () => {
    if (!profileName) {
      setSnakeBarProps(generateSnakeBarProps["VALID_PROFILE"]);
      return;
    }

    if (!startDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_START_DATE"]);
      return;
    }

    if (!endDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_END_DATE"]);
      return;
    }

    if (startDate > endDate) {
      setSnakeBarProps(generateSnakeBarProps["VALID_DATE"]);
      return;
    }
    let pdata = {
      profileId: editData?.profileId,
      profileName: profileName,
      startDate: dateConverter(startDate),
      endDate: dateConverter(endDate),
      createdBy: commonReducer.userId,
      lastUpdatedBy: commonReducer.userId,
      userRoleDetails: generateUserRolePayload(addUserRows),
      userProfileCriteriaDetails:
        generateProfileCriteriaPayload(profileCriteriaRows),
    };
    updateManageScheduler(pdata);
  };

  // Api for delete
  const { mutate: deleteProfile, isLoading: isLoadingOnDelete } = useMutation(
    deleteManageProfile,
    {
      onSuccess: (data, context) => onSuccessDeleteRequest(data, context),
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context),
    }
  );

  const onSuccessDeleteRequest = (data, context) => {
    if (data) {
      getAllProjectRefetch();
      handleClose();
      setErrorProps({
        msz: `${editData.profileName} is Deleted`,
        type: "success",
      });
      setOpenDeleteModal(false);
    }
  };

  const onErrorDeleteRequest = (error) => {
    if (error) {
      setSnakeBarProps(generateApiError(error));

      setOpenDeleteModal(false);
      handleClose();
    }
  };

  const deleteManagerProfile = () => {
    let pData = {
      id: editData?.profileId,
    };
    deleteProfile(pData);
  };

  const formData = {
    gap: 3,
    labelWidth: 100,
    direction: "column",
    sections: [
      {
        sectionName: "Profile",
        items: [
          {
            label: "Profile",
            value: profileName,
            required: true,
            width: 250,
            onChange: (e) => setProfileName(e.target.value),
          },
          {
            label: "Start Date",
            value: startDate,
            required: true,
            type: "date",
            onChange: startDateChange,
            styles: { width: 130, justifyContent: "end" },
          },
          {
            label: "End Date",
            value: endDate,
            required: true,
            type: "date",
            onChange: endDateChange,
            styles: { width: 130, justifyContent: "end" },
          },
        ],
      },
    ],
  };

  const profileCriteriaAddRowHandler = () => {
    const abc = [...profileCriteriaRows];
    abc.push({
      index: profileCriteriaRows?.length,
      personId: "",
      fullName: "",
      jobId: "",
      jobTitle: "",
      jobFamily: "",
      employeeCategory: "",
      departmentName: "",
      departmentId: "",
      businessUnit: "",
      subDepartmentId: "",
      nationName: "",
      legalEntity: "",
      payroll: "",
      shiftType: "",
      employeeType: "",
      gender: "",
      religion: "",
      nationality: "",
      includeExcludeFag: "Include",
      hierarchyLevel: "0",
    });
    setProfileCriteriaRows(abc);
  };
  useEffect(() => {
    if (editData === undefined || profileCriteriaResOnEdit?.length === 0) {
      profileCriteriaAddRowHandler();
    }
  }, [editData, profileCriteriaResOnEdit]);
  const updateArr = (index, arr) => {
    var newArr = [...profileCriteriaRows];
    if (newArr && newArr.length) {
      arr.map((item) => {
        newArr[index][item.key] = item.newValue ? item.newValue : "";
      });

      setProfileCriteriaRows(newArr);
    }
  };
  const employeeSelector = (arr) => {
    var res = arr.map((item) => {
      return { personId: item.personId + "", fullName: item.fullName };
    });
    return res;
  };
  const employeeTemplate = () => {
    return getTemplate("USER_TEMPLATE", {}, employeeSelector);
  };
  const jobTitleSelector = (arr) => {
    var res = arr.map((item) => {
      return { jobTitleId: item.jobTitleId + "", jobTitle: item.jobTitle };
    });
    return res;
  };

  const handleChangeEmployee = (item, index) => {
    const arr = [
      {
        key: "personId",
        newValue: item["personId"],
      },
      {
        key: "fullName",
        newValue: item["fullName"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeJobTitle = (item, index) => {
    const arr = [
      {
        key: "jobId",
        newValue: item["jobTitleId"],
      },
      {
        key: "jobTitle",
        newValue: item["jobTitle"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeCategory = (item, index) => {
    const arr = [
      {
        key: "employeeCategory",
        newValue: item["employeeCategory"],
      },
      {
        key: "meaning",
        newValue: item["meaning"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeSubDepartment = (item, index) => {
    const arr = [
      {
        key: "subDepartmentId",
        newValue: item["subDepartmentId"],
      },
      {
        key: "subDepartmentName",
        newValue: item["subDepartmentName"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeDepartment = (item, index) => {
    const arr = [
      {
        key: "departmentId",
        newValue: item["departmentId"],
      },
      {
        key: "departmentName",
        newValue: item["departmentName"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeNationality = (item, index) => {
    const arr = [
      {
        key: "legislationCode",
        newValue: item["nationality"],
      },
      {
        key: "meaning",
        newValue: item["nationName"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeHeirarchyLevel = (item, index) => {
    const arr = [
      {
        key: "hierarchyLevel",
        newValue: item,
      },
    ];

    updateArr(index, arr);
  };

  const userAddRowHandler = () => {
    const index = addUserRows.length;
    setAddUserRows([...addUserRows, { ...generateAddUserRow(), index }]);
  };

  const HeaderComponentProfile = () => (
    <EvoButton
      btnText="New"
      startIcon={<AddIcon />}
      onClick={() => profileCriteriaAddRowHandler(true)}
    />
  );

  const HeaderComponentAddUser = () => (
    <EvoButton
      btnText="New"
      startIcon={<AddIcon />}
      onClick={() => userAddRowHandler(true)}
    />
  );

  const onChangeProfileCriteria = (selectedObj, index, key, fullDataKey) => {
    setProfileCriteriaRows(
      profileCriteriaRows.map((el, i) => {
        if (i === index) {
          return { ...el, [key]: selectedObj[key], [fullDataKey]: selectedObj };
        }
        return el;
      })
    );
  };

  const deleteProfileCriteria = (index) => {
    const dat = [...profileCriteriaRows];
    dat.splice(index, 1);
    setProfileCriteriaRows(dat.map((el, i) => ({ ...el, index: i })));
    if (editData) {
      const newDeleteListForBE = [
        ...userRemovalListFromBE,
        profileCriteriaRows[index],
      ];
      setUserRemovalListFromBE(newDeleteListForBE);
    }
  };

  const onChangeAddUserCol = (item, index) => {
    var newArr = [...addUserRows];
    newArr[index].fullName = item.fullName || "";
    newArr[index].userId = item.userId || "";
    setAddUserRows(newArr);
  };

  const onSelectDropdown = (index, data) => {
    const value = data.userType;
    setAddUserRows(
      addUserRows.map((el, i) => {
        if (i === index) return { ...el, userType: value };
        return el;
      })
    );
  };

  const onSelectDropdownProfileCriteria = (index, data) => {
    setProfileCriteriaRows(
      profileCriteriaRows.map((el, i) => {
        if (i === index) return { ...el, ...data };
        return el;
      })
    );
  };

  const handleChangeCheck = (index, key, type) => {
    setAddUserRows(
      addUserRows.map((el, i) => {
        if (i === index) return { ...el, [key]: type };
        return el;
      })
    );
  };

  const onDeleteAddUser = (index) => {
    const dat = [...addUserRows];
    dat.splice(index, 1);
    setAddUserRows(dat.map((el, i) => ({ ...el, index: i })));
    if (editData) {
      const newDeleteListForBE = [...userRemovalListFromBE, addUserRows[index]];
      setUserRemovalListFromBE(newDeleteListForBE);
    }
  };

  return (
    <>
      <CustomDialog
        maxWidth="lg"
        open={true}
        title="Profile"
        handleClose={handleClose}
        actions={
          editData === undefined
            ? { onSave: saveHandler, onCancel: handleClose }
            : {
                onSave: updateHandler,
                onDelete: deleteProfilePopUp,
                onCancel: handleClose,
              }
        }
        isLoading={
          isLoadingOnSave ||
          isLoadinOnUpdate ||
          isLoadingCombined ||
          Loading1 ||
          Loading2 ||
          isFetching
        }
        snakeBarProps={snakeBarProps}
      >
        {/* should use EvoHBox as shown below, but for not EvoHBox giving some UI issues*/}
        <Grid style={styles.formContainer}>
          {/* <EvoHBox> */}
          <EvoHBox style={{ marginTop: 2 }}>
            <EvoDataForm formData={formData} />
          </EvoHBox>
          <EvoDataGrid
            columns={generateColumnsAddUser(
              onChangeAddUserCol,
              onSelectDropdown,
              handleChangeCheck,
              onDeleteAddUser
            )}
            rows={addUserRows}
            title={"Add User In Profile"}
            HeaderComponent={HeaderComponentAddUser}
            tableLabel="Add User"
          />
          {/* </EvoHBox> */}
        </Grid>

        <EvoDataGrid
          columns={generateColumnsProfileCriteria({
            onChangeProfileCriteria,
            employeeTemplate,
            jobTitleSelector,
            handleChangeJobTitle,
            handleChangeEmployee,
            handleChangeCategory,
            handleChangeSubDepartment,
            deleteProfileCriteria,
            handleChangeDepartment,
            handleChangeHeirarchyLevel,
            handleChangeNationality,
            combinedRes,
            onSelectDropdownProfileCriteria,
          })}
          rows={profileCriteriaRows}
          title={"Profile Criteria"}
          tableLabel="Profile Criteria"
          HeaderComponent={HeaderComponentProfile}
        />
      </CustomDialog>

      {openDeleteModal && (
        <DeleteModal
          title="Delete"
          onDelete={deleteManagerProfile}
          isLoading={isLoadingOnDelete}
          toggleHandler={setOpenDeleteModal}
          text={editData?.profileName}
        />
      )}
    </>
  );
};

const styles = {
  formContainer: { display: "flex", flexDirection: "row", gap: "20px" },
};

export default ManageProfileModal;
