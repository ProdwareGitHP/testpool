export const getErrorMsz = (type, value, value2) => {
    if (type == "username") {
        return value == "" ? "Please enter username"
            : ""
    }
    if (type == "password") {
        return value == "" ? "Please enter password"
            : ""
    }
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}