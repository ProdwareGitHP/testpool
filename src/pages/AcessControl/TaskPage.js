import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import CustomCheckBox from "../../components/CustomCheckBox";
import EvoSection from "../../components/EvoSection";
import { useGetTaskByUserId } from "../../services/accesscontrol";
import { saveUser } from "../../services/api";

const TaskPage = (props) => {
  const { getaccessgroupdata, person, index, setErrorProps, getAllRefetch } =
    props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const [groupData, setGroupData] = useState([]);
  const [modifiedGroupData, setModifiedGroupData] = useState([]);

  const [expanded, setExpanded] = useState([]);
  const handleChange = (panel, index) => (event, newExpanded) => {
    setExpanded((prev) => {
      const arr = [...prev];
      arr[index] = newExpanded ? panel : false;
      return arr;
    });
  };

  useEffect(() => {
    const arr = modifiedGroupData?.map((item, index) => false);
    setExpanded(arr);
  }, [modifiedGroupData]);

  // const { data: getTaskById } = useQuery(
  //   ["getTaskById", person?.userId],
  //   () => getTaskByUserId({ id: person?.userId }),
  //   {
  //     enabled: true,
  //     retry: false,
  //   }
  // );

  const { data: getTaskById } = useGetTaskByUserId({ id: person?.userId });

  const { mutate: mutateSaveUserTask } = useMutation(saveUser, {
    onSuccess: (data, context, variables) =>
      onSuccessSaveUserRole(data, context, variables),
    onError: (data, context, variables) =>
      onErrorSaveUserRole(data, context, variables),
  });

  const onSuccessSaveUserRole = (data, context, variables) => {
    getAllRefetch();
    setErrorProps({
      type: "success",
      msz: "Task Control Updated",
    });
  };
  const onErrorSaveUserRole = (error) => {};

  useEffect(() => {
    let arr = getaccessgroupdata?.data?.data.sort((data1, data2) =>
      data1.groupName.localeCompare(data2.groupName)
    );
    let groupDataArray = arr?.map((item) => {
      return { ...item };
    });

    if (getTaskById) {
      getTaskById?.data?.data?.forEach((ele) => {
        let foundIndex = groupDataArray.findIndex(
          (x) => x.taskId === ele.taskId
        );
        if (index !== -1) {
          groupDataArray[foundIndex].canCreate = ele.canCreate;
          groupDataArray[foundIndex].readOnly = ele.readOnly;
        }
      });
    }
    setGroupData(groupDataArray);
  }, [getTaskById]);

  useEffect(() => {
    let arr = [];
    groupData?.forEach((item, index) => {
      let groupName = item.groupName;
      let id = arr.findIndex((i) => i.groupName === groupName);
      if (id > -1) {
        arr[id].groups = [...arr[id].groups, item];
      } else {
        let obj = {
          groupName,
          groups: [item],
        };
        arr.push(obj);
      }
      setModifiedGroupData(arr);
    });
  }, [groupData]);

  const canCreateHandler = (e, item) => {
    console.log(item, "item");
    let pData = {
      userId: person?.userId,
      groupSeq: item?.taskGroupId,
      taskId: item?.taskId,
      canCreateEditDeleteFlag: e ? true : false,
      canView: false,
      seq: item?.seq,
      enterpriseId: 1,
      employeeId: person?.personId,
    };
    mutateSaveUserTask(pData);
  };

  const readOnlyHandler = (e, item) => {
    let pData = {
      userId: person?.userId,
      groupSeq: item?.taskGroupId,
      taskId: item?.taskId,
      canCreateEditDeleteFlag: false,
      canView: e ? true : false,
      seq: item?.seq,
      enterpriseId: 1,
      employeeId: person?.personId,
    };
    mutateSaveUserTask(pData);
  };
  return (
    <Box style={{ marginTop: "15px", marginBottom: "15px" }}>
      <Grid>
        <Typography
          style={{
            marginLeft: "15px",
            marginBottom: "15px",
            fontSize: "14px",
            fontFamily: "Inter",
            color: "#124590",
          }}
        >
          User Control for [{person.fullName} ]
        </Typography>
      </Grid>
      <Grid
        style={{
          border: "3px solid #ededed",
          padding: "5px",
          margin: "5px",
        }}
      >
        <Box style={{ height: "46.75vh" }}>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Inter",
              fontWeight: "bolder",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#124590",
            }}
            ml={1}
          >
            Tasks
          </Typography>
          <Box
            style={{
              border: "3px solid #ededed",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Box style={{ width: "20%", padding: "2px" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Group
              </Typography>
            </Box>
            <Box
              style={{
                width: "40%",
                borderLeft: "3px solid #ededed",
                padding: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Tasks
              </Typography>
            </Box>
            <Box
              style={{
                width: "20%",
                borderLeft: "3px solid #ededed",
                padding: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Full Access ?
              </Typography>
            </Box>
            <Box
              style={{
                width: "20%",
                borderLeft: "3px solid #ededed",
                padding: "2px",
              }}
            >
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                Read only ?
              </Typography>
            </Box>
          </Box>
          <Grid style={{ height: "40.75vh", overflowY: "auto" }}>
            {modifiedGroupData?.length > 0 &&
              modifiedGroupData?.map((it, index) => {
                return (
                  <Box>
                    <EvoSection title={it.groupName}>
                      {it.groups?.map((item) => {
                        return (
                          <Box style={{ height: "7vh" }}>
                            <Box
                              style={{
                                border: "3px solid #ededed",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Box style={{ width: "21.3%", padding: "2px" }}>
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "bold",
                                  }}
                                ></Typography>
                              </Box>
                              <Box
                                style={{
                                  width: "42.7%",
                                  borderLeft: "3px solid #ededed",
                                  padding: "2px",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Inter",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.taskName}
                                </Typography>
                              </Box>
                              <Box
                                style={{
                                  width: "21%",
                                  borderLeft: "3px solid #ededed",
                                  padding: "2px",
                                }}
                              >
                                <CustomCheckBox
                                  check={item.canCreate === "Y" ? true : false}
                                  onChangeCheck={(e) => {
                                    canCreateHandler(e, item);
                                  }}
                                />
                              </Box>
                              <Box
                                style={{
                                  width: "19%",
                                  borderLeft: "3px solid #ededed",
                                  padding: "2px",
                                }}
                              >
                                <CustomCheckBox
                                  check={item.readOnly === "Y" ? true : false}
                                  onChangeCheck={(e) => {
                                    readOnlyHandler(e, item);
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </EvoSection>
                  </Box>
                );
              })}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default TaskPage;
