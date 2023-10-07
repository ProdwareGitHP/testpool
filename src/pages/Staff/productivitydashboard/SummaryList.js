import { paycodes, setCardValueByType, uniqueArrByKey } from "../../contants";

export default function getSummaryList(TableData, summaryData) {
  const summaryList = [
    {
      label: "Total Person",
      mappedKey: "personId",
      mapClass: "totalpersonboxtext3",
      value: uniqueArrByKey(TableData, "personId").length,
      isClickable: false,
      isSelectable: false,
      color: "#38f269",
    },
    {
      label: "Scheduled Hrs",
      mappedKey: "schHrs",
      mapClass: "totalpersonboxtext3",
      value: setCardValueByType("schHrs", TableData),
      isClickable: false,
      isSelectable: false,
      color: "#124590",
    },

    {
      label: "Working Hrs",
      mappedKey: "wrkHrs",
      mapClass: "totalpersonboxtext3",
      value: setCardValueByType("wrkHrs", TableData),
      isClickable: false,
      isSelectable: false,
      color: "#73B3E3",
    },
  ];

  paycodes.forEach(({ code, npayCodeName, color }) => {
    if (setCardValueByType(npayCodeName, summaryData) > 0)
      summaryList.push({
        label: npayCodeName,
        mappedKey: "code",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType(npayCodeName, summaryData),
        isClickable: false,
        isSelectable: false,
      });
  });
  summaryList.push(
    ...[
      {
        label: "Paid Leave Hrs",
        mappedKey: "paidLeaveHrs",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("paidLeaveHrs", TableData),
        isClickable: false,
        isSelectable: false,
        color: "#d42506",
      },
      {
        label: "Unpaid Leave Hrs",
        mappedKey: "unpaidLeaveHrs",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("unpaidLeaveHrs", TableData),
        isClickable: false,
        isSelectable: false,
        color: "#fa0515",
      },
      {
        label: "Holiday Hrs",
        mappedKey: "holidayHours",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("holidayHours", TableData),
        isClickable: false,
        isSelectable: false,
        color: "#a19f9f",
      },
      {
        label: "Official Permission Hrs",
        mappedKey: "offPermReqHrs",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("offPermReqHrs", TableData),
        isClickable: false,
        isSelectable: false,
        color: "#a19f9f",
      },
    ]
  );

  return summaryList;
}
