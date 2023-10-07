import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import EvoErrorBoundary from "../components/EvoErrorBoundary";
// import { CustomPage } from "../components/CustomPage";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Box
        style={{
          overflow: "auto",
          padding: 12,
          height: "calc(100vh - 64px)",
          backgroundColor: "rgb(242, 245, 249)",
          // backgroundColor: "lightyellow",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

const SinglePanelLayout = (props) => {
  // let f = props;
  return (
    // <CustomPage>

    <EvoErrorBoundary>
      <Outlet />
    </EvoErrorBoundary>

    // </CustomPage>
  );
};

export { RootLayout, SinglePanelLayout };
