import React, { useState, useEffect } from 'react';

import { EvoHBox } from '../../components/EvoBox';
import EvoDataGrid from '../../components/EvoDataGrid';
import { EvoButton } from '../../components/EvoButton';
import { CustomPage } from '../../components/CustomPage';
import { EvoDataForm } from '../../components/EvoDataForm';
import EvoToggleButton from '../../components/EvoButton/toggle';
import { useTimeSheetBulkApprovalList, useTimeSheetWeekApproval } from '../../services/timesheet';
import { bulkApprovalActionList, bulkApprovalToggleList, getBulkApprovalColumns } from './DashBoardContants';

const BulkApproval = ({ title }) => {
    const [getRows, setRows] = useState([]);
    const [getWeekDate, setWeekDate] = useState({});
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [getToggleStatus, setToggleStatus] = useState(bulkApprovalToggleList?.[0]);

    const { data: getWeekData } = useTimeSheetWeekApproval();

    const getSelectedWeek = () => {
        if (Object.keys(getWeekDate)?.length) return getWeekDate;
        return getWeekData?.[0];
    };

    const { data, isLoading } = useTimeSheetBulkApprovalList({
        payCode: 'All Pay Codes',
        endDate: getSelectedWeek()?.datePeriod?.split(' ')[2],
        startDate: getSelectedWeek()?.datePeriod?.split(' ')[0],
    }, getWeekData?.length);

    useEffect(() => {
        if (data?.length)
            setRows(data?.map(item => ({
                ...item,
                toil: item?.payCodeData?.['TOIL'],
                lap_hours: item?.payCodeData?.['Lapse Hours'],
                regular_hrs: item?.payCodeData?.['Regular Hrs'],
                overtime_150: item?.payCodeData?.['Overtime 150'],
                overtime_125: item?.payCodeData?.['Overtime 125'],
            })));
    }, [data]);

    return (
        <CustomPage isLoading={isLoading} title={title}>
            <EvoHBox divider>
                <EvoToggleButton status={getToggleStatus} handlechange={setToggleStatus} list={bulkApprovalToggleList} />

                <EvoDataForm
                    formData={{
                        item: {
                            label: 'Select Week : ',
                            type: 'dropdown',
                            editorProps: {
                                width: 120,
                                data: getWeekData,
                                caller: setWeekDate,
                                selectIndex: 0,
                                getoptionlabelkey: 'datePeriod',
                            },
                        },
                    }}
                />

                <EvoButton
                    btnText={'Go'}
                // onClick={() => { }}
                />

                <EvoDataForm
                    formData={{
                        item: {
                            label: 'Action',
                            type: 'dropdown',
                            editorProps: {
                                width: 120,
                                selectIndex: 0,
                                caller: setWeekDate,
                                getoptionlabelkey: 'label',
                                data: bulkApprovalActionList,
                            },
                        },
                    }}
                />
            </EvoHBox>

            <EvoDataGrid
                rows={getRows}
                addSelectColumn
                selectedRows={selectedRows}
                columns={getBulkApprovalColumns}
                setSelectedRows={setSelectedRows}
            />
        </CustomPage>
    );
};

export default BulkApproval;
