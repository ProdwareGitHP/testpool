import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RouterPage from "./pages/RouterPage";
import { useDispatch } from "react-redux";
import { resetState } from "./redux/commonSlice";
import { ActiveSessionProvider } from "active-session-library";

const App = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.commonReducer);

  return access_token ? (
    // <ActiveSessionProvider
    //   timeout={20 * 60 * 1000} //10 min
    //   events={["click", "mousemove", "keydown", "scroll", "drag"]}
    //   postAction={() => dispatch(resetState({ session_expired: true }))}
    // >
    // changes done 
    <BrowserRouter basename="/ews">
      <RouterPage />
    </BrowserRouter>
  ) : (
    // </ActiveSessionProvider>
    <LoginPage />
  );
};

export default App;
