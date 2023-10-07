import getTemplate from "../../../components/getTemplate";

export const getFilterButtons = (templateList) => {
  if (Array.isArray(templateList)) {
    var templatesData = [];
    templateList.map((item) => {
      const { templateName, params, select, disable, btnName,rows } = item;
      var template = getTemplate(
        templateName,
        params,
        select,
        disable,
        btnName,
        rows
      );

      templatesData.push(template);
    });
    return templatesData;
  } else {
    return [];
  }
};
