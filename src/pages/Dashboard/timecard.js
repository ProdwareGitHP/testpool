import React, { useEffect } from 'react';

import { Typography } from '@mui/material';

import { EvoHBox } from '../../components/EvoBox';
import EvoSection from '../../components/EvoSection';
import EvoDataGrid from '../../components/EvoDataGrid';
import { getTimeCardColumns } from './DashBoardContants';

const Index = ({ data, setCreateRequest, setPunchDetailGrid, getOuterText }) => {

  useEffect(() => {
    getTimeCardColumns.push(
      {
        name: 'Actuals', key: 'schTime', width: 300, renderCell: ({ row, column }) => (
          <EvoHBox onClick={() => onClick(row)}>
            <Typography style={{ color: 'forestgreen' }}>
              {row?.[column?.key]}
            </Typography>
          </EvoHBox>
        )
      },
      {
        name: '', key: 'schTimeStart', width: 200, renderCell: ({ row }) => (
          <EvoHBox onClick={() => setCreateRequest(true)}>
            {row?.violationCode?.split(',')?.map(() => (
              <Typography style={{ fontSize: '28px', color: 'red', fontWeight: 'bolder', textAlign: 'center' }}>
                !
              </Typography>
            ))}
          </EvoHBox>
        ),
      });
  }, []);

  const onClick = (value) => {
    getOuterText(value);
    setPunchDetailGrid(true);
  };

  return (
    <EvoSection title={'Timecard'}>
      <EvoDataGrid height={400} rows={data} columns={getTimeCardColumns} />
    </EvoSection>
  );
};

export default Index;