import {
  _renderViolationCardInfo,
  setCardValueByType,
  setCardValueByTypeCode,
  uniqueArrByKey,
} from "../../contants";

export default function getTeamSummaryList(oriPagedata) {
  const statusMap = [
    {
      label: "Total Person",
      mappedKey: "totalPerson",
      color:"#47BDEF",
      mapClass: "totalpersonboxtext1",
      value: uniqueArrByKey(oriPagedata, "personId").length,
      isClickable: false,
      isSelectable: false,
    },
    {
      label: "Scheduled Hrs",
      mappedKey: "schHrs",
      color:"#3CAF85",
      mapClass: "totalpersonboxtext1",
      value: setCardValueByType("schHrs", oriPagedata),
      isClickable: true,
      isSelectable: true,
    },
    {
      label: "Working Hours",
      mappedKey: "actHrs",
      color:"#4A85C5",
      mapClass: "totalpersonboxtext2",
      value: setCardValueByType("actHrs", oriPagedata),
      isClickable: false,
      isSelectable: false,
    },
    {
      label: "No Show No Reason",
      mapClass: "totalpersonboxtext2",
      color:"#EE6EAB",
      value: setCardValueByTypeCode("No Show No Reason", oriPagedata),
      mappedKey: "noShowNoReason",
      isClickable: true,
      isSelectable: true,
    },
    {
      label: "Late",
      mapClass: "totalpersonboxtext2",
      color:"#EE6EAB",
      value: setCardValueByTypeCode("Late", oriPagedata),
      mappedKey: "late",
      isClickable: true,
      isSelectable: true,
    },
    {
      label: "Left Early",
      mapClass: "totalpersonboxtext2",
      color:"#EE6EAB",
      value: setCardValueByTypeCode("Left Early", oriPagedata),
      mappedKey: "leftEarly",
      isClickable: true,
      isSelectable: true,
    },
  ];
  return statusMap;
}
