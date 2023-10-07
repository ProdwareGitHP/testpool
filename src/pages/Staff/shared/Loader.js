import { CircularProgress, Backdrop } from "@mui/material";

const ProgressLoader = (props) => {
  const { isLoading, size } = props;
  return isLoading ? <CircularProgress size={size||20} /> : "";
};
export default ProgressLoader;
