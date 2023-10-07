export default {
    "requestData": [
        {
            "status": "Submited",
            "fromDate": "13-Aug-2023",
            "toDate": "13-Aug-2023",
            "department": "S/38.Parder-Will",
            "jobTitle": "Specialist",
            "workLocation": "Lifeline Hospital"
        },
        {
            "status": "Submited",
            "fromDate": "1-Aug-2023",
            "toDate": "14-Aug-2023",
            "department": "S/38.Parder-Will",
            "jobTitle": "Specialist",
            "workLocation": "Lifeline Hospital"
        }
    ],
    "calendarColumns": [
        { "name": "Week", "key": "dateStart", "type": "date" },
        { "name": "Sunday", "key": "sun" },
        { "name": "Monday", "key": "mon" },
        { "name": "Tuesday", "key": "tue" },
        { "name": "Wednesday", "key": "wed" },
        { "name": "Thursday", "key": "thu" },
        { "name": "Friday", "key": "fri" },
        { "name": "Saturday", "key": "sat" },
        { "name": "Total", "key": "hours" }
    ],
    "approvalHistoryColumns": [
        { "name": "Approver", "key": "fullName", "width": "25%" },
        { "name": "Action", "key": "actionTaken", "width": "25%" },
        { "name": "Comments", "key": "comments", "width": "25%" },
        { "name": "Action Date", "key": "createdOn", "type": "date", "width": "25%" },
    ],
    "editInputData": {
        "items": [
            {
                "label": "From Date",
                "value": "13-Aug-2023",
                "required": true,
                "type": "text"
            },
            {
                "label": "To Date",
                "value": "26-Aug-2023",
                "required": true,
                "type": "text"
            },
            {
                "label": "Department",
                "value": "S/36:Parder-Will",
                "required": true,
                "type": "text"
            },
            {
                "label": "Job Title",
                "value": "Specialist",
                "required": true,
                "type": "text"
            },
            {
                "label": "Work Location",
                "value": "Lifeline Hospital, North Block",
                "required": true,
                "type": "text"
            },
            {
                "label": "Comments",
                "value": "Lifeline Hospital, North Block",
                "required": false,
                "type": "text"
            }
        ],
        "gap": 2,
        "labelWidth": 120
    }
};