import React, { useState, useEffect } from "react";

import moment from "moment";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useMutation, useQuery } from "react-query";

import { _formatTime } from "../../contants";
import { EvoHBox } from "../../../components/EvoBox";
import { EvoButton } from "../../../components/EvoButton";
import EvoDataGrid from "../../../components/EvoDataGrid";
import DeleteModal from "../../../components/DeleteModal";
import getTemplate from "../../../components/getTemplate";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { CustomDialog } from "../../../components/CustomDialog";
import { CustomFilterModal } from "../../../components/CustomFilterModal";
import {
  dateConverter,
  timeConverter,
  timeConverter12Hr,
  useGetOperations,
} from "../../../utils/commonService";
import {
  useAllCategoryData,
  useLegalEntityData,
  useBussinessUnitData,
} from "../../../services/rostersettings";
import {
  UpdateWorkDuration,
  CreateWorkDuration,
  DeleteWorkDurationApi,
  GetWorkDurationCriteriaDetail,
  GetWorkDurationDetail,
} from "../../../services/api";

const WorkDurationModalRosterSetting = (props) => {
  const actions = {};

  const { userId } = useSelector((state) => state?.commonReducer);

  const {
    editData,
    handleClose,
    refetchWorkDurationList,
    setSnakeBarPropsLandingPage,
  } = props;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const typeNameDropdown = [
    { typeName: "Start", typeId: "1" },
    { typeName: "Lunch", typeId: "2" },
    { typeName: "Dinner", typeId: "3" },
    { typeName: "Break", typeId: "4" },
    { typeName: "Tea", typeId: "5" },
  ];

  const effectDropdown = [
    { effectName: "1", effectId: "1" },
    { effectName: "2", effectId: "2" },
  ];

  const {
    isCreateOperation,
    isUpdateOperation,
    value: workDurationId,
  } = useGetOperations({ params: editData, key: "workDurationId" });

  const { data: getWorkDurationDetail } = useQuery(
    ["getWorkDurtaionDetail"],
    () =>
      getWorkDurationDetail({
        setIsLoading: false,
        workDurationId: workDurationId,
      }),
    { enabled: true, retry: false }
  );

  const { data: category } = useAllCategoryData();
  const { data: getLegalEntityData } = useLegalEntityData();
  const { data: getBussinessUnitData } = useBussinessUnitData();
  const { data: getWorkDetail } = GetWorkDurationDetail({
    id: editData?.workDurationId,
  });
  const { data: getWorkCreteria } = GetWorkDurationCriteriaDetail({
    id: editData?.workDurationId,
  });

  const [endTime, setEndTime] = useState();
  const [startTime, setStartTime] = useState();
  const [modalData, setModelData] = useState(null);
  const [durationcat, setDurationCat] = useState();
  const [ValidToDate, setValidToDate] = useState();
  const [submitFlag, setSubmitFlag] = useState(false);
  const [ValidFromDate, setValidFromDate] = useState();
  const [workDurationCode, setWorkDurationCode] = useState();
  const [workDurationName, setWorkDurationName] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [workDurationDetails, setWorkDurationDetails] = useState([]);
  const [workDurationCriteria, setWorkDurationCriteria] = useState([]);
  const [snakeBarPropsRosterSetting, setSnakeBarPropsRosterSetting] = useState(
    {}
  );

  const [CheckDays, setCheckDays] = useState({
    sun: editData?.sun === "Y" ? true : false,
    mon: editData?.mon === "Y" ? true : false,
    tue: editData?.tue === "Y" ? true : false,
    wed: editData?.wed === "Y" ? true : false,
    thu: editData?.thu === "Y" ? true : false,
    fri: editData?.fri === "Y" ? true : false,
    sat: editData?.sat === "Y" ? true : false,
  });

  const ValidToDateChange = (validToDateValue) =>
    setValidToDate(validToDateValue);

  const ValidFromDateChange = (validFromDateValue) =>
    setValidFromDate(validFromDateValue);

  const endTimeVar = endTime;
  const startTimeVar = startTime;

  useEffect(() => {
    setEndTime(editData?.endTime);
    setStartTime(editData?.startTime);
    setWorkDurationCode(editData?.workDurationCode);
    setWorkDurationName(editData?.workDurationName);

    if (editData?.validTo) setValidToDate(new Date(editData?.validTo));

    if (editData?.validFrom) setValidFromDate(new Date(editData?.validFrom));
  }, []);

  useEffect(() => {
    if (getWorkDetail?.length) {
      getWorkDetail?.map((item, index) => {
        item.index = index;

        const typeKey = item?.typeName?.split("")?.[0];

        switch (typeKey) {
          case "S":
            item.typeId = "1";
            break;

          case "L":
            item.typeId = "2";
            break;

          case "D":
            item.typeId = "3";
            break;

          case "B":
            item.typeId = "4";
            break;

          case "T":
            item.typeId = "5";
            break;
        }

        if (item?.effectDay) {
          item.effectId = item?.effectDay?.toString();
          item.effectName = item?.effectDay?.toString();
        }

        if (item?.startTime?.length) {
          const time = `${item?.startTime?.[3]}:${item?.startTime?.[4]}`;
          item.startTime = timeConverter12Hr(time);
        }

        if (item?.endTime?.length) {
          const time = `${item?.endTime?.[3]}:${item?.endTime?.[4]}`;
          item.endTime = timeConverter12Hr(time);
        }

        if (!item?.duration) {
          item.duration = parseInt(
            timeDiff(item?.startTime, item?.endTime)
          )?.toFixed();
        }
      });
      setWorkDurationDetails(getWorkDetail);
    }
  }, [getWorkDetail]);

  useEffect(() => {
    if (getWorkCreteria?.length) {
      getWorkCreteria?.map((item, index) => (item.index = index));
      setWorkDurationCriteria(getWorkCreteria);
    }
  }, [getWorkCreteria]);

  const onSuccessCreateRequest = (data) => {
    if (data) {
      refetchWorkDurationList();
      setTimeout(() => handleClose(), 1000);
      setSnakeBarPropsRosterSetting({
        msz: `${editData?.workDurationName} is saved`,
        type: "success",
      });
    }
  };

  const onErrorCreateRequest = (error) => {
    if (error)
      setSnakeBarPropsRosterSetting({
        msz: "Unable to create new Work Duration!",
        type: "error",
      });
  };

  const { mutate: CreateDurationMutate } = useMutation(CreateWorkDuration, {
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
  });

  const { mutate: DeleteWorkDurationMutate, isLoading: isLoading7 } =
    useMutation(DeleteWorkDurationApi, {
      onError: (data, context, variables) =>
        onErrorDeleteRequest(data, context, variables),
      onSuccess: (data, context, variables) =>
        onSuccessDeleteRequest(data, context, variables),
    });

  const handleAdd = () => {
    if (!workDurationCode) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      return;
    }

    if (!workDurationName) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      return;
    }

    if (!ValidFromDate) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the  Valid from date!",
        type: "error",
      });
      return;
    }

    if (!startTime) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Time start is required!",
        type: "error",
      });
      return;
    }

    if (!endTime) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Time end is required!",
        type: "error",
      });
      return;
    }

    for (let index = 0; index < workDurationDetails?.length; index++) {
      if (!workDurationDetails?.[index]?.startTime)
        return setSnakeBarPropsRosterSetting({
          msz: `Please enter all values in the row : ${index + 1}`,
          type: "error",
        });
    }

    const workDurationObj = {
      index: workDurationDetails?.length,
      typeName: "",
      typeId: "",
      effectDay: "",
      effectId: "",
      startTime: "",
      endTime: "",
      duration: "",
    };
    setWorkDurationDetails([...workDurationDetails, workDurationObj]);
  };

  const saveWorkDurationDetail = () => {
    let finalData = [];

    const lastIndex = [...workDurationDetails]?.length - 1;

    if (lastIndex === 0) {
      const tempData = workDurationDetails?.map((el) => {
        return { ...el, endTime: endTimeVar };
      });

      finalData = tempData;
    } else {
      for (let index = 0; index < workDurationDetails?.length; index++) {
        if (index === 0) {
          workDurationDetails[index] = {
            ...workDurationDetails[index],
            endTime: endTimeVar,
          };
        } else if (index === workDurationDetails?.length - 1) {
          workDurationDetails[index - 1] = {
            ...workDurationDetails?.[index - 1],
            endTime: workDurationDetails?.[index]?.startTime,
          };
          workDurationDetails[index] = {
            ...workDurationDetails[index],
            endTime: endTimeVar,
          };
        } else {
          workDurationDetails[index - 1] = {
            ...workDurationDetails?.[index - 1],
            endTime: workDurationDetails?.[index]?.startTime,
          };
          workDurationDetails[index] = {
            ...workDurationDetails?.[index],
            endTime: endTimeVar,
          };
        }
      }

      finalData = workDurationDetails;
    }

    const dataWithDuration = finalData?.map((el) => {
      const duration = parseInt(
        timeDiff(el?.startTime, el?.endTime)
      )?.toFixed();
      return { ...el, duration };
    });

    setWorkDurationDetails(dataWithDuration);
  };

  const handleAddCriteria = () => {
    if (!workDurationCode) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      return;
    }

    if (!workDurationName) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      return;
    }

    if (!ValidFromDate) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the  Valid from date!",
        type: "error",
      });
      return;
    }

    const value = {
      departmentId: "",
      legalEntityId: "",
      createdBy: userId,
      businessUnitId: "",
      departmentName: "",
      legalEntityName: "",
      businessUnitName: "",
      lastUpdatedBy: userId,
      createdOn: "01-Jan-2022T01:12 PM",
      index: workDurationCriteria?.length,
      lastUpdateDate: "01-Jan-2022T01:12 PM",
    };

    const addCriteria = [...workDurationCriteria, value];
    setWorkDurationCriteria(addCriteria);
  };

  const saveWorkDuration = () => {
    const date1Array = moment(ValidFromDate)?.format("DD-MM-YYYY")?.split("-");
    const date2Array = moment(ValidToDate)?.format("DD-MM-YYYY")?.split("-");

    const month1 = months?.indexOf(date1Array?.[1]);
    const month2 = months?.indexOf(date2Array?.[1]);

    const d1 = new Date(date1Array?.[2], month1, date1Array?.[0]);
    const d2 = new Date(date2Array?.[2], month2, date2Array?.[0]);

    if (!workDurationCode) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
      return;
    }

    if (!workDurationName) {
      setSubmitFlag(true);
      setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
      return;
    }

    if (d1 > d2) {
      return setSnakeBarPropsRosterSetting({
        msz: "Valid to Date is lower than Valid from date!",
        type: "error",
      });
    }

    if (!endTime || !startTime) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter the Time!",
        type: "error",
      });
    }

    const timeDiff1 = timeDiff(startTime, endTime);

    if (!timeDiff1) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please Enter Valid StartTime and EndTime",
        type: "error",
      });
    }

    if (!workDurationDetails?.length) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter and save Work Duration Detail",
        type: "error",
      });
    }

    if (!durationcat?.workDurationCategoryId) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please select the Work Duration Category",
        type: "error",
      });
    }

    const workdetail = workDurationDetails;
    let dumCriteria = workDurationCriteria;

    for (let index = 0; index < dumCriteria?.length; index++) {
      delete dumCriteria?.[index]?.legalEntity;
      delete dumCriteria?.[index]?.departmentName;
      delete dumCriteria?.[index]?.businessUnitName;
    }

    const mockData = {
      createdBy: userId,
      lastUpdatedBy: userId,
      createdOn: "01-Jan-2022T01:12 PM",
      lastUpdateDate: "01-Jan-2022T01:12 PM",
    };

    for (let index = 0; index < workdetail?.length; index++) {
      if (
        !workdetail?.[index]?.endTime ||
        !workdetail?.[index]?.typeName ||
        !workdetail?.[index]?.effectDay ||
        !workdetail?.[index]?.startTime
      ) {
        return setSnakeBarPropsRosterSetting({
          msz: "Please enter and save Work Duration Detail",
          type: "error",
        });
      }

      if (!workdetail[index]?.endTime?.includes("T")) {
        workdetail[index].endTime =
          dateConverter(ValidToDate) + "T" + workdetail?.[index]?.endTime;
        workdetail[index].startTime =
          dateConverter(ValidFromDate) + "T" + workdetail?.[index]?.startTime;
      }

      workdetail[index] = { ...workdetail?.[index], ...mockData };
    }

    const data = {
      workDurationCode: workDurationCode,
      workDurationName: workDurationName,
      timeEnd: dateConverter(ValidToDate) + "T" + endTime,
      validTo: dateConverter(ValidToDate) + "T" + endTime,
      validFrom: dateConverter(ValidFromDate) + "T" + startTime,
      timeStart: dateConverter(ValidFromDate) + "T" + startTime,
      enterpriseId: 5,
      mon: CheckDays.mon ? "Y" : "N",
      tue: CheckDays.tue ? "Y" : "N",
      wed: CheckDays.wed ? "Y" : "N",
      thu: CheckDays.thu ? "Y" : "N",
      fri: CheckDays.fri ? "Y" : "N",
      sat: CheckDays.sat ? "Y" : "N",
      sun: CheckDays.sun ? "Y" : "N",
      colorCode: "#CCC",
      duration: durationTime(),
      workDurationCategoryId: durationcat?.workDurationCategoryId,
      exceptionEvents: "",
      minWorkHrs: 17,
      maxWorkHrs: 17,
      workUnit: "W",
      workDurationCriteriaList: dumCriteria,
      workDurationDetailsList: workdetail,
    };

    CreateDurationMutate(data);
  };

  const onSuccessDeleteRequest = (data) => {
    if (data) {
      handleClose();
      setOpenDeleteModal(false);
      refetchWorkDurationList();
      setSnakeBarPropsLandingPage({
        msz: `${editData?.workDurationName} is deleted.`,
        type: "success",
      });
    }
  };

  const onErrorDeleteRequest = (error) => {
    if (error) {
      setOpenDeleteModal(false);
      setSnakeBarPropsRosterSetting({
        msz: error?.response?.data?.status?.description,
        type: "error",
      });
    }
  };

  const deleteWorkDuration = () => {
    DeleteWorkDurationMutate({ workDurationId: workDurationId });
  };

  const { mutate: UpdateDuration } = useMutation(UpdateWorkDuration, {
    onError: (data, context, variables) =>
      onErrorUpdateRequest(data, context, variables),
    onSuccess: (data, context, variables) =>
      onUpdateCreateRequest(data, context, variables),
  });

  const onUpdateCreateRequest = async (data) => {
    if (data) {
      refetchWorkDurationList();
      setTimeout(() => handleClose(), 1000);
      setSnakeBarPropsRosterSetting({
        msz: "Succesfully updated the item!",
        type: "success",
      });
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setSnakeBarPropsRosterSetting({
        msz: "Unable to Update the Item!",
        type: "error",
      });
    }
  };

  const updateDurationData = () => {
    if (!workDurationCode) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Code!",
        type: "error",
      });
    }

    if (!workDurationName) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter the Work duration Name!",
        type: "error",
      });
    }

    if (!startTime) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter the Time!",
        type: "error",
      });
    }

    const timeDiff1 = timeDiff(startTime, endTime);

    if (!timeDiff1) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please Enter Valid StartTime and EndTime",
        type: "error",
      });
    }

    if (!durationcat?.workDurationCategoryId) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please select the Work Duration Category",
        type: "error",
      });
    }

    if (!workDurationDetails?.length) {
      return setSnakeBarPropsRosterSetting({
        msz: "Please enter and save Work Duration Detail",
        type: "error",
      });
    }

    let depname;
    let legalent;
    let businessUnitName;
    const workdetail = workDurationDetails;
    const dumCriteria = [...workDurationCriteria];

    for (let index = 0; index < dumCriteria?.length; index++) {
      if (index < getWorkCreteria?.length) dumCriteria.shift();
    }

    for (let index = 0; index < dumCriteria?.length; index++) {
      dumCriteria[index].lastUpdateDate = "01-Jan-2022T01:12 PM";
      dumCriteria[index].createdOn = "01-Jan-2022T01:12 PM";
      businessUnitName = dumCriteria?.[index]?.businessUnitName;
      depname = dumCriteria?.[index]?.departmentName;
      legalent = dumCriteria?.[index]?.legalEntity;
      delete dumCriteria?.[index]?.businessUnitName;
      delete dumCriteria?.[index]?.departmentName;
      delete dumCriteria?.[index]?.legalEntity;
      workDurationCriteria[index].businessUnitName = businessUnitName;
      workDurationCriteria[index].departmentName = depname;
      workDurationCriteria[index].legalEntity = legalent;
    }

    const mockData = {
      createdBy: userId,
      lastUpdatedBy: userId,
      createdOn: dateConverter(ValidFromDate) + "T" + "01:12 PM",
      lastUpdateDate: dateConverter(ValidToDate) + "T" + "01:12 PM",
    };

    for (let index = 0; index < workdetail?.length; index++) {
      if (index < getWorkDetail?.length) workdetail.shift();
    }

    for (let index = 0; index < workdetail?.length; index++) {
      if (!workdetail?.[index]?.endTime?.includes("T")) {
        const mEndTime =
          workdetail?.[index]?.endTime?.length === 7
            ? `0${workdetail?.[index]?.endTime}`
            : workdetail?.[index]?.endTime;
        const mStartTime =
          workdetail?.[index]?.startTime?.length === 7
            ? `0${workdetail?.[index]?.startTime}`
            : workdetail?.[index]?.startTime;

        workdetail[index].endTime =
          dateConverter(ValidToDate ? ValidToDate : ValidFromDate) +
          "T" +
          mEndTime;
        workdetail[index].startTime =
          dateConverter(ValidFromDate) + "T" + mStartTime;
      }

      workdetail[index] = { ...workdetail[index], ...mockData };
    }

    const mEndTime = endTime?.length === 7 ? `0${endTime}` : endTime;
    const mStartTime = startTime?.length === 7 ? `0${startTime}` : startTime;

    const data = {
      id: workDurationId,
      workDurationCode: workDurationCode,
      workDurationName: workDurationName,
      validFrom: dateConverter(ValidFromDate) + "T" + mStartTime,
      validTo:
        dateConverter(ValidToDate ? ValidToDate : ValidFromDate) +
        "T" +
        mEndTime,
      timeStart: dateConverter(ValidFromDate) + "T" + mStartTime,
      timeEnd:
        dateConverter(ValidToDate ? ValidToDate : ValidFromDate) +
        "T" +
        mEndTime,
      enterpriseId: 5,
      mon: CheckDays?.mon ? "Y" : "N",
      tue: CheckDays?.tue ? "Y" : "N",
      wed: CheckDays?.wed ? "Y" : "N",
      thu: CheckDays?.thu ? "Y" : "N",
      fri: CheckDays?.fri ? "Y" : "N",
      sat: CheckDays?.sat ? "Y" : "N",
      sun: CheckDays?.sun ? "Y" : "N",
      colorCode: "#CCC",
      duration: durationTime(),
      workDurationCategoryId: durationcat?.workDurationCategoryId,
      exceptionEvents: "",
      minWorkHrs: 17,
      maxWorkHrs: 17,
      workUnit: "W",
      workDurationCriteriaList: dumCriteria,
      workDurationDetailsList: workDurationDetails,
    };

    UpdateDuration(data);
  };

  const createTimeObj = (time) => {
    const startTime = new Date();
    const parts = time?.match(/(\d+):(\d+) (AM|PM)/);

    if (parts) {
      let hours = parseInt(parts?.[1]);
      const minutes = parseInt(parts?.[2]);
      const tt = parts?.[3];

      if (tt === "PM" && hours < 12) hours += 12;

      startTime?.setHours(hours, minutes, 0, 0);
    }

    return startTime;
  };

  const timeDiff = (startTime, endTime) => {
    const start = createTimeObj(startTime);
    const end = moment(createTimeObj(endTime));

    if (!startTime || !endTime) return "";
    if (!start || !end) return "";

    const duration = moment.duration(end?.diff(start));
    const hours = duration?.asHours();

    return hours;
  };

  const durationTime = () => {
    if (startTimeVar && endTimeVar)
      return Number(timeDiff(startTimeVar, endTimeVar))?.toFixed(2);

    return null;
  };

  const deleteWorkDurationPopup = () => setOpenDeleteModal(true);

  const handleChangeStartTime = (time, index) => {
    workDurationDetails[index].startTime = timeConverter(
      _formatTime(time).formattedValue
    );
    setWorkDurationDetails(workDurationDetails);
  };

  const getCriteriaRows = [
    {
      width: 100,
      key: "typeId",
      type: "dropdown",
      name: "Type Name",
      editorProps: {
        width: 90,
        selectedId: "typeId",
        data: typeNameDropdown,
        getoptionlabelkey: "typeName",
        caller: (index, item) => {
          workDurationDetails[index].typeId = item?.typeId;
          workDurationDetails[index].typeName = item?.typeName;
          setWorkDurationDetails(workDurationDetails);
        },
      },
    },
    {
      width: 100,
      key: "effectId",
      type: "dropdown",
      name: "Effect Day",
      editorProps: {
        width: 90,
        data: effectDropdown,
        selectedId: "effectId",
        getoptionlabelkey: "effectName",
        caller: (index, item) => {
          workDurationDetails[index].effectId = item?.effectId;
          workDurationDetails[index].effectDay = item?.effectName
            ? parseInt(item?.effectName)
            : null;
          setWorkDurationDetails(workDurationDetails);
        },
      },
    },
    {
      width: 100,
      type: "text",
      key: "startTime",
      name: "Start Time",
      onChange: handleChangeStartTime,
    },
    {
      width: 100,
      key: "endTime",
      name: "End Time",
    },
    {
      width: 100,
      key: "duration",
      name: "Duration",
    },
  ];

  const workDurationTemplate = () => {
    return getTemplate("MANAGE_WORK_DURATION_DEPARMENT_TEMPLATE");
  };

  const handleChangeWorkDuration = (item, index) => {
    workDurationCriteria[index].departmentId = item?.departmentId;
    workDurationCriteria[index].departmentName = item?.departmentName;
    setWorkDurationCriteria(workDurationCriteria);
  };

  const deleteCriteria = (index) => {
    if (index >= 0) {
      let deleteval = [];

      if (workDurationCriteria?.length) {
        deleteval = [...workDurationCriteria];
      }

      deleteval?.splice(index, 1);
      deleteval = deleteval?.map((item, index) => ({ ...item, index }));

      setWorkDurationCriteria(deleteval);
    }
  };

  const getCriteriaColumns = [
    {
      width: 200,
      type: "lookup",
      name: "Department",
      key: "departmentName",
      templateMethod: workDurationTemplate,
      selectItem: handleChangeWorkDuration,
    },
    {
      width: 120,
      type: "dropdown",
      key: "businessUnitId",
      name: "Bussiness Unit",
      editorProps: {
        width: 110,
        data: getBussinessUnitData,
        selectedId: "businessUnitId",
        getoptionlabelkey: "businessUnitName",
        caller: (index, item) => {
          workDurationCriteria[index].businessUnitId = item?.businessUnitId;
          workDurationCriteria[index].businessUnitName = item?.businessUnitName;
          setWorkDurationCriteria(workDurationCriteria);
        },
      },
    },
    {
      width: 120,
      type: "dropdown",
      key: "legalEntityId",
      name: "Legal Entity",
      editorProps: {
        width: 110,
        data: getLegalEntityData,
        selectedId: "legalEntityId",
        getoptionlabelkey: "name",
        caller: (index, item) => {
          workDurationCriteria[index].legalEntityId = item?.legalEntityId;
          workDurationCriteria[index].legalEntityName = item?.name;
          setWorkDurationCriteria(workDurationCriteria);
        },
      },
    },
    {
      width: 120,
      key: "action",
      name: "Action",
      type: "delete",
      onDeleted: deleteCriteria,
    },
  ];

  const formData = {
    gap: 1,
    labelWidth: "160px",
    sections: [
      {
        sectionName: "Work Duration",
        items: [
          {
            required: true,
            value: workDurationCode,
            label: "Work Duration Code",
            editorProps: {
              value: workDurationCode,
              error: !workDurationCode ? submitFlag : "",
              onChange: (e) => setWorkDurationCode(e?.target?.value),
            },
          },
          {
            required: true,
            value: workDurationName,
            label: "Work Duration Name",
            editorProps: {
              value: workDurationName,
              error: !workDurationName ? submitFlag : "",
              onChange: (e) => setWorkDurationName(e?.target?.value),
            },
          },
        ],
      },
      {
        direction: "row",
        sectionName: "Validity",
        items: [
          {
            type: "date",
            required: true,
            label: "Valid From",
            value: ValidFromDate,
            onChange: (date) => ValidFromDateChange(date),
          },
          {
            type: "date",
            required: true,
            label: "Valid To",
            value: ValidToDate,
            onChange: (date) => ValidToDateChange(date),
          },
        ],
      },
      {
        labelWidth: 200,
        sectionName: "Days & Time",
        items: [
          {
            type: "day",
            value: CheckDays,
            onChange: setCheckDays,
            editorProps: {
              hasLabel: false,
              containerStyles: { margin: 0 },
            },
          },
          {
            type: "time",
            required: true,
            value: startTime,
            label: "Time Start",
            onChange: (time) => setStartTime(time),
          },
          {
            type: "time",
            value: endTime,
            required: true,
            label: "Time End",
            onChange: (time) => setEndTime(time),
          },
          {
            label: "Duration",
            readOnly: true,
            value: durationTime(),
          },
          {
            width: 120,
            required: true,
            type: "dropdown",
            key: "workDurationCategoryId",
            label: "Work Duration Category",
            editorProps: {
              width: 120,
              data: category,
              month: durationcat,
              caller: setDurationCat,
              selectedId: "workDurationCategoryId",
              selectIndex: 2,
              getoptionlabelkey: "workDurationCategory",
            },
          },
        ],
      },
    ],
  };

  const durationHeaderComponent = () => (
    <EvoHBox>
      <EvoButton btnText={"New"} onClick={handleAdd} startIcon={<AddIcon />} />
    </EvoHBox>
  );

  const criteriaHeaderComponent = () => (
    <EvoButton
      btnText={"New"}
      startIcon={<AddIcon />}
      onClick={handleAddCriteria}
    />
  );

  const durationFooterComponent = () => (
    <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
      <EvoButton
        variant={"outlined"}
        startIcon={<CheckIcon />}
        onClick={saveWorkDurationDetail}
        btnText={"Save Work Duration Detail"}
      />
    </Grid>
  );

  actions.onSave = isCreateOperation ? saveWorkDuration : updateDurationData;

  if (isUpdateOperation) {
    actions.onDelete = deleteWorkDurationPopup;
  }

  actions.onCancel = handleClose;

  return (
    <CustomDialog
      open={true}
      maxWidth={"lg"}
      width={"800px"}
      actions={actions}
      title={"Work Duration"}
      handleClose={handleClose}
      snakeBarProps={snakeBarPropsRosterSetting}
    >
      <EvoDataForm formData={formData} />

      <EvoDataGrid
        columns={getCriteriaRows}
        rows={workDurationDetails}
        title={"Work Duration Detail"}
        HeaderComponent={durationHeaderComponent}
        FooterComponent={durationFooterComponent}
      />

      <EvoDataGrid
        rows={workDurationCriteria}
        columns={getCriteriaColumns}
        title={"Work Duration Criteria"}
        HeaderComponent={criteriaHeaderComponent}
      />

      {openDeleteModal ? (
        <DeleteModal
          title={"Delete"}
          isLoading={isLoading7}
          onDelete={deleteWorkDuration}
          toggleHandler={setOpenDeleteModal}
          text={isUpdateOperation ? editData?.workDurationName : ""}
        />
      ) : null}

      {modalData ? (
        <CustomFilterModal
          modalData={modalData}
          togglerhandler={() => setModelData(null)}
        />
      ) : null}
    </CustomDialog>
  );
};

export default WorkDurationModalRosterSetting;
