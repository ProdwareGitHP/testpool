import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { modules } from "./allModules";
import { RootLayout, SinglePanelLayout } from "./layout";

function LazyElement({ routeName, title = routeName }) {
  const LazyComponent = lazy(modules[routeName]);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent title={title} />
    </Suspense>
  );
}

function RouterPage() {
  const { menuData } = useSelector((state) => state.commonReducer);

  return useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="Dashboard" />,
        },
        {
          path: "/Dashboard",
          element: <LazyElement routeName={"Dashboard"} />,
        },
        {
          path: "/Notifications",
          element: <LazyElement routeName={"Notifications"} />,
        },
        {
          path: "/WebCheckIn",
          element: <LazyElement routeName={"WebCheckIn"} />,
        },
        {
          path: "/BulkApproval",
          element: (
            <LazyElement routeName={"BulkApproval"} title="Bulk Approval" />
          ),
        },
        {
          path: "/",
          element: <SinglePanelLayout />,
          children: menuData.map((m) => {
            return {
              path: `${m.taskCode}`,
              element: (
                <LazyElement routeName={m.taskCode} title={m.taskName} />
              ),
            };
          }),
        },
        {
          path: "*",
          element: <LazyElement routeName={"PageNotFound"} />,
        },
      ],
    },
  ]);
}

export default RouterPage;
