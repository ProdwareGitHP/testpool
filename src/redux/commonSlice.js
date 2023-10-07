import { createSlice } from "@reduxjs/toolkit";
import tasks from "../pages/tasks.json";

const initialValue = {
  access_token: "",
  userName: "",
  expire: "",
  userId: "",
  // startDate: new Date().toISOString(),
  // endDate: new Date().toISOString(),
  // oriDate: new Date().toISOString(),
  dateRangeType: null,
  selectedProjectObj: {},
  selectedEmployee: {},
  selectedSummary: "totalSchHours",
  dayArr: [],
  //dateFromPicker: new Date().toISOString(),
  selectedProjectObjTeam: {},
  lineManageForTeam: false,
  timeZone: null,
  userType: "",
  employeeId: "",
  projectId: "",
  menuData: tasks,
  session_expired: "",  
};

export const commonSlice = createSlice({
  name: "commonlo",
  initialState: initialValue,
  reducers: {
    updateState: (state, action) => {
      assignValueInState(action.payload, state);
    },
    resetState: (state, action) => {
      return { ...initialValue, ...action.payload };
    },
  },
});

const assignValueInState = (obj, state) => {
  for (const key in obj) {
    state[key] = obj[key];
  }
};

export const { updateState, resetState } = commonSlice.actions;
export default commonSlice.reducer;
