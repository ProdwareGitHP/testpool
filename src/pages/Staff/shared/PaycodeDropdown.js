import React from "react";
import Dropdown from "../../../components/EvoDropDown";
import { paycodes } from "../../contants";

const allPaycode = [
  { code: "all", npayCodeName: "All PayCode", payCodeId: 1 },
  ...paycodes,
];

const PaycodeDropdown = ({ setPaycode }) => {
  return (
    <Dropdown
      selectIndex={0}
      data={allPaycode}
      caller={setPaycode}
      getoptionlabelkey="npayCodeName"
    />
  );
};

export default PaycodeDropdown;
