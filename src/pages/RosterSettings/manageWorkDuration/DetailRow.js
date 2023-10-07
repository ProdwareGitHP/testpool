import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Dropdown from "../../../components/EvoDropDown";
import { CustomTextField } from "../../../components/TextField";
import EvoTimePicker from "../../../components/EvoDateTime/time";

const DetailRow = (props) => {
  const {
    endTimeCriteria,
    edit,
    workDurationDetailArr,
    val,
    item,
    setVal,
    index,
    starTime,
    timeDiff,
  } = props;

  const [startTimeCriteria, setStartTimeCriteria] = useState(null);

  const [onBlurFlag, setOnBlurFlag] = useState(false);

  const [itemdup, setItem] = useState(item);

  const startTime = item?.startTime?.split("T");
  const endTime = item?.endTime?.split("T");
  const timediff = timeDiff(startTime[1], endTime[1]);

  const workDurationDetailTypeName = [
    {
      value: "S",
      label: "Start",
    },
    {
      value: "L",
      label: "Lunch",
    },
    {
      value: "D",
      label: "Dinner",
    },
    {
      value: "B",
      label: "Break",
    },
    {
      value: "T",
      label: "Tea",
    },
  ];

  const effectDayOptions = [
    {
      value: 11,
      label: "1",
    },

    {
      value: 12,
      label: "2",
    },
  ];

  const createOptions = (arr) => {
    return arr.map((item) => ({
      value: item.value,
      label: item.label,
    }));
  };

  const makeStartTimeInVal = (value) => {
    const newVals = val.map((el, i) => {
      if (i === index) {
        return {
          ...el,
          startTime: starTime + "T" + value,
        };
      }
      return { ...el };
    });
    setVal(newVals);
  };

  const [effectDay, setEffectDay] = useState(
    effectDayOptions.find((fn) => fn.value === item.effectDay)
  );
  if (!effectDay && edit != undefined && item.id) {
    setEffectDay({
      value: 11,
      label: "1",
    });
  }

  const onOptionChange = (newVal) => {
    const newVals = val.map((el, i) => {
      if (i === index) {
        return { ...el, typeName: newVal.value };
      }
      return { ...el };
    });
    setVal(newVals);
  };

  const onOptionChange2 = (newVal) => {
    const newVals = val.map((el, i) => {
      if (i === index) {
        return { ...el, effectDay: newVal.value };
      }
      return { ...el };
    });
    setEffectDay(newVal);
    setVal(newVals);
  };

  return (
    <Box
      style={{
        display: "flex ",
        backgroundColor: "#fff",
        padding: "5px 0px",
      }}
    >
      <Box style={{ width: "20%" }}>
        <Dropdown
          data={createOptions(workDurationDetailTypeName)}
          caller={onOptionChange}
          month={item.typeName}
        />
      </Box>
      <Box style={{ width: "20%", marginLeft: "5px" }}>
        <Dropdown
          data={createOptions(effectDayOptions)}
          caller={onOptionChange2}
          month={effectDay?.label}
          getoptionlabelkey="label"
        />
      </Box>
      <Box style={{ width: "20%", marginLeft: "5px" }}>
        <EvoTimePicker
          value={startTime?.[1]}
          onChange={(e) => {
            setStartTimeCriteria(e.target.value);
            makeStartTimeInVal(e.target.value);
          }}
        />
      </Box>
      <Box style={{ width: "20%", display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            textAlign: "center",
            marginLeft: "8px",
          }}
        >
          {/* {endTimeCriteria} */}
          {endTime[1] ? endTime[1] : endTime[0]}
        </Typography>
      </Box>
      <Box style={{ width: "20%", display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Inter",
            textAlign: "center",
            marginLeft: "8px",
          }}
        >
          {item.duration || item.duration == 0
            ? Number(item.duration).toFixed(2)
            : timediff && timediff != 0
            ? Number(timediff).toFixed(2)
            : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailRow;
