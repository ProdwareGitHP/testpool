import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoginLayout } from "../components/LoginLayout";
import appConfig from "../App.json";

const LoginPage = (props) => {
  useEffect(() => {
    document.title = appConfig.appTitle;
  }, []);

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={8} md={7} lg={8}>
        <Grid container item alignContent={"center"}>
          <Grid item xs={6} md={6}>
            <Box width={1}>
              <img
                width="318px"
                src="/ews/assets/images/logo_small.png"
                alt="Image"
              />
            </Box>
          </Grid>
          {/* <Grid item xs={6} md={6}>
            <Box width={1} p={2} textAlign="right">
              <Typography style={{ fontWeight: "bold" }}>
                Learn More &nbsp;
                <ArrowForwardIcon style={{ verticalAlign: "bottom" }} />
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
        <Grid container item style={{ padding: "0px 0px 0px 30px " }}>
          <Grid item xs={12} style={{ padding: "20px 0px 0px 0px" }}>
            <img width="30%" src="/ews/assets/imageone.svg" alt="Image" />
          </Grid>
          <Grid item xs={12} style={{ padding: "10px 0px 0px 0px" }}>
            <Typography
              style={{
                color: "#124590",
                fontFamily: "khand",
                fontSize: "60px",
                lineHeight: 1,
              }}
            >
              Staffing Management
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={10}
          md={12}
          lg={10}
          style={{ padding: "15px" }}
        >
          <Grid item xs={6}>
            <Typography
              style={{
                fontFamily: "Inter",
                fontSize: "14px",
                paddingLeft: "20px",
              }}
            >
              Our application provides for an end-to-end digital warehousing
              solution specialising in medium to large scale warehouse
              management. Developed by Mastek and managed by Prodware Solutions,
              Warehouse 360 delivers state of the art quality required to meet
              today’s needs for warehouse management
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Grid container item>
              <Grid item xs={2} md={3} lg={2} style={{ marginBottom: 0 }}>
                <Box
                  style={{
                    padding: "5px",
                    borderRadius: "50%",
                    backgroundColor: "#12459112",
                    width: "40px",
                    height: "40px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img width="70%" src="/ews/assets/imagetwo.svg" alt="Image" />
                </Box>
              </Grid>
              <Grid item xs={10} md={9} lg={10} style={{ marginBottom: 10 }}>
                <Typography
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "Inter",
                    fontSize: "16px",
                  }}
                >
                  Simple interface
                </Typography>
                <Typography
                  style={{
                    color: "#717171",
                    fontFamily: "Inter",
                    fontSize: "12px",
                  }}
                >
                  Minimal & simple interface with efficient user experience
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} style={{ marginBottom: 10 }}>
                <Box
                  style={{
                    padding: "5px",
                    borderRadius: "50%",
                    backgroundColor: "#12459112",
                    width: "40px",
                    height: "40px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    width="70%"
                    src="/ews/assets/imagethree.svg"
                    alt="Image"
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={9} lg={10} style={{ marginBottom: 10 }}>
                <Typography
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "Inter",
                    fontSize: "16px",
                  }}
                >
                  High Quality Code
                </Typography>
                <Typography
                  style={{
                    color: "#717171",
                    fontFamily: "Inter",
                    fontSize: "12px",
                  }}
                >
                  High Quality code to ensure smooth processes
                </Typography>
              </Grid>
              <Grid item xs={2} md={3} lg={2} style={{ marginBottom: 10 }}>
                <Box
                  style={{
                    padding: "5px",
                    borderRadius: "50%",
                    backgroundColor: "#12459112",
                    width: "40px",
                    height: "40px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    width="70%"
                    src="/ews/assets/imagefour.svg"
                    alt="Image"
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={9} lg={10} style={{ marginBottom: 10 }}>
                <Typography
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "Inter",
                    fontSize: "16px",
                  }}
                >
                  Multiple Modules
                </Typography>
                <Typography
                  style={{
                    color: "#717171",
                    fontFamily: "Inter",
                    fontSize: "12px",
                  }}
                >
                  High Quality code to ensure smooth processes
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs="5"
            sm="3"
            md="3"
            lg="3"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
            }}
          >
            <Box
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a href="https://twitter.com/Mastekltd?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                <img
                  src="/ews/assets/imagefive.svg"
                  alt="Image"
                  target="_blank"
                />
              </a>
            </Box>
            <Box
              style={{
                borderRadius: "50%",
                marginLeft: "10px",
                width: "50px",
                height: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a href="https://www.facebook.com/Mastekltd/">
                <img
                  src="/ews/assets/imagesix.svg"
                  alt="Image"
                  target="_blank"
                />
              </a>
            </Box>
            <Box
              style={{
                borderRadius: "50%",
                marginLeft: "10px",
                width: "50px",
                height: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a href="https://in.linkedin.com/company/mastek" target="_blank">
                <img src="/ews/assets/imageseven.svg" alt="Image" />
              </a>
            </Box>
            <Box
              style={{
                borderRadius: "50%",
                marginLeft: "10px",
                width: "50px",
                height: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <a
                href="https://www.instagram.com/mastekltd/?hl=en"
                target="_blank"
              >
                <img src="/ews/assets/imageeight.svg" alt="Image" />
              </a>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        md={5}
        lg={4}
        style={{
          background: "linear-gradient(to left, #124590 80%, #fff 20%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LoginLayout />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
