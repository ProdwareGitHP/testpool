export const GenderMock = [
  {
    id: 1,
    gender: "M",
    value: "Male",
  },
  {
    id: 2,
    gender: "F",

    value: "Female",
  },
];

export const EmployeeTypeMockData = [
  {
    id: 1,
    value: "Contingent Worker",
  },
  {
    id: 2,
    value: "Employee",
  },
];

export const userRoleMock = [
  {
    userType: "Approver",
  },
  {
    userType: "Creator",
  },
];

export const shiftMock = [
  {
    shiftType: "Shift",
  },
  {
    shiftType: "Non-Shift",
  },
];

export const includeMock = [
  {
    code: "I",
    value: "Include",
  },
  {
    code: "E",

    value: "Exclude",
  },
];

export const getSelectIndex = (arr, key, value) => {
  if (value && arr) {
    var index = arr?.findIndex((item) => key in item && item[key] === value);
    return index;
  } else {
    return -1;
  }
};
