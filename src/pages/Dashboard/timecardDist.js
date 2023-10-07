import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { Chart } from 'react-google-charts';
import { EvoHBox } from '../../components/EvoBox';
import EvoSection from '../../components/EvoSection';

const Index = ({ data }) => {
  const [pieData, setPieData] = useState([]);
  const [punchData, setPunchData] = useState([]);

  useEffect(() => {
    const punchData = [['Type', 'Hrs'], ['Punch Hrs', data?.[0]?.punchHrs]];
    const newData = [['Type', 'Hrs'], ['Productive Hrs', data?.[0]?.productiveHrs], ['Non Productive Hrs', data?.[0]?.nonProductiveHrs]];

    setPieData(newData);
    setPunchData(punchData);
  }, [data?.length]);

  return (
    <EvoSection title={'Timecard Distribution'}>
      <EvoHBox divider>
        <Grid container item xs='3' style={{ padding: '5px' }}>
          <Grid item xs='10'>
            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              Scheduled Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', color: 'green' }}>
              Productive Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', marginLeft: '5px' }}>
              Punch Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', marginLeft: '5px' }}>
              Official Person Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', color: 'red' }}>
              Non Productive Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', marginLeft: '5px' }}>
              Leave Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', marginLeft: '5px' }}>
              Holiday Hrs
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0', marginLeft: '5px' }}>
              Personal Perm-Hrs
            </Typography>
          </Grid>

          <Grid item xs='2'>
            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.schHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.productiveHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.punchHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.officialReqHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.nonProductiveHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.leaveHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.holidayHrs}
            </Typography>

            <Typography style={{ fontSize: '13px', fontFamily: 'Inter', margin: '3px 0' }}>
              {data?.[0]?.personalReqHrs}
            </Typography>
          </Grid>
        </Grid>

        <Grid container item xs='9' style={{ padding: '10px', alignItems: 'center' }}>
          <Grid style={{ width: '50%', height: '60%' }}>
            <Chart width={'100%'} data={pieData} height={'100%'} chartType={'PieChart'} options={{ is3D: true }} />
          </Grid>
          <Grid style={{ width: '50%', height: '60%' }}>
            <Chart width={'100%'} data={punchData} height={'100%'} chartType={'PieChart'} options={{ is3D: true }} />
          </Grid>
        </Grid>
      </EvoHBox>
    </EvoSection>
  );
};

export default Index;