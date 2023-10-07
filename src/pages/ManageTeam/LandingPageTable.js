import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const LandingPageTable = (props) => {
  const { rows, openEdit, editData } = props;
  const [clicked, setClicked] = useState(-1);

  const classes = useStyles();
  return (
    <>
      <Box className={classes.mainbox}>
        <Box className={classes.innermainbox}>
          <Box className={classes.innerboxworkduration}>
            <Box style={{ width: "10%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  textAlign: "center",
                }}
              >
                Action
              </Typography>
            </Box>
            <Box style={{ width: "10%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  textAlign: "center",

                  // marginLeft: "5px",
                }}
              >
                Team
              </Typography>
            </Box>
            <Box style={{ width: "10%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  textAlign: "center",

                  // marginLeft: "15px",
                }}
              >
                Active From Day
              </Typography>
            </Box>
            <Box style={{ width: "10%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  textAlign: "center",

                  // marginLeft: "15px",
                }}
              >
                Active Days
              </Typography>
            </Box>
            <Box style={{ width: "10%" }}>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  textAlign: "center",

                  // marginLeft: "5px",
                }}
              >
                Enable
              </Typography>
            </Box>
          </Box>
          <Box style={{ maxHeight: "45vh", marginTop: "35px" }}>
            {rows?.length > 0 &&
              rows?.map((item) => {
                let saved = false;
                if (clicked == item.teamId) {
                  saved = true;
                } else if (clicked == item.teamName) {
                  saved = true;
                }
                return (
                  <Box
                    className={classes.pagedatamainbox}
                    onClick={() => setClicked(item.teamId)}
                    style={{
                      backgroundColor: `${saved ? "lightblue" : ""}`,
                    }}
                  >
                    <Box style={{ width: "10%" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          textAlign: "center",
                        }}
                      >
                        <EditIcon
                          className={classes.EditIcon}
                          onClick={() => openEdit(item)}
                        />
                      </Typography>
                    </Box>
                    <Box style={{ width: "10%" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          textAlign: "center",
                        }}
                      >
                        {item?.teamName}
                      </Typography>
                    </Box>
                    <Box style={{ width: "10%" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          textAlign: "center",
                        }}
                      >
                        {item?.openForm}
                      </Typography>
                    </Box>
                    <Box style={{ width: "10%" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          textAlign: "center",
                        }}
                      >
                        {item?.openDays}
                      </Typography>
                    </Box>
                    <Box style={{ width: "10%" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          textAlign: "center",
                        }}
                      >
                        {item?.enabled}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPageTable;
const useStyles = makeStyles(() => ({
  mainbox: {
    border: "1px solid #E9E9E9 !important",
    width: "100%",
    // margin: "5px",
    // maxHeight: "350px",

    // overflow: "scroll"
  },
  innermainbox: {
    display: "inline-block",
    width: "100%",
    verticalAlign: "top",
    overflowY: "scroll",
  },
  innerboxworkduration: {
    display: "flex !important",
    padding: "5px 0px",
    borderBottom: "1px solid #E9E9E9",
    backgroundColor: "#F1F1F1",
    position: "absolute",
    width: "95%",
    // marginRight: "50px"
  },
  pagedatamainbox: {
    display: "flex !important",
    borderBottom: "1px solid #E9E9E9 !important",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#ededed",
    },
    alignItems: "center",
  },
  EditIcon: {
    color: "#124590",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
  },
}));
