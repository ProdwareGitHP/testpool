import { CustomDialog } from "../../../components/CustomDialog";
import CustomSummaryData from "../../../components/CustomSummaryData";
import { EvoDataForm } from "../../../components/EvoDataForm";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { Summary } from "./Summary";

export const EditSelfRoster = ({
  showEditModal,
  onCloseEdit,
  calendarData,
  calendarColumns,
  approvalHistoryMock,
  approvalHistoryColumns,
  editInputData,
}) => {
  return (
    <>
      <CustomDialog
        title="Self Roster"
        open={showEditModal}
        handleClose={onCloseEdit}
        // isLoading={isLoading}
      >
        <EvoDataForm formData={editInputData} />
        {/* <Summary data={editInputData}/> */}
        <EvoDataGrid columns={calendarColumns} rows={calendarData} />
        <EvoDataGrid
          columns={approvalHistoryColumns}
          rows={approvalHistoryMock}
          title="Approval History"
        />
      </CustomDialog>
    </>
  );
};
