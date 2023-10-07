import { Box, Tooltip, Typography } from "@mui/material";
import { SelectColumn } from "react-data-grid";
import { PersonButton } from "../../components/PersonButton";
import {
  dateConverter,
  datetimeConverter,
  getSelectIndex,
  parseFloatValue,
  timeConverter,
} from "../../utils/commonService";

import { Link } from "react-router-dom";
import CustomCheckBox from "../CustomCheckBox";
import { EvoHBox } from "../EvoBox";
import Dropdown from "../EvoDropDown";
import EvoLookup from "../EvoLookup";
import { ActionButton } from "./ActionButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { CustomTextField } from "../TextField";
import EvoDayPicker from "../EvoDateTime/day";
// import { getSelectIndex } from "../../pages/RosterRules/Utils";
import { CopyButton } from "./CopyButton";

const StyledBox = (props) => {
  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: props.align || "left",
        ...props?.styleProps,
      }}
    >
      {props.children}
    </Box>
  );
};

const customNumberCell = () => {
  return ({ column, row }) => (
    <EvoHBox justifyContent="right">
      <Typography sx={{ p: "0px 10px", fontSize: "14px", mt: 1 }}>
        {row[column.key]}
      </Typography>
    </EvoHBox>
  );
};

const customFloatCell = () => {
  const getValue = ({ column, row }) => {
    return parseFloatValue(row[column.key], column.decimalDigit);
    //return value && value.trim() != "" ? Number(value).toFixed(2) : value;
  };
  return (props) => (
    <EvoHBox justifyContent="right" style={{ paddingRight: "8px" }}>
      {getValue(props)}
    </EvoHBox>
  );
};

const customNHeaderCell = (justifyContent) => {
  return ({ column }) => (
    <EvoHBox justifyContent={justifyContent}>{column.name}</EvoHBox>
  );
};

const customEditorCell = (item) => {
  return ({ row }) => (
    <EvoHBox justifyContent={"center"} style={{ marginTop: "5px" }}>
      <EditButton editData={row} item={item} />
    </EvoHBox>
  );
};

const customCopyCell = (item) => {
  return ({ row }) => (
    <EvoHBox justifyContent={"center"} style={{ marginTop: "5px" }}>
      <CopyButton editData={row} item={item} />
    </EvoHBox>
  );
};

const customDeleteCell = (item) => {
  return ({ row }) => (
    <EvoHBox justifyContent={"center"} style={{ marginTop: "5px" }}>
      <DeleteButton deleteData={row} item={item} />
    </EvoHBox>
  );
};

const customLinkCell = () => {
  return ({ row, column }) => (
    <EvoHBox>
      <Link style={{ cursor: "pointer" }}>{row[column?.key]}</Link>
    </EvoHBox>
  );
};

const customLookUpCell = () => {
  return ({ row, column }) => {
    const onSelect = (selectedItem) =>
      column.selectItem(selectedItem, row.index);

    return (
      <Box sx={{ p: "0px 10px", fontSize: "14px", mt: 0.5 }}>
        <EvoLookup
          {...column.editorProps}
          item={row}
          selectItem={onSelect}
          template={column.templateMethod(row)}
          columnKey={column.key}
          readOnlyValue={column.readOnlyValue}
        />
      </Box>
    );
  };
};

const customDropdownCell = ({ row, column }) => {
  const columnKey = column?.columnKey;
  const rowIndex = "index" in row ? row.index : "";
  var index = columnKey ? columnKey : rowIndex;

  var { data, selectedId, selectIndex } = column.editorProps;
  var selectIndex = selectedId
    ? getSelectIndex(data, selectedId, row[column.key])
    : selectIndex;
  const month = selectIndex >= 0 ? data[selectIndex] : {};
  return (
    <EvoHBox style={{ padding: "0px 10px", marginTop: "4px" }}>
      <Dropdown
        month={month}
        {...column.editorProps}
        caller={(value) => {
          column.editorProps.caller(index, value);
        }}
        selectIndex={selectIndex}
      />
    </EvoHBox>
  );
};

const customActionCell = (item) => {
  return ({ row }) => (
    <EvoHBox justifyContent={"center"}>
      <ActionButton data={row} item={item} />
    </EvoHBox>
  );
};

const customDateCell = () => {
  return ({ column, row }) => (
    <EvoHBox>
      <Typography sx={{ p: "0px 10px", fontSize: "14px", mt: 1 }}>
        {dateConverter(row[column.key])}
      </Typography>
    </EvoHBox>
  );
};

const customTimeCell = () => {
  return ({ column, row }) => (
    <EvoHBox>
      <Typography sx={{ p: "0px 10px", fontSize: "14px", mt: 1 }}>
        {timeConverter(row[column.key])}
      </Typography>
    </EvoHBox>
  );
};

const customDatetimeCell = () => {
  return ({ column, row }) => (
    <EvoHBox>
      <Typography sx={{ p: "0px 10px", fontSize: "14px", mt: 1 }}>
        {datetimeConverter(row[column.key])}
      </Typography>
    </EvoHBox>
  );
};

const customPersonCell = () => {
  return ({ column, row }) =>
    row["employeeNumber"] ? (
      <PersonButton
        personName={row[column.key]}
        personId={row["personId"]}
        employeeNumber={row["employeeNumber"]}
        status={true}
      />
    ) : (
      <PersonButton displayName={row[column.key]} />
    );
};
const customSummaryCell = () => {
  return ({ column, row }) => {
    let flag = column?.colLength + 2 === Object.keys(row)?.length;
    return (
      <Box
        style={
          flag
            ? { ...column.styleProps, backgroundColor: row.backgroundColor }
            : { padding: "0px 10px" }
        }
      >
        {row[column.key]}
      </Box>
    );
  };
};

const customCheckBoxCell = (tableLabel, handleChangeCheck) => {
  return ({ column, row }) => {
    handleChangeCheck = handleChangeCheck || column.handleChangeCheck;
    let value = row[column.key];
    if (value == "C") {
      return (
        <CustomCheckBox
          check={true}
          onChangeCheck={(e) =>
            handleChangeCheck(tableLabel, row.index, column.key, e ? "C" : "Y")
          }
        />
      );
    } else if (value == "Y") {
      return (
        <CustomCheckBox
          check={false}
          onChangeCheck={(e) =>
            handleChangeCheck(tableLabel, row.index, column.key, e ? "C" : "Y")
          }
        />
      );
    }
  };
};

const customDayPickerCell = () => {
  return ({ column, row }) => {
    return (
      <EvoDayPicker
        containerStyles={{ margin: 0 }}
        styles={{ margin: 0 }}
        hasLabel={column.hasLabel}
        disabled={column.disabled}
        selectedDays={row[column.key]}
        onChange={(e) => column.onChange(e, row.index)}
        {...column.editorProps}
      />
    );
  };
};
const customTextCell = (item) => {
  return ({ row, column }) => {
    return (
      <EvoHBox style={{ padding: "0px 10px", marginTop: "4px" }}>
        <CustomTextField
          value={row[column.key] || column?.value}
          style={{ textAlign: column?.textAlign || "left" }}
          onChange={(e) => {
            if (column?.onChange) {
              column?.onChange(e.target.value, row?.index);
            }
          }}
          {...column?.editorProps}
        />
      </EvoHBox>
    );
  };
};
const customDefaultTextCell = () => {
  return ({ row, column }) => {
    return (
      <EvoHBox>
        <Tooltip title={row[column.key]}>
          <Typography
            sx={{
              p: "0px 10px",
              fontSize: "14px",
              mt: 1,
              overflow: "hidden",

              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row[column.key]}
          </Typography>
        </Tooltip>
      </EvoHBox>
    );
  };
};

export default function enrichColumn(
  columns,
  addSelectColumn,
  RowEditorModal,
  rowUpdated,
  tableLabel,
  handleChangeCheck,
  isSingleSelection,
  multiFilterSelection
) {
  if (RowEditorModal) {
    columns.unshift({
      key: "action",
      name: "Action",
      type: "editor",
      Editor: RowEditorModal,
      onUpdated: rowUpdated,
    });
  }

  var localColumns = columns.map((item) => {
    switch (item?.type) {
      case "number":
        return {
          width: 100,
          ...item,
          renderCell: customNumberCell(),
          renderHeaderCell: customNHeaderCell("right"),
        };

      case "float":
        return {
          width: 100,
          ...item,
          renderCell: customFloatCell(),
          renderHeaderCell: customNHeaderCell("right"),
        };

      case "date":
        return {
          width: 120,
          ...item,
          renderCell: customDateCell(),
        };

      case "datetime":
        return {
          width: 150,
          ...item,
          renderCell: customDatetimeCell(),
        };

      case "time":
        return {
          width: 100,
          ...item,
          renderCell: customTimeCell(),
        };

      case "icon":
        return {
          width: 60,
          ...item,
          renderHeaderCell: customNHeaderCell("center"),
        };

      case "person":
        return {
          ...item,
          width: 200,
          renderCell: customPersonCell(),
        };

      case "editor":
        return {
          ...item,
          width: 60,
          renderCell: customEditorCell(item),
          renderHeaderCell: customNHeaderCell("center"),
        };
      case "copy":
        return {
          ...item,
          width: 60,
          renderCell: customCopyCell(item),
          renderHeaderCell: customNHeaderCell("center"),
        };

      case "action":
        return {
          width: 60,
          ...item,
          renderCell: customActionCell(item),
          renderHeaderCell: customNHeaderCell("right"),
        };
      case "checkBox":
        return {
          width: 60,
          ...item,
          renderCell: customCheckBoxCell(tableLabel, handleChangeCheck),
          renderHeaderCell: customNHeaderCell("center"),
        };
      case "lookup":
        return {
          width: 250,
          ...item,
          renderCell: customLookUpCell(item),
          renderHeaderCell: customNHeaderCell("left"),
        };
      case "dropdown":
        return {
          width: 200,
          ...item,
          renderCell: customDropdownCell,
        };
      case "summaryColumn":
        return {
          width: 200,
          ...item,
          renderCell: customSummaryCell(),
        };
      case "delete":
        return {
          width: 60,
          ...item,
          renderCell: customDeleteCell(item),
          renderHeaderCell: customNHeaderCell("center"),
        };

      case "link":
        return {
          width: 60,
          ...item,
          renderCell: customLinkCell(),
          renderHeaderCell: customNHeaderCell("center"),
        };
      case "text":
        return {
          width: 80,
          ...item,
          renderCell: customTextCell(item),
          renderHeaderCell: customNHeaderCell("center"),
        };

      case "day":
        return {
          width: 80,
          ...item,
          renderCell: customDayPickerCell(),
        };

      default:
        var col = {};
        if (!("type" in item) && !("renderCell" in item)) {
          col.renderCell = customDefaultTextCell();
        }

        return {
          width: 100,
          ...item,
          ...col,
        };
    }
  });

  if (isSingleSelection) {
    delete SelectColumn["renderHeaderCell"];
  }
  var tableColumns = addSelectColumn
    ? [SelectColumn, ...localColumns]
    : [...localColumns];

  return tableColumns;
}
