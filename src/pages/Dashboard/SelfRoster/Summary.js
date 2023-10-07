import { Box } from "@mui/material";

export const Summary = ({data}) => {
  return (
    <Box sx={styles.container}>
      {data.map((el) => {
        return (
          <Box sx={styles.parentBox}>
            <Box sx={styles.box1}>
              {el.required ? <span style={styles.required}>*</span> : ""}
              {el.label}
            </Box>
            <Box sx={styles.box2}>{el.name}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

const styles = {
  container: {
    paddingTop: '16px'
  },
  parentBox: {
    display: "flex",
  },
  box1: {
    flexBasis: '150px',
    textAlign: "right",
    marginRight: "16px",
    fontSize: "14px",
    fontWeight: "bold",
    paddingBottom: '16px'
  },
  box2: {
    fontSize: "14px",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  required: {
    color: 'blue'
  }
};
