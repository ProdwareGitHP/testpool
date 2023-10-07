import { Box, Typography } from "@mui/material";
import React from "react";
import { EvoDataForm } from "../../../components/EvoDataForm";

export default function BalanceDetails({ item }) {
  const formData = {
    labelColor: "#788DC9",
    gap: 1,
    labelWidth: 80,
    readOnly: true,
    items: [
      {
        label: "Sch. Hrs",
        value: item.schHrs,
        type: "float",
      },
      {
        label: "Act. Hrs",
        value: item.actHrs,
        type: "float",
      },
      {
        label: "Sch. Person",
        value: item.schPerson,
      },
      {
        label: "Leave Hrs",
        value: item.leaveHrs,
      },
      {
        label: "Holiday Hrs",
        value: item.holidayHrs,
      },
      {
        label: "Offc. Hrs",
        value: item.offcHrs,
      },
      {
        label: "Pers. Hrs",
        value: item.persHrs,
      },
    ],
  };

  return (
    <Box>
      <Typography
        style={{
          fontSize: "16px",
          fontWeight: "bolder",
          fontFamily: "Inter",
          color: "#788DC9",
        }}
      >
        Balances
      </Typography>

      <EvoDataForm formData={formData} />
    </Box>
  );
}
