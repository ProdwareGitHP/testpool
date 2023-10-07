import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../components/CustomDialog";
import { EvoButton } from "../../../components/EvoButton";

import { CustomFilterModal } from "../../../components/CustomFilterModal";
import { EvoHBox, EvoVBox } from "../../../components/EvoBox";
import { useGetValidateRoster } from "../../../services/roster";
import { dateConverter } from "../../../utils/commonService";
import ValidateRosterTabs from "./ValidateRosterTabs";
import EvoTab from "../../../components/EvoTab";
import getTemplate from "../../../components/getTemplate";

const parentTab = [
  {
    title: "Hrs",
  },
  {
    title: "Staffs",
  },
  {
    title: "Costs",
  },
];
const ValidateRosterModal = (props) => {
  const classes = useStyles();

  const { setStatus1 } = props;
  const commonReducer = useSelector((state) => state.commonReducer);

  const [select, setSelect] = useState(0);
  const [openDemand, setOpenDemand] = useState(null);

  const [selectDemand, setSelectDemand] = useState();
  const [keys2, setKeys2] = useState("Hrs");

  const handleClose1 = () => {
    setStatus1(0);
  };

  const {
    data: validateRosterData,
    isLoading,
    isRefetching,
  } = useGetValidateRoster(
    {
      demandTemplateId: selectDemand?.demandTemplateId,
      fromDate: dateConverter(commonReducer.startDate),
      toDate: dateConverter(commonReducer.endDate),
      userId: commonReducer.userId,
    },
    null,
    selectDemand?.demandTemplateId === undefined
  );

  useEffect(() => {
    if (select == 0) {
      setKeys2("Hrs");
    } else if (select == 1) {
      setKeys2("Staffs");
    } else {
      setKeys2("Costs");
    }
  }, [select]);

  return (
    <>
      <CustomDialog
        width="1100px"
        title="Validate Roster"
        open="true"
        handleClose={handleClose1}
        isLoading={isLoading || isRefetching}
      >
        <EvoVBox divider>
          <EvoHBox divider>
            <EvoHBox divider>
              <Typography
                onClick={() => {
                  setSelect(0);
                }}
                style={select == 0 ? { fontWeight: "600", color: "blue" } : {}}
                className={classes.mainhead}
              >
                Hrs
              </Typography>
              <Typography
                onClick={() => {
                  setSelect(1);
                }}
                style={select == 1 ? { fontWeight: "600", color: "blue" } : {}}
                className={classes.mainhead}
              >
                Staffs
              </Typography>
              <Typography
                onClick={() => {
                  setSelect(2);
                }}
                style={select == 2 ? { fontWeight: "600", color: "blue" } : {}}
                className={classes.mainhead}
              >
                Cost
              </Typography>
            </EvoHBox>
            <EvoButton
              startIcon={<FilterAltIcon />}
              btnText="Demand Template"
              onClick={() => setOpenDemand(getTemplate("DEMAND_TEMPLATE"))}
            />
          </EvoHBox>

          <ValidateRosterTabs
            validateRosterData={validateRosterData}
            select={select}
          />
        </EvoVBox>
      </CustomDialog>
      {openDemand && (
        <CustomFilterModal
          togglerhandler={() => setOpenDemand(null)}
          isSingleSelection={true}
          modalData={getTemplate("DEMAND_TEMPLATE", {
            userId: commonReducer.userId,
          })}
          item={selectDemand}
          onSelect={(item) => setSelectDemand(item)}
          type={"searchBox"}
        />
      )}
    </>
  );
};

export default ValidateRosterModal;

const useStyles = makeStyles(() => ({
  nodata: {
    marginLeft: "1.75em",
  },
  maincontainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  maincontentBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mainrow: {
    display: "flex",
    flexDirection: "row",
    margin: "15px",
  },
  maincont: {
    width: "100%",
  },
  mainhead: {
    // fontSize: "14px",
    // padding: "0.5em 1em",
    // borderRight: "1px solid grey",
    // cursor: "pointer",
    // color: "cornflowerblue",
  },
  mainhead2: {
    margin: "0 1em",
    padding: "0.5em 1em",
    cursor: "pointer",
    color: "cornflowerblue",
    border: "2px solid cornflowerblue",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    textAlign: "center",
  },
  bodhead: {
    cursor: "pointer",
    padding: "0.25em 0.75em",
    borderTop: "2px solid white",
  },
  cont: {
    marginTop: "1em",
  },
  cont2: {
    width: "100%",
    border: "1px solid grey",
  },
  cont3: {
    margin: "0 1.5em 0 1.5em",
    display: "flex",
    flexDirection: "row",
    border: "1px solid grey",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },
  cont4: {
    margin: "0 1.5em 1em 1.5em",
    display: "flex",
    flexDirection: "column",
    border: "1px solid grey",
  },
  fixrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid grey",
  },
  fixcol: {
    display: "flex",
    flexDirection: "column",
  },
  undor: {
    margin: "0.5em 1.5em 0.5em 1.5em",
    display: "flex",
    /* text-align: right; */
    flexDirection: "row-reverse",
    gap: "18px",
  },
  under: {
    backgroundColor: "#FFCCBC",
    padding: "0.25em",
    borderRadius: "5px",
  },
  over: {
    backgroundColor: "#E4D4E7",
    padding: "0.25em",
    marginLeft: "0.5em",
    borderRadius: "5px",
  },
  cont3bodm: {
    width: "30%",
    padding: "0.2em",
    borderRight: "2px solid blue",
  },
  cont3bodmm: {
    width: "30%",
    padding: "0.2em",
    borderRight: "2px solid blue",
    color: "cornflowerblue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cont3bod: {
    width: "10%",
    padding: "0.2em",
    borderRight: "1px solid grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },
  cont3bod1: {
    fontSize: "1em",
  },
  cont3bod2: {
    fontSize: "0.75em",
  },
  typo: {
    width: "100px",
    textAlign: "end",
    alignSelf: "center",
  },
  filterData: {
    width: "170px !important",
    marginLeft: "12px !important",
  },
  bordermanage: {
    borderBottom: "1px solid #E9E9E9",
    cursor: "pointer",
  },
  selectbutton: {
    display: "flex !important",
    justifyContent: "flex-end !important",
    // margin: "100px 0px 0px 0px !important"
  },
  headermanage: {
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#D6DFE6",
    alignItems: "center",
  },
}));
