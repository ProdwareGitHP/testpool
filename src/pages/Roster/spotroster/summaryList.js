const getSummaryValue = (key, oriPagedata) => {
  return "summaryNumbers" in oriPagedata ? oriPagedata.summaryNumbers[key] : 0;
};

export default function getSummaryList(oriPagedata, commonReducer) {
  let statusMap = [
    {
      label: "Total Sch Hrs",
      mappedKey: "totalSchHours",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "",
    },
  ];

  if (commonReducer.selectedProjectObj.role === "Creator") {
    statusMap.push({
      label: "Draft",
      mappedKey: "draft",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "D",
    });
  }
  statusMap.push(
    {
      label: "Pending Approval",
      mappedKey: "pendingApproval",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "PA",
    },
    {
      label: "Correction",
      mappedKey: "correction",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "C",
    },
    {
      label: "Un Published",
      mappedKey: "underPublish",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "UP",
    },
    {
      label: "Published",
      mappedKey: "publish",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "P",
    },
    {
      label: "On Call",
      mappedKey: "onCall",
      mapClass: "totalpersonboxtext3",
      isClickable: true,
      isSelectable: true,
      apprStatus: "ON",
    }
  );

  statusMap = statusMap.map((item) => {
    return {
      ...item,
      value: getSummaryValue(item.mappedKey, oriPagedata),
    };
  });

  return statusMap;
}
