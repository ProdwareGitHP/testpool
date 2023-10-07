import { Grid, Typography } from "@mui/material";
import EvoDataGrid from "../../../components/EvoDataGrid";

export const PublishedTable = ({ data, columns }) => {

  return (
    <Grid>
      <EvoDataGrid
          hideHeader
          height={600}
          // filterId={"employeeNumber"}
          columns={columns}
          rows={data}
          title='Shift schedule for user from date to date'
          isSingleSelection
          handleChange={() => {console.log('my click')}}
          // isLoading={isLoading}
          // HeaderComponent={HeaderComponent}
          // addSelectColumn={!apprStatus}
          // selectedRows={selectedRows}
          // setSelectedRows={setSelectedRows}
          // exportOptions={{ fileName: "timesheets" }}
        />
    </Grid>
  );
};

const styles = {
  row: {
    display: "flex",
    paddingTop: "1px",
    borderBottom: "1px solid #e0e0e0",
    height: "40px",
  },
  flexed: {
    display: "flex",
    alignItems: "center",
  },
};
