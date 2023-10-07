import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import EmployeeModal from "../pages/Staff/managerdashboard/EmployeeModal";

export const PersonButton = ({
  personId,
  personName,
  employeeNumber,
  displayName,
  status,
}) => {
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const classes = makeStyles(() => ({
    link: {
      fontSize: "14px",
      color: "#124590",
      textDecoration: "none",
      "&:hover": {
        "text-decoration": "underline",
      },
      padding: "0px 10px",
      // fontFamily: "Inter",
    },
    text: {
      fontSize: "14px",
      color: "#000",
      textDecoration: "none",
      "&:hover": {
        "text-decoration": "none",
      },
      fontWeight: 600,
      // fontFamily: "Inter",
      cursor: "text",
      padding: "0px 10px",
    },
  }))();
  if (personName || displayName)
    return (
      <>
        <Box>
          <Link
            onClick={() => {
              if (status === true) setEmployeeOpen(true);
              else setEmployeeOpen(false);
            }}
            className={status ? classes.link : classes.text}
          >
            <Typography variant="span">
              {displayName || `${personName} [${employeeNumber}]`}
            </Typography>
          </Link>
        </Box>
        {employeeOpen && (
          <EmployeeModal
            setEmployeeOpen={setEmployeeOpen}
            personId={personId}
          />
        )}
      </>
    );
};
