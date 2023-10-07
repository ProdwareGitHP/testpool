import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import TimeCard from './timecard';
import TimeCardDistribution from './timecardDist';
import { EvoButton } from '../../components/EvoButton';
import EvoDataGrid from '../../components/EvoDataGrid';
import { dateConverter } from '../../utils/commonService';
import { CustomPanel } from '../../components/CustomPanel';
import { EvoDataForm } from '../../components/EvoDataForm';
import { CustomDialog } from '../../components/CustomDialog';
import { getTimeCardPunchDetailColumns } from './DashBoardContants';
import { RequestCreateModal } from '../Staff/team/RequestCreateModal';
import { useTimeCardData, useTimeCardSummary, useTimeCardPunchDetail } from '../../services/dashboard';

const Index = () => {
  const classes = useStyles();

  const { userId, employeeId } = useSelector((state) => state?.commonReducer);

  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [calEndDate, setCalEndDate] = useState(new Date());
  const [createRequest, setCreateRequest] = useState(false);
  const [punchDetailRows, setPunchDetailRows] = useState([]);
  const [calStartDate, setCalStartDate] = useState(new Date());
  const [punchDetailGrid, setPunchDetailGrid] = useState(false);

  const { data: getTimeCardSummary, isLoading: isLoadingSummary } = useTimeCardSummary({ startDate, endDate, userId });
  const { data: getTimeCardData, isLoading: isLoadingData, refetch } = useTimeCardData({ startDate, endDate, personId: employeeId });
  const { data: getTimeCardPunchDetail, isLoading: isLoadingTimeCardPunchDetail } = useTimeCardPunchDetail({ personId: employeeId });

  console.log('index--', getTimeCardData);

  const formData = {
    gap: 3,
    labelWidth: 250,
    direction: 'row',
    items: [
      {
        type: 'date', label: 'From', value: calStartDate, required: true, onChange: (date) => {
          setCalStartDate(date);
          setStartDate(dateConverter(date));
        }
      },
      {
        label: 'To', type: 'date', value: calEndDate, required: true, onChange: (date) => {
          setCalEndDate(date);
          setEndDate(dateConverter(date));
        }
      },
    ],
  };

  const createrequesthandler = () => {
    refetch();
    setCreateRequest(false);
  };

  return (
    <>
      <CustomPanel title={'Timecard Details'} isLoading={isLoadingData || isLoadingSummary || isLoadingTimeCardPunchDetail}>
        <Grid style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
          <ChevronLeftIcon className={classes.date} onChange={(e) => { }} />
          <ChevronRightIcon className={classes.date} />

          <EvoDataForm formData={formData} />

          <Grid container item xs={1} style={{ marginLeft: '10px' }}>
            <EvoButton btnText={'Go'} />
          </Grid>
        </Grid>

        <TimeCardDistribution data={getTimeCardSummary} />
        <TimeCard
          setCreateRequest={setCreateRequest}
          data={getTimeCardData?.timeCardDTOList}
          setPunchDetailGrid={setPunchDetailGrid}
          getOuterText={(object) => setPunchDetailRows([object])}
        />

        {createRequest ? (
          <RequestCreateModal
            title={'Request Details'}
            onClose={setCreateRequest}
            onCreate={createrequesthandler}
            person={{ personId: employeeId }}
          />
        ) : null}

        {punchDetailGrid ? (
          <CustomDialog title={'Punch Details'} handleClose={() => setPunchDetailGrid(false)}>
            <EvoDataGrid
              height={400}
              rows={punchDetailRows}
              columns={getTimeCardPunchDetailColumns}
            />
          </CustomDialog>
        ) : null}
      </CustomPanel>
    </>
  );
};

const useStyles = makeStyles(() => ({
  enddate: {
    color: '#124590',
    cursor: 'pointer',
  },
  nextdate: {
    cursor: 'pointer',
    color: '#124590',
  },
  calendericon: {
    color: '#124590',
    cursor: 'pointer',
    alignItems: 'center !important',
  },
  calenderdropdown: {
    display: 'flex !important',
    fontSize: '14px !important',
    alignItems: 'center !important',
  },
}));

export default Index;