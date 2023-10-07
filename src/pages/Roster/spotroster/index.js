import React, { useEffect, useState } from "react";
import { CustomPage } from "../../../components/CustomPage";
import CustomSummaryList from "../../../components/CustomSummaryList";
import { isPreviousURLMatched } from "../../../utils/commonService";
import RoasterPersonDetailTable from "./RoasterPersonDetailTable";

import CustomFilterList from "../../../components/CustomFilterList";
import { EvoHBox } from "../../../components/EvoBox";
import { DateWidget } from "../../Staff/shared/datewidget";
import { rosterDateWidgetOption } from "../../contants";

import { useDispatch, useSelector } from "react-redux";
import { EvoDataForm } from "../../../components/EvoDataForm";
import { updateState } from "../../../redux/commonSlice";
import RosterActions from "./RosterActions";
import getSummaryList from "./summaryList";
import {
  sendApproval,
  sendRmiForApproval,
  useGetAllEmployeeList,
} from "../../../services/roster";
import { getFilterButtons } from "./getFilterButtons";
import { getPersonIdsArr, sort } from "../utils";
import { useMutation } from "react-query";

const filterByViewBy = [
  { id: 1, label: "Employee", value: "Employee" },
  { id: 2, label: "Department", value: "Department" },
  { id: 3, label: "Job Title", value: "Job Title" },
  { id: 3, label: "Work Location", value: "Work Location" },
  { id: 4, label: "Shift Time", value: "Shift Time" },
];

const summaryKeys = {
  totalSchHours: "totalSchHours",
  draft: "draft",
  pendingApproval: "pendingApproval",
  correction: "correction",
  underPublish: "underPublish",
  publish: "publish",
  onCall: "onCall",
};

const SpotRoaster = (props) => {
  const [viewBy, setViewBy] = useState(filterByViewBy[0]);
  const [viewByOriginal, setViewByOriginal] = useState(filterByViewBy[0]);

  const commonReducer = useSelector((state) => state.commonReducer);
  const [oriPagedata, setOriPagedata] = useState({});
  const [apprStatus, setApprStatus] = useState("");
  const [checked, setChecked] = React.useState(new Set());
  const [snakeBarRosterProps, setSnakeBarRosterProps] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({});
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [managerIds, setManagerIds] = useState(new Set());
  const [dutyManagerList, setDutyManagerList] = useState([]);
  const [filter, setFilter] = useState({});
  const onClearFilter = () => {};

  const handleSummaryChange = (value) => {
    dispatch(updateState({ selectedSummary: value }));
  };
  useEffect(() => {
    if (!isPreviousURLMatched(commonReducer)) {
      dispatch(updateState({ selectedSummary: summaryKeys.totalSchHours }));
    }
  }, []);

  const resetChecked = () => {
    setChecked(new Set());
  };
  const replaceArrayOldKeys = (arr, keysArr) => {
    if (Array.isArray(arr) && Array.isArray(keysArr)) {
      return arr?.map((item) => {
        var obj = { ...item };

        keysArr?.map((item2) => {
          const { oldKey, newKey } = item2;
          if (oldKey in obj) {
            var value = obj[oldKey];
            delete obj[oldKey];
            obj = { ...obj, [newKey]: value };
          }
        });
        return obj;
      });
    } else {
      return [];
    }
  };

  const replaceObjectOldKeys = (obj, keysArr) => {
    var res = {};
    if (typeof obj === "object" && Array.isArray(keysArr)) {
      var keys = Object.keys(obj);
      keys.map((key) => {
        keysArr.map((item) => {
          const { oldKey, newKey } = item;
          var value = Array.from(obj[key]).toString().split(",");
          if (oldKey === key) {
            res[newKey] = value;
          }
        });
      });
    }
    return res;
  };
  const replaceOldKeys = (obj, keysArr) => {
    if (Array.isArray(obj) && Array.isArray(keysArr)) {
      return replaceArrayOldKeys(obj, keysArr);
    } else if (typeof obj === "object" && Array.isArray(keysArr)) {
      return replaceObjectOldKeys(obj, keysArr);
    } else {
      return obj;
    }
  };

  var filterParams = replaceOldKeys(filter, [
    {
      oldKey: "departmentId",
      newKey: "department",
    },
    {
      oldKey: "personId",
      newKey: "employee",
    },
    {
      oldKey: "jobTitleId",
      newKey: "jobTitle",
    },
    {
      oldKey: "workLocationId",
      newKey: "workLocation",
    },
    {
      oldKey: "businessUnitId",
      newKey: "businessUnit",
    },
    {
      oldKey: "legalEntityId",
      newKey: "legalEntity",
    },
    {
      oldKey: "managerId",
      newKey: "dutyManager",
    },
  ]);
  const {
    data: oriPageList,
    isLoading: isLoad,
    refetch: refetchEmployeeList,
    isRefetching,
  } = useGetAllEmployeeList(
    {
      userId: commonReducer.userId,
      startDate: commonReducer.startDate,
      endDate: commonReducer.endDate,
      profileId: commonReducer.selectedProjectObj.profileId,
      apprvStatus: apprStatus,
      asc: true,
      viewBy: viewByOriginal.value,
      pageSize: "1000",
      pageNo: "0",
      filter: { ...filterParams },
    },
    null,
    Object.keys(commonReducer.selectedProjectObj).length === 0
  );

  const createUniqueManagerIds = (arr) => {
    var uniqueManagerIds = [];
    arr?.map((item) => {
      uniqueManagerIds = [...uniqueManagerIds, ...item.managerIds];
    });
    setManagerIds(new Set(uniqueManagerIds));
  };
  const createDutyManagerArr = () => {
    var obj = {};
    data.map((item) => {
      if (managerIds.has(item.personId)) {
        obj[item.personId] = item.fullName;
      }
    });
    var arr = [];
    Object.keys(obj).map((key) => {
      arr.push({ managerName: obj[key], managerId: key });
    });
    setDutyManagerList(arr);
  };

  useEffect(() => {
    if (oriPageList) {
      setOriPagedata(oriPageList);
      setViewBy(viewByOriginal);
      var obj = oriPageList?.personRosterData;
      var res = getData(obj);
      var keysArr = [
        {
          oldKey: "departmentName",
          newKey: "department",
        },
      ];
      res = replaceOldKeys(res, keysArr);
      setData(sort(res, "fullName", "asc"));
      createUniqueManagerIds(res);
    }
  }, [oriPageList]);

  useEffect(() => {
    if (managerIds.size) {
      createDutyManagerArr();
    }
  }, [managerIds]);

  useEffect(() => {
    if (commonReducer.selectedProjectObj?.profileId) {
      refetchEmployeeList();
    }
  }, [
    commonReducer.startDate,
    commonReducer.endDate,
    apprStatus,
    commonReducer.selectedProjectObj.profileId,
    viewByOriginal,
  ]);
  var list = [
    { templateName: "EMPLOYEE_FILTER_ROSTER_MODULE" },
    { templateName: "DEPARTMENT_FILTER_ROSTER_MODULE" },
    { templateName: "JOB_TITLE_FILTER_ROSTER_MODULE" },
    { templateName: "WORKLOCATION_FILTER_ROSTER_MODULE" },
    { templateName: "BUSINESS_UNIT_FILTER_ROSTER_MODULE" },
    { templateName: "LEGAL_ENTITY_FILTER_ROSTER_MODULE" },
    {
      templateName: "DUTY_MANAGER_FILTER_ROSTER_MODULE",
      rows: dutyManagerList,
    },
  ];
  var finalList = getFilterButtons(list);

  const getData = (obj) => {
    if (viewBy.value === "Employee") {
      return obj[viewBy.value];
    } else {
      var res = {};

      Object.keys(obj).map((key) => {
        obj[key].map((item) => {
          res[item.personId] = { ...item };
        });
      });

      return Object.values(res);
    }
  };

  const handleApprvStatus = (value) => {
    setApprStatus(value);
  };
  const { mutate: sendApprovalMutate, isLoading } = useMutation(sendApproval, {
    onSuccess: (data, context, variables) => onCreateRequest(data),
    onError: (data, context, variables) => onErrorRequest(data),
  });

  const onCreateRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Rosters approved.",
      type: "success",
    });
    refetchEmployeeList();
    if (resetChecked) {
      resetChecked();
    }
  };

  const onErrorRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Unable to send approval",
      type: "error",
    });
  };
  const { mutate: markApprovedMutate, isLoading2 } = useMutation(
    sendRmiForApproval,
    {
      onSuccess: (data, context, variables) => onCreateApproveRequest(data),
      onError: (data, context, variables) => onErrorApproveRequest(data),
    }
  );

  const onCreateApproveRequest = (data) => {
    setSnakeBarRosterProps({
      msz: data.data.data,
      type: "success",
    });
    refetchEmployeeList();
    if (resetChecked) {
      resetChecked();
    }
  };

  const onErrorApproveRequest = (data) => {
    setSnakeBarRosterProps({
      msz: "Unable to send approval",
      type: "error",
    });
  };
  return (
    <CustomPage
      title={props.title}
      isLoading={isLoad || isRefetching || isLoading || isLoading2}
      snakeBarProps={snakeBarRosterProps}
      setSnakeBarProps={setSnakeBarRosterProps}
      profileSelector={{
        managerFlag: false,
      }}
    >
      <EvoHBox divider>
        <DateWidget
          durationFilter={true}
          {...props}
          dateWidgetOption={rosterDateWidgetOption}
        />
        <EvoDataForm
          formData={{
            item: {
              label: "ViewBy",
              type: "dropdown",
              editorProps: {
                width: 150,
                data: filterByViewBy,
                caller: setViewByOriginal,
                selectIndex: 0,
                month: viewByOriginal,
                getoptionlabelkey: "label",
              },
            },
          }}
        />
        <RosterActions
          oriPagedata={oriPagedata}
          data={data}
          setSnakeBarProps={setSnakeBarRosterProps}
          checked={getPersonIdsArr(checked)}
          resetChecked={resetChecked}
          refetchEmployeeList={refetchEmployeeList}
        />
      </EvoHBox>
      <EvoHBox divider>
        <CustomFilterList
          filterButtons={finalList}
          // isTab={true}
          filter={filter}
          setFilter={setFilter}
          oriPagedata={data}
          multiFilterSelection={false}
          onClearFilter={onClearFilter}
        />
      </EvoHBox>
      <CustomSummaryList
        summaryList={getSummaryList(oriPagedata, commonReducer)}
        scrollable={true}
        isClickable={true}
        isSelectable={true}
        selectedFilter={selectedFilter}
        onClick={(item) => {
          setSelectedFilter(item);
          handleSummaryChange(item.mappedKey);
          handleApprvStatus(item.apprStatus);
        }}
      />

      <RoasterPersonDetailTable
        refetchEmployeeList={refetchEmployeeList}
        data={data}
        oriPagedata={oriPagedata}
        viewBy={viewBy}
        checked={checked}
        setChecked={setChecked}
        resetChecked={resetChecked}
        setSnakeBarRosterProps={setSnakeBarRosterProps}
        apprStatus={apprStatus}
        sendApprovalMutate={sendApprovalMutate}
        markApprovedMutate={markApprovedMutate}
      />
    </CustomPage>
  );
};

export default SpotRoaster;
