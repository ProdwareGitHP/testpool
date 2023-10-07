export const getPersonIdsArr = (obj) => {
  var res = obj.size > 0 ? Array.from(obj) : [];
  return res;
};
export const filterEmployeeNumber = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    var res = [];
    arr2.map((item) => {
      if (arr1.includes(item.employeeNumber)) {
        res.push(item);
      }
    });
    return res;
  } else {
    return [];
  }
};
export const isEmptyShifts = (arr) => {
  if (Array.isArray(arr)) {
    var res = false;
    for (let index = 0; index < arr.length; index++) {
      const shiftList = arr[index].shiftInformation;
      var shiftArr = Object.values(shiftList);
      var list = shiftArr.filter((item) => item !== null);

      if (list.length) {
        res = true;
        break;
      }
    }

    return res;
  } else {
    return false;
  }
};

export const sort = (arr, key, type) => {
  if (Array.isArray(arr)) {
    return arr.sort((a, b) => {
      if (type === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else if (type === "desc") {
        return a[key] < b[key] ? 1 : -1;
      } else {
      }
    });
  } else {
    return [];
  }
};
