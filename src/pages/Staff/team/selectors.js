import React from "react";
import Dropdown from "../../../components/EvoDropDown";
import {dateConverter} from "../../../utils/commonService";
import {
  useGetDestinationRoster,
  useGetReasonList,
  useGetRequestTypeList,
  useGetSourceRoaster,
} from "../../../services/team";

export function RequestTypeSelector({ onSelect, personId }) {
  const { data: requestTypes } = useGetRequestTypeList({ personId });

  return (
    <Dropdown
      data={requestTypes}
      caller={onSelect}
      width={180}
      selectIndex={1}
      getoptionlabelkey="requestName"
    />
  );
}

export function ReasonSelector({ reason, onSelect, requestMasterId }) {
  const { data: reasons } = useGetReasonList({ requestMasterId });

  return (
    <Dropdown
      data={reasons}
      caller={onSelect}
      month={reason}
      width={360}
      getoptionlabelkey="reason"
    />
  );
}

export function SourceRosterSelector({ onSelect, personId, effectiveDate }) {
  const { data: sourceRosters } = useGetSourceRoaster({
    personId,
    effectiveDate:dateConverter(effectiveDate),
  });

  return (
    <Dropdown
      data={sourceRosters}
      caller={onSelect}
      // month={selectedRequestType}
      width={180}
      getoptionlabelkey="roster"
    />
  );
}

export function DestinationRosterSelector({
  onSelect,
  personId,
  spersonRosterId,
}) {
  const { data: destinationRosters } = useGetDestinationRoster(
    {
      personRosterId: spersonRosterId,
      personId: personId,
    },
    spersonRosterId ? false : true
  );

  return (
    <Dropdown
      data={destinationRosters}
      caller={onSelect}
      // month={selectedRequestType}
      width={180}
      getoptionlabelkey="roster"
    />
  );
}
