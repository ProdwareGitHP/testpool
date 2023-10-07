import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { CustomDialog } from "../.././components/CustomDialog";
import { EvoButton } from "../../components/EvoButton";
import moment from "moment";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { EvoDataForm } from "../../components/EvoDataForm";
import EvoDataGrid from "../../components/EvoDataGrid";
import {
  createDemandTemplate,
  getJobTitleById,
  updateDemandTemplate,
} from "../../services/api";
import {
  useBussinessUnitData,
  useGetCitizenData,
  useGetDemandTemplateById,
  useGetDepartmentById,
  useGetEmployeeTypes,
} from "../../services/rosterapi";
import {
  checkValidations,
  dateConverter,
  useGetOperations,
} from "../../utils/commonService";
import getTemplate from "../../components/getTemplate";
import getTableColumns from "./getTableColumns";

const DemTempEdit = (props) => {
  const {
    handleClose,
    editData,
    setSnakeBarPropsLandingPage,
    refetchDemandTemplates,
  } = props;

  const [snakeBarPropsDemandTemplate, setSnakeBarPropsDemandTemplate] =
    useState({});

  const isCopyOperation = "demandTemplateIdToCopy" in editData;
  const { isCreateOperation, isUpdateOperation } = useGetOperations({
    params: editData,
    key: "demandTemplateId",
  });
  const [profile, setProfile] = useState({
    profileId: editData.profileId,
    profileName: editData.profile,
  });

  const [templateName, setTemplateName] = useState(editData.demandTemplateName);
  const [demandTemplateLines, setDemandTemplateLines] = useState([]);
  const [removedDemandTemplateLines, setRemovedDemandTemplateLines] = useState(
    []
  );
  const [validFrom, setValidFrom] = useState(
    editData.validFrom ? new Date(editData.validFrom) : null
  );
  const [validTo, setValidTo] = React.useState(
    editData.validTo ? new Date(editData.validTo) : null
  );
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const handleAdd = () => {
    const abc = [...demandTemplateLines];
    abc.push({
      index: demandTemplateLines?.length,
      departmentId: "",
      jobTitleId: "",
      fte: "1",
      days: days,
      workDurationId: "",
      workDurationCode: "",
      nationality: "",
      gender: "",
      employeeTypeId: "",
      employeeType: "",
    });
    setDemandTemplateLines(abc);
  };
  const deleteSplitShift = (i) => {
    if (i >= 0) {
      var deleteval = [];
      if (demandTemplateLines.length) {
        deleteval = [...demandTemplateLines];
      }
      // debugger;
      if (deleteval[i].demandLineId) {
        setRemovedDemandTemplateLines((previousValue) => {
          previousValue.push(deleteval[i].demandLineId);
          return [...previousValue];
        });
      }
      deleteval?.splice(i, 1);
      deleteval = deleteval.map((item, index) => {
        return { ...item, index: index };
      });
      setDemandTemplateLines(deleteval);
      setSnakeBarPropsDemandTemplate({
        msz: "Demand Template Line deleted.",
        type: "success",
      });
    }
  };

  useEffect(() => {
    if (profile.profileId && validFrom && validTo) {
      var templateName = `${profile.profileName} (${dateConverter(
        validFrom
      )} to ${dateConverter(validTo)})`;
      setTemplateName(templateName);
    }
  }, [profile, validFrom, validTo]);

  const businessUnitSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return {
          businessId: item.businessUnitId,
          business: item.businessUnitName,
        };
      });
    } else {
      return [];
    }
  };
  const { data: bussinessUnitList } = useBussinessUnitData(
    null,
    businessUnitSelector,
    !demandTemplateLines.length
  );

  const demandTemplateLinesSelector = (data) => {
    const getDaysValue = (value) => (value === "Y" ? true : false);
    var demandTemplateLines = data.demandTemplateLines;
    demandTemplateLines = demandTemplateLines?.map((item, index) => {
      var days = {
        sun: "",
        mon: "",
        tue: "",
        wed: "",
        thu: "",
        fri: "",
        sat: "",
      };
      Object.keys(days).map((day) => {
        days[day] = getDaysValue(item[day]);
      });
      if (isCopyOperation) {
        delete item.demandLineId;
        delete item.demandTemplateId;
      }
      return {
        ...item,
        index: index,
        workDurationCode: item.workDuration,
        departmentId: item.departmentId + "",
        jobTitleId: item.jobTitleId + "",
        businessId: item.businessId + "",
        skill: item.skill + "",
        days,
      };
    });
    data.demandTemplateLines = demandTemplateLines;
    return data;
  };
  const { data: demandTemplate, refetch: refetchDemandTemplatesById } =
    useGetDemandTemplateById(
      {
        id: editData?.demandTemplateId || editData?.demandTemplateIdToCopy,
      },
      demandTemplateLinesSelector,
      true //!isUpdateOperation // only in case of copy operation
    );
  useEffect(() => {
    if (isUpdateOperation || isCopyOperation) {
      refetchDemandTemplatesById();
    } else {
      handleAdd();
    }
  }, []);
  useEffect(() => {
    if (demandTemplate) {
      setDemandTemplateLines(demandTemplate.demandTemplateLines);
      var arr = [];
      demandTemplate.demandTemplateLines.map((item) => {
        if (item?.departmentId) arr.push(item.departmentId);
      });
      initializeUniqueDepartmentIds(arr);
    }
  }, [demandTemplate]);
  const departmentSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return {
          departmentId: item.departmentId,
          department: item.departmentName,
        };
      });
    } else {
      return [];
    }
  };
  const [departmentFlag, setDepartmentFlag] = useState(false);
  useEffect(() => {
    if (
      profile.profileId &&
      demandTemplateLines.length &&
      departmentList === undefined
    ) {
      setDepartmentFlag(true);
    } else {
      setDepartmentFlag(false);
    }
    // debugger;
  }, [profile, demandTemplateLines]);

  const { data: departmentList, isLoading: isLoading2 } = useGetDepartmentById(
    {
      profileId: profile.profileId,
    },
    departmentSelector,
    !departmentFlag
  );

  useEffect(() => {
    if (isProfileChanged) {
      setJobTitlesList({});
      let dupDemandTemplateLines = [...demandTemplateLines];
      dupDemandTemplateLines = dupDemandTemplateLines.map((item) => {
        return {
          ...item,
          departmentId: "",
          department: "",
          jobTitleId: "",
          jobTitle: "",
        };
      });

      setDemandTemplateLines(dupDemandTemplateLines);
      setIsProfileChanged(false);
    }
  }, [isProfileChanged]);

  const { mutateAsync: GetJobTitleByIdMutate, isLoading: isLoading3 } =
    useMutation(getJobTitleById, {
      onSuccess: (data, context, variables) =>
        onSuccessGetJobTitlesRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorGetJobTilesRequest(data, context, variables),
    });
  const [jobTitlesList, setJobTitlesList] = useState({});
  const onSuccessGetJobTitlesRequest = (data, context) => {
    // setJobTitlesList({ ...jobTitlesList, [context.departmentId]: data });
  };
  const onErrorGetJobTilesRequest = (error) => {
    if (error) {
      setSnakeBarPropsLandingPage({
        msz: "Something Went Wrong",
        type: "error",
      });
    }
  };

  const { data: citizenList } = useGetCitizenData(
    null,
    null,
    !demandTemplateLines.length
  );

  const { data: employeeTypesList } = useGetEmployeeTypes(
    null,
    null,
    !demandTemplateLines.length
  );
  //Api for create work Demand template
  const { mutate: createDemandTemplateMutate, isLoading: isLoading1 } =
    useMutation(createDemandTemplate, {
      onSuccess: (data, context, variables) =>
        onSuccessCreateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorCreateRequest(data, context, variables),
    });
  const onSuccessCreateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Demand Template Saved",
        type: "success",
      });
      handleClose();
      refetchDemandTemplates();
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error) {
      setSnakeBarPropsLandingPage({
        msz: "Something Went Wrong",
        type: "error",
      });
      handleClose();
      refetchDemandTemplates();
    }
  };

  //  Validations on update method
  const validateOnSaveUpdate = () => {
    const validations = [
      {
        msz: "Please enter the Profile!",
        type: "error",
        isMatch: profile.profileName === "",
      },
      {
        msz: "Please enter the Valid From!",
        type: "error",
        isMatch: validFrom === null,
      },
      {
        msz: "Please enter the Valid To!",
        type: "error",
        isMatch: validTo === null,
      },
      {
        msz: "Valid To is not less than Valid From   !",
        type: "error",
        isMatch: validTo < validFrom,
      },
      // {
      //   msz: "Please add atleast one row",
      //   type: "error",
      //   isMatch: demandTemplateLines.length === 0,
      // },
    ];
    var extraValidations = [];
    for (let i = 0; i < demandTemplateLines?.length; i++) {
      extraValidations.push({
        msz: "Department is required!",
        type: "error",
        isMatch: demandTemplateLines[i]?.departmentId === "",
      });
      extraValidations.push({
        msz: "Job Title is required!",
        type: "error",
        isMatch: demandTemplateLines[i]?.jobTitleId === "",
      });
      extraValidations.push({
        msz: "Work Duration is required!",
        type: "error",
        isMatch: demandTemplateLines[i]?.workDurationId === "",
      });
      extraValidations.push({
        msz: "FTE  is required!",
        type: "error",
        isMatch:
          demandTemplateLines[i]?.fte === "" || demandTemplateLines[i]?.fte < 0,
      });

      extraValidations.push({
        msz: "FTE should be a number!",
        type: "error",
        isMatch: isNaN(demandTemplateLines[i]?.fte),
      });
    }
    var res = checkValidations({
      validations: [...validations, ...extraValidations],
      setSnakeBarProps: setSnakeBarPropsDemandTemplate,
    });
    return res;
  };
  const OPTIONS = {
    SAVE: "SAVE",
    UPDATE: "UPDATE",
  };
  const tranformPayload = (key) => {
    var dupDemandTemplates = [];
    console.log(demandTemplateLines);
    demandTemplateLines.map((item) => {
      var dupDays = {};
      Object.keys(item.days).map((day) => {
        dupDays[day] = item.days[day] === true ? "Y" : "N";
      });

      var mockData = {
        departmentId: parseInt(item.departmentId),
        department: item.department,
        jobTitleId: parseInt(item.jobTitleId),
        jobTitle: item.jobTitleName || item.jobTitle,
        workDurationId: item.workDurationId,
        workDuration: item.workDurationCode,
        timeStart: item.timeStart,
        timeend: item.timeend,
        fte: parseInt(item.fte),
        employeeTypeId: parseInt(item.employeeTypeId),
        employeeType: item.employeeType,
        ...dupDays,
        skill: parseInt(item.skill),
        skillName: item.skillName,
        businessId: parseInt(item.businessId),
        business: item.business,
        workLocationId: parseInt(item.workLocationId),
        workLocation: item.workLocation,
        gender: item.gender,
        nationality: item.nationality,
      };
      if (key === OPTIONS.SAVE) {
      } else if (key === OPTIONS.UPDATE) {
        if ("demandLineId" in item) {
          mockData.demandLineId = item?.demandLineId;
        }
        mockData.demandTemplateId = editData?.demandTemplateId;
      }
      dupDemandTemplates.push(mockData);
    });
    return dupDemandTemplates;
  };
  const saveHandler = () => {
    if (validateOnSaveUpdate()) {
      var dupDemandTemplates = tranformPayload(OPTIONS.SAVE);
      var pData = {
        profileId: profile.profileId,
        profile: profile.profileName,
        validFrom: dateConverter(validFrom),
        validTo: dateConverter(validTo),
        templateName: templateName,
        demandTemplateLines: dupDemandTemplates,
      };
      createDemandTemplateMutate(pData);
    }
  };

  const { mutate: updateDemandTemplateMutate } = useMutation(
    updateDemandTemplate,
    {
      onSuccess: (data, context, variables) =>
        onSuccessUpdateRequest(data, context, variables),
      onError: (data, context, variables) =>
        onErrorUpdateRequest(data, context, variables),
    }
  );

  const onSuccessUpdateRequest = (data) => {
    if (data) {
      setSnakeBarPropsLandingPage({
        msz: "Demand Template Saved",
        type: "success",
      });
      handleClose();
      refetchDemandTemplates();
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsLandingPage({
        msz: "Something Went Wrong",
        type: "error",
      });
      handleClose();
      refetchDemandTemplates();
    }
  };

  const updateHandler = () => {
    if (validateOnSaveUpdate()) {
      var dupDemandTemplates = tranformPayload(OPTIONS.UPDATE);
      var pData = {
        demandTemplateId: editData?.demandTemplateId,
        profileId: profile.profileId,
        profile: profile.profileName,
        validFrom: dateConverter(validFrom),
        validTo: dateConverter(validTo),
        templateName: templateName,
        demandTemplateLines: dupDemandTemplates,
        removedDemandTemplateLines: removedDemandTemplateLines
          .toString()
          .split(","),
      };
      updateDemandTemplateMutate(pData);
    }
  };

  const workDurationTemplate = () => {
    return getTemplate(
      "WORK_DURATION_TEMPLATE",
      {},
      workDurationTemplateSelector
    );
  };
  const skillTemplateSelector = (arr) => {
    var res = arr.map((item) => {
      return { skill: item.skillId + "", skillName: item.skill };
    });
    return res;
  };
  const skillTemplate = () => {
    return getTemplate("SKILL_TEMPLATE", {}, skillTemplateSelector);
  };
  const workLocationSelector = (arr) => {
    var res = arr.map((item) => ({
      workLocationId: item.workLocationId,
      workLocation: item.locationName,
    }));
    return res;
  };
  const workLocationTemplate = () => {
    return getTemplate(
      "WORK_LOCATION_TEMPLATE",
      {
        profileId: profile.profileId,
      },
      workLocationSelector
    );
  };

  const getTimeFormat = (value) => {
    return moment(value).format("hh:mm A");
  };

  const workDurationTemplateSelector = (arr) => {
    return arr?.map((item, index) => {
      return {
        ...item,
        index,
        workDurationId: parseInt(item.workDurationId),
        time: `${getTimeFormat(item.timeStart)} - ${getTimeFormat(
          item.timeEnd
        )}`,
      };
    });
  };

  const getDate = (value) => {
    return moment(value).format("hh:mm A");
  };

  const handleChangeWorkDuration = (item, index) => {
    const arr = [
      {
        key: "workDurationCode",
        newValue: Object.keys(item).length ? item["workDurationCode"] : "",
      },
      {
        key: "workDurationId",
        newValue: Object.keys(item).length ? item["workDurationId"] : "",
      },
      {
        key: "timeStart",
        newValue: Object.keys(item).length ? getDate(item["timeStart"]) : "",
      },
      {
        key: "timeend",
        newValue: Object.keys(item).length ? getDate(item["timeEnd"]) : "",
      },
    ];
    updateArr(index, arr);
  };

  const handleChangeSkill = (item, index) => {
    const arr = [
      {
        key: "skillName",
        newValue: item["skillName"],
      },
      {
        key: "skill",
        newValue: item["skill"],
      },
    ];
    updateArr(index, arr);
  };
  const handleChangeBusinessUnit = (index, item) => {
    const arr = [
      { key: "businessId", newValue: item["businessId"] },
      { key: "business", newValue: item["business"] },
    ];
    updateArr(index, arr);
  };

  const handleChangeWorkLocation = (item, index) => {
    const arr = [
      {
        key: "workLocation",
        newValue: Object.keys(item).length ? item["workLocation"] : "",
      },
      {
        key: "workLocationId",
        newValue: Object.keys(item).length ? item["workLocationId"] : "",
      },
    ];
    updateArr(index, arr);
  };
  const updateArr = (index, arr) => {
    var newArr = [...demandTemplateLines];
    if (newArr && newArr.length) {
      arr.map((item) => {
        newArr[index][item.key] = item.newValue ? item.newValue : "";
      });

      setDemandTemplateLines(newArr);
    }
  };
  const [uniqueDepartmentIds, setUniqueDepartmentIds] = useState(new Set());
  const initializeUniqueDepartmentIds = (arr) => {
    setUniqueDepartmentIds(new Set(arr));
  };
  const addDepartmentIds = (departmentId) => {
    setUniqueDepartmentIds((previousValue) =>
      new Set(previousValue).add(departmentId)
    );
  };
  const jobTitles = async (ids) => {
    const res = await GetJobTitleByIdMutate({
      departmentId: ids,
    });
    return res;
  };
  useEffect(() => {
    var obj = { ...jobTitlesList };
    Array.from(uniqueDepartmentIds).map((ids) => {
      if (!(ids in obj)) {
        jobTitles(ids).then((res) => {
          obj[ids] = res;
        });
      }
    });
    setJobTitlesList(obj);
  }, [uniqueDepartmentIds]);

  const handleChangeDepartment = (index, item) => {
    const arr = [
      { key: "department", newValue: item["department"] },
      { key: "departmentId", newValue: item["departmentId"] },
    ];

    updateArr(index, arr);
    addDepartmentIds(item.departmentId);
  };
  const handleChangeJobTitle = (index, item) => {
    const arr = [
      { key: "jobTitle", newValue: item["jobTitle"] },
      { key: "jobTitleId", newValue: item["jobTitleId"] },
    ];
    updateArr(index, arr);
  };
  const handleChangeCitizen = (index, item) => {
    const arr = [{ key: "nationality", newValue: item["legislationCode"] }];
    updateArr(index, arr);
  };
  const handleChangeFTE = (item, index) => {
    const arr = [{ key: "fte", newValue: item }];
    updateArr(index, arr);
  };
  const handleChangeDays = (item, index) => {
    const arr = [{ key: "days", newValue: item }];
    updateArr(index, arr);
  };

  const handleChangeGender = (index, item) => {
    const arr = [{ key: "gender", newValue: item["gender"] }];
    updateArr(index, arr);
  };
  const handleChangeEmployeeType = (index, item) => {
    const arr = [
      { key: "employeeTypeId", newValue: item["employeeTypeId"] },
      { key: "employeeType", newValue: item["employeeTypes"] },
    ];
    updateArr(index, arr);
  };

  const [days, setDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });
  const onCopy = (row) => {
    let dupDemandTemplateLines = [...demandTemplateLines];
    var lastRow = { ...dupDemandTemplateLines[row.index] };
    if ("demandLineId" in lastRow) {
      delete lastRow.demandLineId;
    }
    dupDemandTemplateLines.push({
      ...lastRow,
      index: demandTemplateLines.length,
    });
    setDemandTemplateLines(dupDemandTemplateLines);
  };

  var tableColumns = getTableColumns({
    deleteSplitShift,
    onCopy,
    departmentList,
    handleChangeDepartment,
    jobTitlesList,
    handleChangeJobTitle,
    workDurationTemplate,
    handleChangeWorkDuration,
    handleChangeFTE,
    handleChangeDays,
    skillTemplate,
    handleChangeSkill,
    workLocationTemplate,
    handleChangeWorkLocation,
    handleChangeGender,
    handleChangeEmployeeType,
    employeeTypesList,
    bussinessUnitList,
    handleChangeBusinessUnit,
    citizenList,
    handleChangeCitizen,
  });
  const profileSelector = (arr) => {
    if (Array.isArray(arr)) {
      return arr.map((item) => {
        return {
          profileId: item.profileId,
          profileName: item.profileName,
          owner: `${item.fullName}(${item.userType})`,
        };
      });
    } else {
      return [];
    }
  };
  const formData = {
    gap: 2,
    labelWidth: "115px",
    sections: [
      {
        direction: "row",
        items: [
          {
            label: "Profile",
            value: profile,
            required: true,
            type: "lookup",
            editorProps: {
              selectItem: (item) => {
                setProfile(item);
                setIsProfileChanged(true);
              },
              template: getTemplate("PROFILE_TEMPLATE", {}, profileSelector),
              columnKey: "profileName",
            },
          },
          {
            label: "Valid From",
            value: validFrom,
            required: true,
            type: "date",
            onChange: setValidFrom,
          },
          {
            label: "Valid To",
            value: validTo,
            required: true,
            type: "date",
            onChange: setValidTo,
          },
        ],
      },
      {
        items: [
          {
            label: "Template Name",
            value: templateName,
            required: true,
            readOnly: true,
          },
        ],
      },
    ],
  };
  console.log("Demand Temaplates", demandTemplateLines);
  const HeaderComponent = () => (
    <EvoButton btnText="New" onClick={handleAdd} startIcon={<AddIcon />} />
  );
  // actions methods for Custom Dialog
  var actions = {};
  actions.onSave = isCreateOperation ? saveHandler : updateHandler;
  actions.onCancel = handleClose;

  return (
    <CustomDialog
      maxWidth="lg"
      title="Demand Template"
      open="true"
      snakeBarProps={snakeBarPropsDemandTemplate}
      setSnakeBarProps={setSnakeBarPropsDemandTemplate}
      handleClose={handleClose}
      actions={actions}
      isLoading={isLoading1 || isLoading2 || isLoading3}
    >
      <EvoDataForm formData={formData} />
      <EvoDataGrid
        columns={tableColumns}
        rows={demandTemplateLines}
        HeaderComponent={HeaderComponent}
      />
    </CustomDialog>
  );
};

export default DemTempEdit;
