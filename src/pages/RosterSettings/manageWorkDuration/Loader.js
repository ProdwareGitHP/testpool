import { CircularProgress, Backdrop } from "@mui/material";

const ProgressLoader = (props) => {
  const { isLoading, size, style } = props;
  return isLoading ? (
    <CircularProgress size={size} color="error" style={style} />
  ) : (
    ""
  );
};
ProgressLoader.defaultProps = {
  size: 25,
};
export default ProgressLoader;
