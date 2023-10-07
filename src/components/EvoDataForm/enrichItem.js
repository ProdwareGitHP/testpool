import { Typography } from "@mui/material";
import CustomCheckBox from "../CustomCheckBox";
import EvoDatePicker from "../EvoDateTime/date";
import EvoDayPicker from "../EvoDateTime/day";
import EvoTimePicker from "../EvoDateTime/time";
import EvoTimeRangePicker from "../EvoDateTime/timerange";
import Dropdown from "../EvoDropDown";
import EvoLookup from "../EvoLookup";
import { CustomTextField } from "../TextField";

export function getEditor(item) {
  switch (item?.type) {
    case "date":
      return (
        <EvoDatePicker
          styles={item.styles}
          selected={item.value}
          onSelect={item.onChange}
          filterMethod={item?.filterMethod}
        />
      );

    case "day":
      return (
        <EvoDayPicker
          selectedDays={item.value}
          onChange={item.onChange}
          {...item.editorProps}
        />
      );

    case "time":
      return <EvoTimePicker value={item.value} onChange={item.onChange} />;

    case "timerange":
      return <EvoTimeRangePicker value={item.value} onChange={item.onChange} />;

    case "dropdown":
      return <Dropdown {...item.editorProps} />;

    case "lookup":
      return <EvoLookup item={item.value} {...item.editorProps} />;

    case "checkbox":
      return (
        <CustomCheckBox check={item.value} onChangeCheck={item.onChangeCheck} />
      );

    default:
      return (
        <CustomTextField
          textAlign={item.textAlign}
          value={item.value}
          onChange={item.onChange}
          // onChange={(e) => item.onChange(e.target.value)}
          {...item.editorProps}
        />
      );
  }
}
