import { Typography } from '@mui/material';
import { timeConverter } from '../../utils/commonService'; 
import { EvoHBox, EvoVBox } from '../../components/EvoBox';

export const bulkApprovalActionList = [
    { id: 1, label: 'Approve', value: 'Approve' },
    { id: 2, label: 'Request More Info', value: 'Request' },
    { id: 3, label: 'Forward', value: 'Forward' },
];

export const bulkApprovalToggleList = [{ value: 'staff', label: 'Staff' }, { value: 'activity', label: 'Activity' }];

export const getBulkApprovalColumns = [
    { key: 'employeeFullName', name: 'Employee', width: 300, type: 'link' },
    { key: 'hrs', name: 'Hrs', width: 100 },
    { key: 'workingHrs', name: 'Working Hrs', width: 120 },
    { key: 'sun', name: 'Sun', width: 50 },
    { key: 'mon', name: 'Mon', width: 50 },
    { key: 'tue', name: 'Tue', width: 50 },
    { key: 'wed', name: 'Wed', width: 50 },
    { key: 'thu', name: 'Thu', width: 50 },
    { key: 'fri', name: 'Fri', width: 50 },
    { key: 'sat', name: 'Sat', width: 50 },
    { key: 'overtime_150', name: 'Overtime 150', width: 150 },
    { key: 'toil', name: 'TOIL', width: 100 },
    { key: 'lap_hours', name: 'Lapse Hours', width: 120 },
    { key: 'regular_hrs', name: 'Regular Hrs', width: 100 },
    { key: 'overtime_125', name: 'Overtime 125', width: 150 },
];

export const getMyTeamColumns = [
    { name: '', key: 'fullName', width: 300 },
    { name: 'Schedule', key: 'schedule', width: 300 },
    { name: 'Actuals', key: 'actual', width: 300 },
];

export const getTimeCardColumns = [
    { name: '', key: 'effectiveDate', width: 100 },
    {
        name: '', key: 'costCenterName', width: 200, height: 1150, renderCell: ({ row, column }) => (
            <EvoVBox>
                <Typography style={{ fontSize: '13px', fontFamily: 'Inter' }}>
                    {row?.[column?.key]}
                </Typography>
                <Typography style={{ fontSize: '14px', fontFamily: 'Inter', color: 'forestgreen' }}>
                    {row?.jobTitle}
                </Typography>
            </EvoVBox>
        ),
    },
    {
        name: 'Schedule', key: 'schTimeStart', width: 200, renderCell: ({ row, column }) => (
            <EvoHBox>
                <Typography style={{ fontSize: '13px', fontFamily: 'Inter', color: 'blue' }}>
                    {timeConverter(row?.[column?.key])}
                </Typography>
                <Typography style={{ fontSize: '14px', fontFamily: 'Inter' }}>
                    {row?.punchTime}
                </Typography>
            </EvoHBox>
        ),
    },
];

export const getTimeCardPunchDetailColumns = [
    { name: 'Punch Time', key: 'schTimeStart', width: 150 },
    { name: 'Punch Type', key: 'schedule', width: 150 },
    { name: 'Department', key: 'costCenterName', width: 150 },
    { name: 'Job Title', key: 'jobTitle', width: 150 },
    { name: 'Department', key: 'actual', width: 150 },
    { name: 'Job', key: 'actual', width: 150 },
];

export const AllNotificationToggleList = [
    { value: 'all', label: 'All' },
    { value: 'action', label: 'Actionable' },
    { value: 'info', label: 'Info Only' },
    { value: 'closed', label: 'View Closed Notifications' },
];