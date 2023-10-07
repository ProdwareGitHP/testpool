import { Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { CustomPage } from "../../components/CustomPage";
import { saveReminder } from "../../services/api";
// import { CustomButton } from "../../components/Button";
import { EvoHBox } from "../../components/EvoBox";
import { EvoButton } from "../../components/EvoButton";
import { EvoDataForm } from "../../components/EvoDataForm";
import EvoDayPicker from "../../components/EvoDateTime/day";
import Dropdown from "../../components/EvoDropDown";
import getTemplate from "../../components/getTemplate";
import { checkValidations } from "../../utils/commonService";

const time = [
  { label: "" },
  { label: "01" },
  { label: "02" },
  { label: "03" },
  { label: "04" },
  { label: "05" },
  { label: "06" },
  { label: "07" },
  { label: "08" },
  { label: "09" },
  { label: "10" },
  { label: "11" },
];
const seconds = [{ label: "" }, { label: "00" }, { label: "30" }];
const clock = [{ label: "" }, { label: "AM" }, { label: "PM" }];

const UserPreferences = (props) => {
  const classes = useStyles();
  const [selectedTimeZone, setSelectedTimeZone] = useState({
    internalName: "Asia/Calcutta",
    userVisibleName: "(+05:30) India",
  });
  const [snakeBarProps, setSnakeBarProps] = useState({});

  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const [status, setStatus] = useState(0);
  const [tsarNotifyType, setTsarNotifyType] = useState();
  const [tsarMinute, setTsarMinute] = useState();
  const [tsarHour, setTsarHour] = useState();
  const [tsarClock, setTsarClock] = useState();
  const handelChangeTimezone = (item) => {
    setSelectedTimeZone(item);
  };

  const selectReminders = (e) => {
    setStatus(e);
  };

  const onTimeChange = (item) => {
    setTsarHour(item.label);
  };

  const onMinuteChange = (item) => {
    setTsarMinute(item.label);
  };

  const onClockChange = (item) => {
    setTsarClock(item);
  };
  useEffect(() => {
    switch (status) {
      case 0: {
        return setTsarNotifyType("RT");
      }
      case 1: {
        return setTsarNotifyType("N");
      }
      case 2: {
        return setTsarNotifyType("DT");
      }
      default:
        return status;
    }
  }, [status]);

  const validate = () => {
    const validations = [
      {
        msz: "Day is required",
        type: "error",
        isMatch:
          status === 2 &&
          CheckDays.mon == false &&
          CheckDays.tue == false &&
          CheckDays.wed == false &&
          CheckDays.thu == false &&
          CheckDays.fri == false &&
          CheckDays.sat == false &&
          CheckDays.sun == false,
      },
      {
        msz: "Hour is required",
        type: "error",
        isMatch: (status === 2 && tsarHour == undefined) || tsarHour === "",
      },
      {
        msz: "Minute is required",
        type: "error",
        isMatch: (status === 2 && tsarMinute == undefined) || tsarMinute === "",
      },
      {
        msz: "Hour, Minute and AM/PM is required",
        type: "error",
        isMatch:
          (status === 2 && tsarClock == undefined) || tsarClock.label === "",
      },
    ];

    return checkValidations({
      validations: validations,
      setSnakeBarProps: setSnakeBarProps,
    });
  };

  const { mutate: saveReminderMutate, isLoading } = useMutation(saveReminder, {
    onSuccess: (data, context, variables) =>
      onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) =>
      onErrorCreateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = (data) => {
    if (data.data) {
      setSnakeBarProps({
        msz: "User Preference(s) Saved",
        type: "success",
      });
    }
  };

  const onErrorCreateRequest = (data) => {
    if (data.data) {
      setSnakeBarProps({
        msz: "Unable to save data",
        type: "error",
      });
    }
  };
  const saveReminderbtn = () => {
    if (status === 0 || status === 1 || (status === 2 && validate())) {
      let pdata = {
        tzInternalName: selectedTimeZone?.internalName,
        tsarMon: status === 2 && CheckDays.mon == true ? "Y" : "N",
        tsarTue: status === 2 && CheckDays.tue == true ? "Y" : "N",
        tsarWed: status === 2 && CheckDays.wed == true ? "Y" : "N",
        tsarThu: status === 2 && CheckDays.thu == true ? "Y" : "N",
        tsarFri: status === 2 && CheckDays.fri == true ? "Y" : "N",
        tsarSat: status === 2 && CheckDays.sat == true ? "Y" : "N",
        tsarSun: status === 2 && CheckDays.sun == true ? "Y" : "N",
        tsarHour: status === 2 ? tsarHour : null,
        tsarMinute: status === 2 ? tsarMinute : null,
        tsarClock: status === 2 ? tsarClock : null,
        tsarNotifyType: tsarNotifyType,
      };
      setSnakeBarProps(null);
      saveReminderMutate(pdata);
    }
  };
  return (
    <CustomPage
      title={props.title}
      snakeBarProps={snakeBarProps}
      isLoading={isLoading}
    >
      <Grid container xs="12" style={{}}>
        <Grid className={classes.timezone} xs="12">
          <EvoDataForm
            formData={{
              item: {
                label: "Timezone",
                labelColor: "#0572ce",
                value: selectedTimeZone,
                required: true,
                type: "lookup",
                editorProps: {
                  selectItem: handelChangeTimezone,
                  template: getTemplate("TIMEZONE_TEMPLATE"),
                  columnKey: "userVisibleName",
                },
              },
            }}
          />
        </Grid>

        <Grid className={classes.timezone} xs="12">
          <FormControl>
            <FormLabel
              id="approval"
              style={{ color: "blue", margin: "5px 0px 0px 10px" }}
            >
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "16px",
                  color: "#0572ce",
                  cursor: "text",
                  fontWeight: "bold",
                }}
              >
                Timesheet Approval Reminder Settings
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="approval"
              defaultValue={1}
              name="approval-group"
              style={{ padding: "5px", marginLeft: "7px" }}
            >
              <FormControlLabel
                style={{
                  fontFamily: "Inter",
                  whiteSpace: "nowrap",
                }}
                value={1}
                control={
                  <Radio onClick={() => selectReminders(0)} size="small" />
                }
                label={
                  <Typography style={{ fontSize: 15 }}>
                    I would like to receive email notifications when my
                    employee(s) submit timesheets in real time
                  </Typography>
                }
              ></FormControlLabel>
              <FormControlLabel
                value={2}
                control={
                  <Radio onClick={() => selectReminders(1)} size="small" />
                }
                label={
                  <Typography style={{ fontSize: 15 }}>
                    I do not wish to receive email notifications
                  </Typography>
                }
              />
              <FormControlLabel
                value={3}
                control={
                  <Radio onClick={() => selectReminders(2)} size="small" />
                }
                label={
                  <Typography style={{ fontSize: 15 }}>
                    I would choose my own day and time for Timesheet approval
                    notifications
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          {status == 2 && (
            <>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 50,
                  marginBottom: 15,
                  marginTop: 10,
                }}
              >
                <EvoDayPicker
                  selectedDays={CheckDays}
                  onChange={setCheckDays}
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 50,
                  marginBottom: 10,
                }}
              >
                <Typography style={{ fontSize: 15 }}>Time</Typography>

                <EvoHBox style={{ marginLeft: "20px" }}>
                  <Dropdown
                    id="time"
                    data={time}
                    caller={onTimeChange}
                    getoptionlabelkey="label"
                    width={65}
                  />

                  <Dropdown
                    id="seconds"
                    data={seconds}
                    caller={onMinuteChange}
                    getoptionlabelkey="label"
                    width={65}
                  />

                  <Dropdown
                    id="clock"
                    data={clock}
                    caller={onClockChange}
                    getoptionlabelkey="label"
                    width={65}
                  />
                </EvoHBox>
              </Grid>
            </>
          )}
        </Grid>

        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <EvoButton
            //variant="contained"
            btnText="Save"
            fullWidth
            color="primary"
            onClick={saveReminderbtn}
            // btnClass={{ backgroundColor: "#124590" }}
          />
        </Grid>
      </Grid>
    </CustomPage>
  );
};

export default UserPreferences;

const useStyles = makeStyles(() => ({
  timezone: {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    marginBottom: "15px",
    padding: "6px",
  },
}));
