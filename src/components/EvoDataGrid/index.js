import { groupBy as rowGrouper } from "lodash-es";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";
import EvoSection from "../EvoSection";
import { NoDataBox } from "../NoDataBox";
import { AddButton } from "./AddButton";
import ExportButton from "./ExportButton";
import enrichColumn from "./enrichColumn";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

const EvoDataGrid = ({
  title,
  columns,
  rows = [],
  setRows,
  height,
  addSelectColumn,
  headerRowHeight,
  rowHeight,
  selectedRows,
  setSelectedRows,
  page,
  groupByColumns = [],
  isPagination,
  handleChange,
  pageCount,
  isSingleSelection,
  HeaderComponent,
  FooterComponent,
  CreatorModal,
  rowCreated,
  RowEditorModal,
  rowUpdated,
  filterId,
  hideHeader,
  exportOptions,
  expandedGroupIds,
  setExpandedGroupIds,
  tableLabel,
  noheader,
  nofooter,
  resizable = true,
  handleChangeCheck,
  bottomSummaryRows,
  topSummaryRows,
  rowClass,
}) => {
  const enrichedColumns = enrichColumn(
    columns,
    addSelectColumn,
    RowEditorModal,
    rowUpdated,
    tableLabel,
    handleChangeCheck,
    isSingleSelection
  );
  //  debugger
  const classes = useStyles();

  const gridElement = (
    <DataGrid
      style={{
        resize: "rows",
        border: 0,
        maxHeight: height || 400,
        minHeight: 120,
        height: "auto",
      }}
      defaultColumnOptions={{
        resizable: resizable,
      }}
      // enableCellSelect={false}
      headerRowHeight={headerRowHeight || (hideHeader ? 0 : 35)}
      rowHeight={rowHeight}
      rowKeyGetter={(row) => (filterId ? row[filterId] : row)}
      // rowKeyGetter={(row) => (filterId ? row[filterId] : row.id)}
      columns={enrichedColumns}
      selectedRows={selectedRows}
      onSelectedRowsChange={(zx) => {
        if (isSingleSelection) {
          var finalSelectedRows = new Set();
          if (zx.size === 1) {
            finalSelectedRows.add(Array.from(zx).pop());
          } else if (zx.size === 2 && rows.length !== 2) {
            finalSelectedRows.add(Array.from(zx).pop());
          }

          setSelectedRows(finalSelectedRows);
        } else {
          setSelectedRows(zx);
        }
      }}
      groupBy={groupByColumns}
      rowGrouper={rowGrouper}
      expandedGroupIds={expandedGroupIds}
      onExpandedGroupIdsChange={setExpandedGroupIds}
      rowClass={(row) => {
        var classList = rowClass ? rowClass(row) : "";
        classList += " " + classes.Cell;
        return classList;
      }}
      //onRowsChange={setAllRows}
      // rows={rows}
      onRowsChange={setRows}
      rows={rows}
      // className="fill-grid"

      className="rdg-light"
      // className={classes.root}
      bottomSummaryRows={bottomSummaryRows}
      topSummaryRows={topSummaryRows}
      renderers={{ noRowsFallback: <NoDataBox style={{ width: 250 }} /> }}
    />
  );

  const header = noheader
    ? null
    : {
      Left: CreatorModal && (
        <AddButton Creator={CreatorModal} onCreated={rowCreated} />
      ),
      Right: exportOptions && (
        <ExportButton
          gridElement={gridElement}
          fileName={exportOptions.fileName || title}
        />
      ),
      children: HeaderComponent && <HeaderComponent />,
    };

    // debugger
  const footer = nofooter
    ? null
    : {
      title: rows.length > 0 ? "#Rows: " + rows.length : null,
      children: FooterComponent && <FooterComponent />,
    };

  // debugger
  return (
    <EvoSection title={title} header={header} footer={footer}>
      {gridElement}

      {/* {isPagination && (
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Stack>
        )} */}
    </EvoSection>
  );
};

EvoDataGrid.defaultProps = {
  isSingleSelection: false,
  addSelectColumn: false,
};

export default EvoDataGrid;

const useStyles = makeStyles((theme) => ({
  Cell: {
    "& .rdg-cell": {
      outline: "none",
      paddingInline: 0,
    },
  },
}));
