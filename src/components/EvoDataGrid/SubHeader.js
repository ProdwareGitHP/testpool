import { Box, Divider, Stack, Typography } from "@mui/material";
import { EvoHBox } from "../EvoBox";

const SubHeader = ({ column }) => {
  return (
    <Stack divider={<Divider style={{ height: 2 }} />}>
      <Typography
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "6px",
        }}
      >
        {column.name}
      </Typography>
      <EvoHBox divider gap={0.1}>
        {column.cells.map((cell) => (
          <Box
            style={{
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              paddingRight: "4px",
              width: column.cellWidth,
            }}
          >
            <Typography
              noWrap
              style={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {cell}
            </Typography>
          </Box>
        ))}
      </EvoHBox>
    </Stack>
  );
};

export default SubHeader;
