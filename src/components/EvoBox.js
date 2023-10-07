import { Divider, Grid, Stack } from "@mui/material";
import EvoErrorBoundary from "./EvoErrorBoundary";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const EvoHBox = ({
  children,
  divider,
  style,
  gap,
  onClick,
  alignItems = "center",
  justifyContent = "start",
}) => {
  return (
    <Grid item sx={style} onClick={onClick}>
      <Stack
        alignItems={alignItems}
        justifyContent={justifyContent}
        direction="row"
        gap={gap || (divider ? 2 : 1)}
        divider={divider ? <Divider orientation="vertical" flexItem /> : null}
      >
        {children}
      </Stack>
    </Grid>
  );
};

const EvoVBox = ({ children, divider, style, gap }) => {
  return (
    <Grid item style={style}>
      <EvoErrorBoundary>
        <Stack
          justifyContent="center"
          gap={gap || (divider ? 1.5 : 1)}
          divider={divider ? <Divider /> : null}
        >
          {children}
        </Stack>
      </EvoErrorBoundary>
    </Grid>
  );
};

const EvoTitle = ({ title, style }) => (
  <Typography style={{ fontSize: 15, fontWeight: "bold", ...style }}>
    {title}
  </Typography>
);

const CloseButton = ({ onClose }) => (
  <IconButton onClick={() => onClose(false)}>
    <CloseIcon style={{ fontSize: "18px", color: "black" }} />
  </IconButton>
);

const EvoHNavBox = ({
  title,
  titleStyle,
  Left,
  Right,
  children,
  divider,
  style,
  onClose,
}) => {
  return (
    <EvoHBox
      divider={divider}
      style={{ ...style, justifyContent: "space-between", flex: 1 }}
    >
      {title && <EvoTitle title={title} style={titleStyle} />}
      {Left}

      <EvoHBox style={{ flex: 1 }}>{children}</EvoHBox>

      {Right}
      {onClose && <CloseButton onClose={onClose} />}
    </EvoHBox>
  );
};

export { EvoVBox, EvoHBox, EvoHNavBox };
