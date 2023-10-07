import React, { useState, useEffect } from "react";
import EvoDataGrid from "../../../components/EvoDataGrid";
import { Grid, Typography, Input, Box } from "@mui/material";
import { EvoVBox } from "../../../components/EvoBox";

export default function AttachmentList({ editable }) {
  console.log(typeof (editable));
  const [files, setFiles] = useState([]);
  const handleFileUpload = (event) => {
    const newFiles = [...files];
    newFiles.push(event.target.files[0]);
    setFiles(newFiles);
  };
  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  let tableColumns = [
    {
      key: "sr",
      name: "#",
      width: 10,
    },
    {
      key: "name",
      name: "FileName",
      width: 180,
    }
  ];
  if (editable === true) {
    tableColumns.push(
      ...[
        {
          key: "remove",
          name: "Delete",
          type: "delete",
          onDeleted: handleDelete,
        }
      ]
    )
  }
  return (
    <EvoVBox>
      {/* <Input type="file" onChange={handleFileUpload} /> */}
      <EvoDataGrid
        columns={tableColumns}
        rows={files}
        HeaderComponent={() => (
          <Grid>
            <Typography style={{ fontSize: 15, fontWeight: "bold" }}>
              Attachment(s)
            </Typography>
            {editable && (
              <Box sx={{ mt: 1 }}>
                <Input type="file" onChange={handleFileUpload} />
              </Box>
            )}
          </Grid>
        )}
      />
    </EvoVBox>
  );
}
