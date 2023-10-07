export default function getSummaryList(payrollData) {
  const statusMap = [
    {
      mappedKey: "pendingToSubmit",
      label: "Pending To Submit",
      value: payrollData?.pendingToSubmit || 0,
      api: "Draft",
      isClickable: true,
      isSelectable: true,
    },
    {
      mappedKey: "underAudit",
      label: "Under Audit",
      value: payrollData?.underAudit || 0,
      api: "Submitted",
      isClickable: true,
      isSelectable: true,
    },
    {
      mappedKey: "needCorrection",
      label: "Need Correction",
      value: payrollData?.needCorrection || 0,
      api: "RMI",
      isClickable: true,
      isSelectable: true,
    },
    {
      mappedKey: "readyForPayroll",
      label: "Ready For Payroll",
      value: payrollData?.readyForPayroll || 0,
      api: "Approved",
      isClickable: true,
      isSelectable: true,
    },
    {
      mappedKey: "transferred",
      label: "Transfered",
      value: payrollData?.transferred || 0,
      api: "Transferred",
      isClickable: true,
      isSelectable: true,
    },
  ];

  if (payrollData?.hours) {
    Object.entries(payrollData.hours).map((hour, index) => {
      statusMap.push({
        mappedKey: hour[0],
        label: hour[0],
        value: hour[1] ? Number(hour[1]).toFixed(2) : hour[1],
        isClickable: false,
        isSelectable: false,
      });
    });
  }

  statusMap.push({
    mappedKey: "totalPerson",
    label: "Total Person",
    value: payrollData?.totalPerson || 0,
    api: "All",
    isClickable: true,
    isSelectable: true,
  });

  return statusMap;
}
