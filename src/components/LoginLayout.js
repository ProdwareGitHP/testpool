import { Box, Grid, Typography } from "@mui/material";
import { trim } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppVersion } from "../components/AppVersion";
import { updateState } from "../redux/commonSlice";
import { getUserQRCode, loginUser } from "../services/api";
import { CustomPanel } from "./CustomPanel";
import SubmitButton from "./EvoButton/submit";
import { LogoBox } from "./LogoBox";
import { CustomTextField } from "./TextField";
import { PasswordTextField } from "./TextField/password";

export const LoginLayout = (props) => {
  const dispatch = useDispatch();

  const { qrCode, session_expired } = useSelector(
    (state) => state.commonReducer
  );

  const [snakeBarProps, setSnakeBarProps] = useState({});

  //const [searchParams] = useSearchParams();
  let TENENT_IDENTIFIER = "xyz"; //searchParams.get("tenant");

  const [pagedata, setPagedata] = useState({
    username: "",
    loginpassword: "",
  });

  const { mutate: loginUserMutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data.data) {
        dispatch(updateState({ ...data.data.data }));
      }
    },
    onError: (data) => {
      if (data && data.message) {
        setSnakeBarProps({
          msz: data.message,
          type: "error",
        });
      }
      if (data && data.response) {
        setSnakeBarProps({
          msz: data.response.data.status.description,
          type: "error",
        });
      }
    },
  });

  const loginclickhandler = () => {
    try {
      if (!pagedata.username) {
        throw "Username is required!";
      }
      if (!pagedata.loginpassword) {
        throw "Password is required!";
      }

      setSnakeBarProps(null);
      loginUserMutate({
        username: pagedata.username,
        password: pagedata.loginpassword,
      });
    } catch (error) {
      setSnakeBarProps({
        msz: error,
        type: "error",
      });
      return;
    }
  };

  useEffect(() => {
    //getUserQRCodeLocal();
  }, []);

  useEffect(() => {
    if (session_expired) {
      setSnakeBarProps({
        msz: "Session Expired",
        type: "warning",
      });
      dispatch(updateState({ session_expired: false }));
    }
  }, [session_expired]);

  const getUserQRCodeLocal = async () => {
    try {
      const api = await getUserQRCode(TENENT_IDENTIFIER);
      const dat = {
        tenantName: api.data.tenantName,
        xtenantId: api.data.xtenantId,
        TENENT_IDENTIFIER: TENENT_IDENTIFIER,
      };
      dispatch(updateState(dat));
    } catch (error) {
      const errMsg =
        typeof error.response?.data === "string"
          ? error.response?.data
          : "QR code failed to fetch";
      setSnakeBarProps({
        msz: errMsg,
        type: "error",
      });
    }
  };

  return (
    <CustomPanel
      // title={"Login your account"}
      isLoading={isLoading}
      snakeBarProps={snakeBarProps}
    >
      <Box style={{ marginTop: 10, marginRight: 10, textAlign: "right" }}>
        <LogoBox />
        <Box style={{ paddingRight: 50, marginTop: -10 }}>
          <AppVersion />
        </Box>
      </Box>
      <Grid item style={{ padding: "20px", paddingTop: 0 }}>
        <Grid item style={{ padding: "10px 0px 10px 0px" }}>
          <Box mb={1}>
            <Typography
              variant="body1"
              component="span"
              className="input-label"
            >
              <Box>
                {"Username"}
                <sub style={{ position: "absolute" }}>* </sub>
              </Box>
            </Typography>
          </Box>
          <CustomTextField
            width="100%"
            value={pagedata?.username}
            onChange={(event) =>
              setPagedata({
                ...pagedata,
                username:
                  event.target.value === ""
                    ? event.target.value
                    : trim(event.target.value),
              })
            }
          />
        </Grid>
        <Grid item style={{ padding: "10px 0px 10px 0px" }}>
          <Box mb={1}>
            <Typography
              variant="body1"
              component="span"
              className="input-label"
            >
              <Box>
                {"Password"}
                <sub style={{ position: "absolute" }}>* </sub>
              </Box>
            </Typography>
          </Box>
          <PasswordTextField
            width="100%"
            value={pagedata?.loginpassword}
            onChange={(event) =>
              setPagedata({
                ...pagedata,
                loginpassword:
                  event.target.value === ""
                    ? event.target.value
                    : trim(event.target.value),
              })
            }
          />
        </Grid>
        <Grid style={{ padding: "20px 0px 20px 0px" }}>
          <SubmitButton
            disabled={isLoading}
            btnText="Login"
            fullWidth
            onClick={loginclickhandler}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Grid item>
          <Typography
            style={{
              color: "#717171",
              fontFamily: "Inter",
              fontSize: "14px",
            }}
          >
            Powered by
          </Typography>
          <img width="80%" src="/ews/assets/imagenine.svg" alt="Image" />
        </Grid>
        <Grid item>
          <Typography
            style={{
              color: "#717171",
              fontFamily: "Inter",
              fontSize: "14px",
            }}
          >
            Managed by
          </Typography>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <img
              width="60%"
              src="/ews/assets/imageten.svg"
              alt="Image"
              style={{ display: "flex", justifyContent: "center" }}
            />
          </Box>
        </Grid>
      </Grid>
    </CustomPanel>
  );
};
