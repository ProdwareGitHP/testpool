import React, { useCallback } from 'react';

import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import EvoDataGrid from '../../components/EvoDataGrid';
import { CustomPanel } from '../../components/CustomPanel';
import { useTimeSheetApprovalList, useTimeSheetPayrollApproval } from '../../services/timesheet';

const Timesheet = () => {
  const { data: getTimeSheetApprovalRows, isLoading: isApprovalLoading } = useTimeSheetApprovalList();
  const { data: getTimeSheetPayrollRows, isLoading: isPayrollLoading } = useTimeSheetPayrollApproval({
    endDate: '31-May-2023',
    startDate: '01-May-2023',
    personId: 300000004250362,
  });

  const getColumns = [{ key: 'subject', width: 397.5, type: 'link' }, { key: 'createdOn', width: 397.5, type: 'datetime' }];

  const RenderHeader = useCallback(() => (
    <Grid xs='12' style={{ margin: '10px 15px' }}>
      <Grid style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px', marginBottom: '-24px' }}>
        <Link to={'/BulkApproval'}>
          <Typography style={{ fontSize: '12px', color: 'blue', fontWeight: '600' }}>
            Bulk Approval
          </Typography>
        </Link>
      </Grid>
    </Grid>
  ), []);

  return (
    <>
      <CustomPanel isLoading={isApprovalLoading || isPayrollLoading} title='Timesheet(s) Awaiting Your Action' style={{ marginLeft: '10px', marginBottom: '16px' }}>
        <RenderHeader />

        <EvoDataGrid
          height={250}
          columns={getColumns}
          rows={getTimeSheetApprovalRows}
        />
      </CustomPanel>
    </>
  );
};

export default Timesheet;
