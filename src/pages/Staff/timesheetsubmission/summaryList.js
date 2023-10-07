import { paycodes, uniqueArrByKey, setCardValueByType } from "../../contants";

export default function getSummaryList(oriPagedata) {
  const statusMap = [
    {
      label: "Total Person",
      mappedKey: "totalPerson",
      mapClass: "totalpersonboxtext1",
      value: uniqueArrByKey(oriPagedata, "personId").length,
      isClickable: false,
      isSelectable: false,
    },
    {
      label: "Scheduled Hrs",
      mappedKey: "schHrs",
      mapClass: "totalpersonboxtext3",
      value: setCardValueByType("schHrs", oriPagedata),
      isClickable: false,
      isSelectable: false,
    },
    {
      label: "Working Hrs",
      mappedKey: "wrkHrs",
      mapClass: "totalpersonboxtext3",
      value: setCardValueByType("wrkHrs", oriPagedata),
      isClickable: false,
      isSelectable: false,
    },
  ];

  paycodes.forEach(({ code, npayCodeName, color }) => {
    if (setCardValueByType(code, oriPagedata) > 0)
      statusMap.push({
        label: npayCodeName,
        mappedKey: "code",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType(code, oriPagedata),
        isClickable: false,
        isSelectable: false,
      });
  });

  statusMap.push(
    ...[
      {
        label: "Paid Leave Hrs",
        mappedKey: "paidLeaveHrs",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("paidLeaveHrs", oriPagedata),
        isClickable: false,
        isSelectable: false,
      },
      {
        label: "Unpaid Leave Hrs",
        mappedKey: "unpaidLeaveHrs",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("unpaidLeaveHrs", oriPagedata),
        isClickable: false,
        isSelectable: false,
      },
      {
        label: "Holiday Hrs",
        mappedKey: "holidayHours",
        mapClass: "totalpersonboxtext3",
        value: setCardValueByType("holidayHours", oriPagedata),
        isClickable: false,
        isSelectable: false,
      },
    ]
  );

  return statusMap;
}
