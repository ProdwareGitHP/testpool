
import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props) {
  const { left, setLeft, right, setRight } = props;
  const [checked, setChecked] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper
      sx={{
        width: 300,
        height: 230,
        overflow: "auto",
        border: "1px solid silver",
        mx: 4,
        mt: 1,
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const { employeeNumber, fullName } = value;

          const labelId = `transfer-list-item-${employeeNumber}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${employeeNumber} - ${fullName}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
  const buttonsList = [
    {
      onClick: handleAllRight,
      disabled: left.length === 0,
      btnName: ">>",
    },
    {
      onClick: handleCheckedRight,
      disabled: leftChecked.length === 0,
      btnName: ">",
    },
    {
      onClick: handleCheckedLeft,
      disabled: rightChecked.length === 0,
      btnName: "<",
    },
    {
      onClick: handleAllLeft,
      disabled: right.length === 0,
      btnName: "<<",
    },
  ];
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {buttonsList?.map((item, index) => {
            const { onClick, btnName, disabled } = item;
            return (
              <Button
                key={index}
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={onClick}
                disabled={disabled}
              >
                {btnName}
              </Button>
            );
          })}
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
