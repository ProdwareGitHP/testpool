import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import CustomCheckBox from "../../../components/CustomCheckBox";
import EvoDatePicker from "../../../components/EvoDateTime/date";
import EvoTimePicker from "../../../components/EvoDateTime/time";
import { dateDayConverter, timeConverter } from "../../../utils/commonService";
import AttachmentList from "./attachmentList";
import EvoErrorBoundary from "../../../components/EvoErrorBoundary";

import {
  DestinationRosterSelector,
  ReasonSelector,
  RequestTypeSelector,
  SourceRosterSelector,
} from "./selectors";
import EvoDayPicker from "../../../components/EvoDateTime/day";
import { EvoHBox } from "../../../components/EvoBox";

export const RequestDetail = ({ requestData, editable, updateRequestData }) => {
  const [CheckDays, setCheckDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });
  const {
    requestMasterId,
    requestName,
    reqCode,
    requestReason,
    effectiveDate,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    newTimeStart,
    newTimeEnd,
    spersonRosterId,
    sroster,
    dpersonRosterId,
    droster,
    comments,
    specificDays,
    personId,
  } = requestData;

  const items = [
    {
      label: "Request Type",
      value: requestName,
      requiredFor: "*",
      Editor: (
        <RequestTypeSelector
          personId={personId}
          onSelect={(requestType) => updateRequestData({ ...requestType })}
        />
      ),
    },
    {
      label: "Reason",
      value: requestReason,
      reqCode: reqCode,
      showFor: ["OFFC", "PUNCH"],
      Editor: (
        <ReasonSelector
          requestMasterId={requestMasterId}
          onSelect={({ requestReasonId, reason }) =>
            updateRequestData({ requestReasonId, reason })
          }
        />
      ),
    },
    {
      label: "Effective Date",
      value: dateStart,
      reqCode: reqCode,
      required: true,
      type: "dateDay",
      showFor: ["DOFF", "PUNCH", "SH_CHG", "SW_SH"],
      requiredFor: ["DOFF", "PUNCH", "SH_CHG", "SW_SH"],
      Editor: (
        <EvoDatePicker
          selected={effectiveDate}
          minDate={["DOFF", "SH_CHG"].includes(reqCode) ? new Date() : null}
          maxDate={reqCode === "PUNCH" ? new Date() : null}
          onSelect={(effectiveDate) => updateRequestData({ effectiveDate })}
        />
      ),
    },
    {
      label: "Start Date",
      value: dateStart,
      reqCode: reqCode,
      required: true,
      type: "dateDay",
      showFor: ["OFFC", "PER"],
      requiredFor: ["OFFC", "PER"],
      Editor: (
        <EvoDatePicker
          selected={dateStart}
          onSelect={(dateStart) => updateRequestData({ dateStart })}
        />
      ),
    },
    {
      label: "End Date",
      value: dateEnd,
      reqCode: reqCode,
      required: true,
      type: "dateDay",
      showFor: ["OFFC", "PER"],
      requiredFor: ["OFFC", "PER"],
      Editor: (
        <EvoDatePicker
          selected={dateEnd}
          minDate={dateStart}
          onSelect={(dateEnd) => updateRequestData({ dateEnd })}
        />
      ),
    },
    {
      label: "Time Start",
      value: timeStart,
      reqCode: reqCode,
      type: "time",
      showFor: ["DOFF", "OFFC", "PER", "PUNCH", "SH_CHG"],
      requiredFor: ["DOFF", "OFFC", "SH_CHG"],
      Editor:
        reqCode === "SH_CHG" ? (
          false
        ) : (
          <EvoTimePicker
            value={timeStart}
            onChange={(timeStart) => updateRequestData({ timeStart })}
          />
        ),
    },
    {
      label: "Time End",
      value: timeEnd,
      reqCode: reqCode,
      type: "time",
      showFor: ["DOFF", "OFFC", "PER", "PUNCH", "SH_CHG"],
      requiredFor: ["DOFF", "OFFC", "SH_CHG"],
      Editor:
        reqCode === "SH_CHG" ? (
          false
        ) : (
          <EvoTimePicker
            value={timeEnd}
            onChange={(timeEnd) => updateRequestData({ timeEnd })}
          />
        ),
    },
    {
      label: "New Time Start",
      value: newTimeStart,
      reqCode: reqCode,
      type: "time",
      showFor: ["SH_CHG"],
      requiredFor: ["SH_CHG"],
      Editor: (
        <EvoTimePicker
          value={newTimeStart}
          onChange={(newTimeStart) => updateRequestData({ newTimeStart })}
        />
      ),
    },
    {
      label: "New Time End",
      value: newTimeEnd,
      reqCode: reqCode,
      type: "time",
      showFor: ["SH_CHG"],
      requiredFor: ["SH_CHG"],
      Editor: (
        <EvoTimePicker
          value={newTimeEnd}
          onChange={(newTimeEnd) => updateRequestData({ newTimeEnd })}
        />
      ),
    },
    {
      label: "Source Roster",
      value: sroster,
      reqCode: reqCode,
      showFor: ["SW_SH"],
      requiredFor: ["SW_SH"],
      Editor: (
        <SourceRosterSelector
          effectiveDate={effectiveDate}
          personId={personId}
          onSelect={({ personRosterId, roster }) => {
            updateRequestData({
              spersonRosterId: personRosterId,
              sroster: roster,
            });
          }}
        />
      ),
    },
    {
      label: "Destination Roster",
      value: droster,
      reqCode: reqCode,
      showFor: ["SW_SH"],
      requiredFor: ["SW_SH"],
      Editor: (
        <DestinationRosterSelector
          spersonRosterId={spersonRosterId}
          personId={personId}
          onSelect={({ dpersonRosterId, destinationRoster }) =>
            updateRequestData({ dpersonRosterId, droster: destinationRoster })
          }
        />
      ),
    },
    {
      label: "Comments",
      value: comments,
      reqCode: reqCode,
      showFor: ["DOFF", "OFFC", "PER", "PUNCH", "SH_CHG", "SW_SH"],
      Editor: (
        <TextField
          multiline
          style={{ width: 250 }}
          maxRows={5}
          type="text"
          onChange={(e) =>
            updateRequestData({
              comments: e.target.value,
            })
          }
          InputProps={{
            style: {
              padding: "4px 6px",
            },
          }}
          value={comments}
        />
      ),
    },
    {
      label: "Specific Days",
      value: specificDays === "S" ? "Y" : "__",
      reqCode: reqCode,
      showFor: ["OFFC", "PER"],
      Editor: (
        <Box style={{ marginLeft: "-10px" }}>
          <CustomCheckBox
            isChecked={specificDays === "S" ? true : false}
            onChangeCheck={(checked) => {
              updateRequestData({
                specificDays: checked ? "S" : "A",
              });
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <EvoHBox alignItems="start" justifyContent="space-between">
      <Box>
        {items.map(
          ({
            label,
            value,
            reqCode,
            showFor,
            requiredFor = [],
            type,
            Editor,
          }) => {
            if (!showFor || showFor.includes(reqCode)) {
              return (
                <Grid
                  container
                  alignItems="center"
                  key={label}
                  style={{
                    //backgroundColor: "lightgreen",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  <Grid style={{ width: 150 }}>
                    <Typography
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      <Box textAlign="right" mr={2}>
                        {editable &&
                          (requiredFor === "*" ||
                            requiredFor.includes(reqCode)) &&
                          "* "}
                        {label}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs="auto">
                    {editable && Editor ? (
                      <EvoErrorBoundary small>{Editor}</EvoErrorBoundary>
                    ) : (
                      <Typography style={{ fontSize: "14px" }}>
                        <Box>
                          {type === "dateDay"
                            ? dateDayConverter(value)
                            : type === "time"
                            ? timeConverter(value)
                            : value}
                        </Box>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              );
            }
          }
        )}

        {(reqCode == "OFFC" || reqCode == "PER") && specificDays === "S" ? (
          <EvoDayPicker selectedDays={CheckDays} onChange={setCheckDays} />
        ) : null}
      </Box>

      <AttachmentList editable={editable} />
    </EvoHBox>
  );
};
