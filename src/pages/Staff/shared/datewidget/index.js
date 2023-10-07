import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EvoDatePicker from "../../../../components/EvoDateTime/date";
import { dateConverter } from "../../../../utils/commonService";

import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../../components/EvoDropDown";
import { updateState } from "../../../../redux/commonSlice";

const DateWidget_ = (props) => {
  const classes = useStyles();

  const { setAppStatus, dateWidgetOption, durationFilter } = props;
  const commonReducer = useSelector((state) => state.commonReducer);
  const dispatch = new useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (commonReducer.oriDate) {
      setStartDate(new Date(commonReducer.oriDate));
    }
  }, []);

  const [startDateForText, setStartDateForText] = useState("");
  const [dateWidgetSelectedOption, setDateWidgetSelectedOption] = useState(
    dateWidgetOption[0]
  );
  const [dayDiff, setDayDiff] = useState(6);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    let weekDay = moment(startDate).isoWeekday();
    startDate
      ? commonLogic("diff", moment(startDate).add(-1 * weekDay, "days"))
      : commonLogic("", moment());
  }, [dayDiff]);

  useEffect(() => {
    if (Object.keys(dateWidgetSelectedOption).length > 0) {
      var a = moment(new Date(startDate));
      var b = a.add(
        dateWidgetSelectedOption.value,
        dateWidgetSelectedOption.type
      );
      setDayDiff(
        (moment(new Date(startDate)).diff(moment(b), "days") + 1) * -1
      );
    }
  }, [dateWidgetSelectedOption]);

  const commonLogic = (type, e) => {
    var a =
      dateWidgetSelectedOption.type != "months"
        ? moment(new Date(e))
        : moment(new Date(e)).startOf("month");
    var b = a.add(
      dateWidgetSelectedOption.value,
      dateWidgetSelectedOption.type
    );

    var localDiff =
      dateWidgetSelectedOption.type != "months"
        ? (moment(new Date(e)).diff(moment(b), "days") + 1) * -1
        : (moment(new Date(e)).startOf("month").diff(moment(b), "days") + 1) *
          -1;
    var localDayArr = [];
    for (var i = 0; i <= localDiff; i++) {
      localDayArr.push(
        type == "diff"
          ? moment(e).add(i, "days").format("DD")
          : moment().add(i, "days").format("DD")
      );
    }

    var localStartDay = type == "diff" ? moment(e) : moment();
    const lastDay = localStartDay.add(localDiff, "days").format("DD-MMM-YYYY");
    dispatch(
      updateState({
        oriDate: startDate,
        startDate:
          type == "diff"
            ? dateWidgetSelectedOption.type != "months"
              ? moment(e).format("DD-MMM-YYYY")
              : moment(e).startOf("month").format("DD-MMM-YYYY")
            : moment().format("DD-MMM-YYYY"),
        endDate: lastDay,
        dayArr: localDayArr,
        dateRangeType: dateWidgetSelectedOption.type,
      })
    );
  };

  useEffect(() => {
    var localDate =
      dateWidgetSelectedOption.type == "day"
        ? new Date(moment(startDate).format())
        : dateWidgetSelectedOption.type != "months"
        ? new Date(moment(startDate).startOf("week").format())
        : new Date(moment(startDate).startOf("month").format());
    setAnchorEl(null);
    commonLogic("diff", localDate);
  }, [startDate]);

  const onOptionChange = (newData) => {
    var localDate = new Date(startDate);
    setDateWidgetSelectedOption(newData);
    commonLogic("diff", localDate);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const prevDate = () => {
    const prev_date = moment(startDate)
      .add(-dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
      .format();
    setStartDate(new Date(prev_date));
  };

  const nextDate = () => {
    var next_date = moment(startDate)
      .add(dateWidgetSelectedOption.value, dateWidgetSelectedOption.type)
      .format();
    setStartDate(new Date(next_date));
  };

  const _renderDateValue = () => {
    return dateWidgetSelectedOption.type != "day"
      ? `${dateConverter(commonReducer.startDate)} to ${dateConverter(
          commonReducer.endDate
        )}`
      : `${dateConverter(commonReducer.startDate)}`;
  };

  return (
    <>
      {durationFilter && (
        <Box style={{}}>
          <Dropdown            
            data={dateWidgetOption}
            caller={onOptionChange}
            month={dateWidgetSelectedOption}
            getoptionlabelkey="label"
            showEmpty={true}
            // selectIndex={0}
          />
        </Box>
      )}
      <ChevronLeftIcon className={classes.enddate} onClick={prevDate} />
      <Box><Typography>{_renderDateValue()}</Typography></Box>
      <ChevronRightIcon className={classes.nextdate} onClick={nextDate} />
      <EvoDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </>
  );
};

export const DateWidget = (props) => {
  const classes = useStyles();
  return (
    <Grid className={classes.dateWrap}>
      <DateWidget_ {...props} />
    </Grid>
  );
};
const useStyles = makeStyles(() => ({
  dateWrap: {
    display: "flex",
    alignItems: "center !important",
    fontSize: "14px !important",
    borderRadius: "0px !important",
    borderRight: 2,
    borderColor: "#124590",
    // paddingRight: "15px",
  },
  enddate: {
    color: "#124590",
    cursor: "pointer",
  },
  calendericon: {
    color: "#124590",
    marginLeft: "2px",
    cursor: "pointer",
    alignItems: "center !important",
  },
  duration: {
    width: "140px !important",
    marginLeft: "10px !important",
  },

  calenderdropdown: {
    fontSize: "14px !important",
    display: "flex !important",
    alignItems: "center !important",
  },
  nextdate: {
    verticalAlign: "bottom",
    cursor: "pointer",
    color: "#124590",
  },
}));
