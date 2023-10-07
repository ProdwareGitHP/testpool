import { CircularProgress, Backdrop } from "@mui/material";

const ProgressLoader = (props) => {
  const { isLoading, size } = props;
  return isLoading ? (
    <CircularProgress size={size || 25} thickness={4.5} />
  ) : (
    ""
  );
};
export default ProgressLoader;
