import { Box, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { SearchTextField } from "../../../components/TextField/search";
import { updateState } from "../../../redux/commonSlice";
import { useGetAllRosterdata } from "../../../services/rosterapi";


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

const RoasterDetailModal = (props) => {
  const classes = useStyles();
  const { togglehandler } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  // const [profileArr,setProfileArr]=useState([])
  const [profileDetailArr, setProfileDetailArr] = useState([]);
  const [localCurrentProjectId, setLocalCurrentProjectId] = useState({});
  const [profileNameArr, setProfileNameArr] = useState([]);
  const [profileRole, setProfileRole] = useState([]);
  const [approver, setApprover] = useState([]);
  const [pagedata, setPagedata] = useState({
    projectQuery: "",
    date: "",
  });

  useEffect(() => {
    if (profileDetailArr.length > 0) {
      var localrArr = profileDetailArr.filter((option) =>
        option.profileName
          .toLowerCase()
          .includes(pagedata.projectQuery.toLowerCase())
      );
      var localrArr1 = profileDetailArr.filter((option) =>
        option.role.toLowerCase().includes(pagedata.projectQuery.toLowerCase())
      );
      setProfileDetailArr(localrArr || localrArr1);
    }
  }, [pagedata.projectQuery]);

  //     var localrArr = profileDetailArr.filter((option) => option.profileName.toLowerCase().includes(pagedata.projectQuery.toLowerCase()))
  //     console.log(localrArr)
  console.log(pagedata);
  // // console.log(localrArr1)

  // const { data: RoasterData, error } = useQuery(
  //   "getallroasterdata",
  //   () => getallroasterdata({ userId: commonReducer.userId }),
  //   { enabled: true, retry: false }
  // );

   const { data : RoasterData } = useGetAllRosterdata({ userId: commonReducer.userId });
  useEffect(() => {
    if (RoasterData) {
      setProfileDetailArr(RoasterData?.data?.data);
    }
  }, [RoasterData]);

  useEffect(() => {
    setProfileNameArr(profileDetailArr.map((option) => option.profileName));
    setProfileRole(profileDetailArr.map((option) => option.role));
    setApprover(profileDetailArr.map((option) => option.approver));
  }, [profileDetailArr]);

  const handleClose = () => {
    togglehandler(false);
  };

  const selecthandler = () => {
    dispatch(updateState({ selectedProjectObj: localCurrentProjectId }));
    handleClose();
  };
  return (
    <CustomDialog
      maxWidth="lg"
      title="Select Roster Profile"
      open="true"
      handleClose={handleClose}
      actions={{ onSelect: selecthandler }}
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
              
              placeholder="Search"
              value={pagedata?.username}
              onChange={(event) =>
                setPagedata({ ...pagedata, projectQuery: event.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container item xs="12" className={classes.projectnamecontainer}>
          <Grid item xs="3">
            <Typography
              variant="h7"
              className={classes.projectnametext}
              style={{ marginLeft: "40px" }}
            >
              Name
            </Typography>
          </Grid>
          <Grid item xs="3">
            <Typography variant="h7" className={classes.projectnametext}>
              Employee(s)
            </Typography>
          </Grid>
          <Grid item xs="3">
            <Typography variant="h7" className={classes.projectnametext}>
              {" "}
              Central Team
            </Typography>
          </Grid>
          <Grid item xs="3">
            <Typography variant="h7" className={classes.projectnametext}>
              Role
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
                      ? commonReducer.selectedProjectObj.profileName
                      : 0
                  }
                  name="radio-buttons-group"
                >
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                      {profileNameArr.length > 0 &&
                        profileNameArr.map((item) => (
                          <FormControlLabel
                            value={item}
                            control={
                              <Radio
                                sx={{ fontSize: "19px" }}
                                onChange={(e) => {
                                  setLocalCurrentProjectId(
                                    profileDetailArr.filter(
                                      (option) =>
                                        option.profileName == e.target.value
                                    )[0]
                                  );
                                }}
                              />
                            }
                            label={<Typography variant="h7">{item}</Typography>}
                          />
                        ))}
                    </Box>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                      {approver.length > 0 &&
                        approver.map((item) => (
                          <Typography variant="h7">{item}</Typography>
                        ))}
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        right: "17rem",
                        margin: "2px",
                      }}
                    >
                      {profileRole.length > 0 &&
                        profileRole.map((item) => (
                          <Typography variant="h7">{item}</Typography>
                        ))}
                    </Box>
                  </Grid>
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
              onClick={selecthandler}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </CustomDialog>
  );
};

export default RoasterDetailModal;
