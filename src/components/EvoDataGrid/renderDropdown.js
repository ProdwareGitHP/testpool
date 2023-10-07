// import type { RenderEditCellProps } from '../../../src';
import { makeStyles } from "@mui/styles";
const titles = ["Dr.", "Mr.", "Mrs.", "Miss", "Ms."];

export function renderDropdown({ rows, onRowChange }) {
  const classes = makeStyles(() => ({
    gridedit: {
      appearance: "none",
      inlineSize: "100%",
      blockSize: "100%",
      border: "2px solid #ccc",
      fontSize: "16px",
      paddingBlock: 0,
      paddingInline: "6px",
    },
  }))();
  return (
    <select
      className={classes.gridedit}
      value={rows.typeName}
      onChange={(event) =>
        onRowChange({ ...rows, typeName: event.target.value }, true)
      }
      autoFocus
    >
      {titles.map((title) => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
