import getTemplate from "../../../components/getTemplate";

export const addInputs = {
  items: [
    {
      label: "From Date",
      value: new Date(),
      required: true,
      type: "date",
      editorProps: {
        width: 200,
      },
    },
    {
      label: "To Date",
      value: new Date(),
      required: true,
      type: "date",
      width: 200,
    },
    {
      label: "Department",
      value: "S/36:Parder-Will",
      required: true,
      type: "lookup",
      editorProps: {
        width: 200,
        selectItem: (item) => {
        },
        template: () => getTemplate("DEPARTMENT_TEMPLATE"),
        columnKey: "fullName",
      },
    },
    
    {
      label: "Job Title",
      value: "Specialist",
      required: true,
      type: "lookup",
      editorProps: {
        width: 200,
      },
    },
    {
      label: "Work Location",
      value: "Lifeline Hospital, North Block",
      required: true,
      type: "dropdown",
      editorProps: {
        width: 200,
        data: ["abc"],
        caller: () => {},
      },
    },
    {
      label: "Comments",
      value: "Lifeline Hospital, North Block",
      required: false,
      editorProps: {
        width: 200,
      },
    },
  ],
  gap: 2,
  labelWidth: 120,
};
