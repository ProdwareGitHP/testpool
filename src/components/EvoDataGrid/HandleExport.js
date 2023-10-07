import { cloneElement } from "react";
import * as ReactDOMServer from "react-dom/server";

const HandleExport = async (gridElement, fileName) => {
  console.log(gridElement);
  const csvContent = await getGridContent(
    ReactDOMServer.renderToStaticMarkup(
      cloneElement(gridElement, {
        enableVirtualization: false,
      })
    )
  );

  downloadFile(
    `${fileName}.xls`,
    new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  );
};

async function getGridContent(markupContent) {
  console.log(markupContent);
  const grid = document.createElement("div");
  grid.innerHTML = markupContent;

  let content = [
    ".rdg-header-row",
    ".rdg-row:not(.rdg-summary-row)",
    ".rdg-summary-row",
  ]
    .map((selector) =>
      Array.from(grid.querySelectorAll(selector)).map((gridRow) =>
        Array.from(gridRow.querySelectorAll(".rdg-cell"))
          .map((gridCell) => serialiseCellValue(gridCell.innerText))
          .join(",")
      )
    )
    .join("\n");

  return content;
}

function serialiseCellValue(value) {
  console.log(value)
  if (typeof value === "string") {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(",")
      ? `"${formattedValue}"`
      : formattedValue;
  }
  return value;
}
// function serialiseCellValue(value) {
//   if (typeof value === "string") {
//     const formattedValue = value.replace(/"/g, '""');
//     return formattedValue.includes(",") ? `"${formattedValue}"` : formattedValue;
//   } else if (typeof value === "number" || typeof value === "boolean") {
//     return value.toString();
//   } else if (typeof value === "object" && value !== null) {
//   }
// }

function downloadFile(fileName, data) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}

export default HandleExport;
