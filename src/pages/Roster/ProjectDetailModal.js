import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { CustomDialog } from "../../components/CustomDialog";

import { CustomTextField } from "../../components/TextField";
import { EvoButton } from "../../components/EvoButton";
import { projectList } from "../../services/api";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/commonSlice";
import { makeStyles } from "@mui/styles";
import { SearchTextField } from "../../components/TextField/search";

const useStyles = makeStyles(() => ({
  search: {
    backgroundColor: "#EEEEEE",
  },
  projectnamecontainer: {
    display: "flex",
    backgroundColor: "#f1f4f9 !important",
    padding: "8px !important",
    marginTop: "10px !important",
  },
  projectnametext: {
    fontWeight: "bold !important",
    fontsize: "1px !important",
  },
  radio: {
    display: "flex !important",
    alignItems: "center !important",
    padding: "5px !important",
    fontsize: "10px !important",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    margin: "100px 0px 0px 0px !important",
  },
}));

export const ProjectDetailModal = (props) => {
  const classes = useStyles();

  const { togglerHandler } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  const [projectArr, setProjectArr] = useState([]);
  const [projectDetailArr, setProjectDetailArr] = useState([]);
  const [projectIdArr, setProjectIdArr] = useState([]);
  const [projectNameArr, setProjectNameArr] = useState([]);
  const [localCurrentProjectId, setLocalCurrentProjectId] = useState({});
  const [pagedata, setPagedata] = useState({
    projectQuery: "",
    date: "",
  });

  useEffect(() => {
    projectListMutate({ userId: commonReducer.userId });
  }, []);

  useEffect(() => {
    setProjectIdArr(projectDetailArr.map((option) => option.projectId));
    setProjectNameArr(projectDetailArr.map((option) => option.projectName));
  }, [projectDetailArr]);

  useEffect(() => {
    if (projectArr.length > 0) {
      var localrArr = projectArr.filter((option) =>
        option.projectName
          .toLowerCase()
          .includes(pagedata.projectQuery.toLowerCase())
      );
      setProjectDetailArr(localrArr);
    }
  }, [pagedata.projectQuery]);

  const { mutate: projectListMutate } = useMutation(projectList, {
    onSuccess: (data, context, variables) =>
      onSuccessProjectList(data, context, variables),
    onError: (data, context, variables) =>
      onErrorProjectList(data, context, variables),
  });

  const onSuccessProjectList = (data) => {
    setProjectDetailArr(data.data.data);
    setProjectArr(data.data.data);
  };

  const onErrorProjectList = (data) => {};

  const handleClose = () => {
    togglerHandler(false);
  };

  const handleselect = () => {
    dispatch(updateState({ selectedProjectObj: localCurrentProjectId }));
    handleClose();
  };

  return (
    <CustomDialog
      maxWidth="lg"
      title="Select"
      open="true"
      handleClose={handleClose}
      actions={{ onSelect: handleselect }}
    >
      <Box>
        <Grid container>
          <Grid
            item
            xs="6"
            sm="5"
            md="5"
            lg="5"
            style={{ padding: "0px 0px 5px 10px" }}
          >
            <SearchTextField
             className={classes.search}
              fullWidth
              type="text"
              value={pagedata?.username}
              onChange={(event) =>
                setPagedata({ ...pagedata, projectQuery: event.target.value })
              }
              placeholder="Search"
            />
          </Grid>
        </Grid>
        <Grid container item xs="12" className={classes.projectnamecontainer}>
          {/* <Grid item xs='12'>
                    <Typography style={{ fontWeight: "bold" }}>Project ID</Typography>
                </Grid> */}
          <Grid item xs="12">
            <Typography variant="h7" className={classes.projectnametext}>
              Project name
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs="12">
            <Grid item className={classes.radio}>
              <Grid>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={
                    Object.keys(commonReducer.selectedProjectObj).length > 0
                      ? commonReducer.selectedProjectObj.projectName
                      : 0
                  }
                  name="radio-buttons-group"
                >
                  {/* {
                                    projectIdArr.length > 0 &&
                                    projectIdArr.map((item) => <FormControlLabel value={item} control={
                                        <Radio onChange={(e) => { setLocalCurrentProjectId(projectDetailArr.filter((option) => option.projectId == e.target.value)[0]) }} />} label={item} />)
                                } */}
                  {projectNameArr.length > 0 &&
                    projectNameArr.map((item) => (
                      <FormControlLabel
                        value={item}
                        control={
                          <Radio
                            sx={{ fontSize: "19px" }}
                            onChange={(e) => {
                              setLocalCurrentProjectId(
                                projectDetailArr.filter(
                                  (option) =>
                                    option.projectName == e.target.value
                                )[0]
                              );
                            }}
                          />
                        }
                        label={<Typography variant="h7">{item}</Typography>}
                      />
                    ))}
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.selectbutton}>
          <Grid item>
            {/* <EvoButton
              btnText="select profile"
              //variant="contained"
              btnClass={{ backgroundColor: "#124590", color: "#fff" }}
              onClick={() => {
                
              }}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </CustomDialog>
  );
};
