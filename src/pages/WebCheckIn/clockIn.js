import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';

import Clock from '../../components/Clock';
import EvoImage from '../../components/EvoImage';
import { EvoVBox } from '../../components/EvoBox';
import { EvoButton } from '../../components/EvoButton';
import EvoDataGrid from '../../components/EvoDataGrid';
import { CustomPanel } from '../../components/CustomPanel';
import { EvoDataForm } from '../../components/EvoDataForm';
import { CustomDialog } from '../../components/CustomDialog';
import { useAllDepartmentData } from '../../services/rostersettings';
import { useGetScheduleJobTitle } from '../../services/accesscontrol';
import { datetimeConverter, getCurrentTime } from '../../utils/commonService';
import { useGetAllPunches, usePostAllPunches } from '../../services/web-check-in';

const getClockHistoryColumns = [
  { name: 'Punch Time', key: 'punchTime', width: '20%', type: 'datetime' },
  { name: 'Punch type', key: 'punchType', width: '10%' },
  { name: 'Department', key: 'departmentName', width: '30%' },
  { name: 'Job', key: 'jobTitle', width: '25%' },
  { name: 'Comments', key: 'comments', width: '15%' },
];

const ClockIn = () => {
  let seconds = 0;

  const [comments, setComments] = useState('');
  const [visible, setVisible] = useState(false);
  const [punchTime, setPunchTime] = useState('');
  const [punchType, setPunchType] = useState('');
  const [loggedTime, setLoggedTime] = useState(0);
  const [onClickGo, setOnClickGo] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [onClickClock, setClickClock] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [jobTitleObject, setJobTitleObject] = useState({});
  const [departmentObject, setDepartmentObject] = useState({});
  const [isViewHistoryVisible, setViewHistoryVisible] = useState(false);
  const [snakeBarPropsRosterSetting, setSnakeBarPropsRosterSetting] = useState({});

  const { employeeId: personId } = useSelector((state) => state?.commonReducer);

  const { data: jobData, isLoading: loadingJob } = useGetScheduleJobTitle();
  const { data: departmentData, isLoading: loadingDepartment } = useAllDepartmentData();
  
  const { data: getAllPunches, isLoading: loadingPunches } = useGetAllPunches({
    personId,
    toDate: onClickGo ? moment(endDate).format('DD-MM-YYYY') : '',
    fromDate: onClickGo ? moment(startDate).format('DD-MM-YYYY') : '',
  });

  const formData = {
    gap: 3,
    labelWidth: 250,
    direction: 'row',
    items: [
      {
        type: 'date',
        value: startDate,
        label: 'Start Date',
        onChange: setStartDate,
      },
      {
        type: 'date',
        value: endDate,
        label: 'End Date',
        onChange: setEndDate,
      },
    ],
  };

  useEffect(() => {
    setPunchTime(getCurrentTime());
  }, []);

  useEffect(() => {
    let timer;

    if (getAllPunches?.length && getAllPunches?.[0]?.punchType === 'Clock In' || onSuccess) {
      const endTime = new Date();
      const startTime = new Date(getAllPunches?.[0]?.punchTime);

      const timeDifference = endTime?.getTime() - startTime?.getTime();
      seconds = Math.round(timeDifference / 1000);

      timer = setInterval(calculatePunchingTime, 1000);
    }

    return () => clearInterval(timer);
  }, [onSuccess, getAllPunches]);

  const { mutate: saveWebCheckIn, isLoading: onLoadingSaveWebCheckIn } = useMutation(usePostAllPunches, {
    onSuccess: (data, context, variables) => onSuccessCreateRequest(data, context, variables),
    onError: (data, context, variables) => onErrorUpdateRequest(data, context, variables),
  });

  const onSuccessCreateRequest = async (data) => {
    if (punchType !== 'Clock Out' && data?.data?.data) {
      setOnSuccess(true);
      setTimeout(() => setVisible(false), 1000);
      setSnakeBarPropsRosterSetting({ msz: data?.data?.data, type: 'success' });

      calculatePunchingTime();
    } else {
      setOnSuccess(false);
      setTimeout(() => setVisible(false), 1000);
      setSnakeBarPropsRosterSetting({ msz: data?.data?.data, type: 'success' });
    }
  };

  const onErrorUpdateRequest = (error) => {
    if (error) {
      setOnSuccess(false);
      setSnakeBarPropsRosterSetting({ msz: 'Unable to Clock In!', type: 'error' });
    }
  };

  const calculatePunchingTime = () => {
    ++seconds;
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds - hour * 3600) / 60);

    const finalHour = hour > 9 ? hour : '0' + hour;
    const finalMinute = minute > 9 ? minute : '0' + minute;

    setLoggedTime(finalHour + ':' + finalMinute);
  };

  const onClickPunch = ({ type }) => {
    setSnakeBarPropsRosterSetting({});

    if (type === 'Last Clocks')
      return setClickClock(true);

    setPunchType(type);
    setVisible(true);
  };

  const onClickClose = () => {
    setVisible(false);
    setOnClickGo(false);
    setClickClock(false);
    setViewHistoryVisible(false);
    setSnakeBarPropsRosterSetting({});
  };

  const onClickSavePunch = () => {
    if (onClickClock) {
      onClickClose();
    } else {
      const currentTime = moment()?.format('hh:mm:ss');
      
      const punchData = {
        personId,
        comments,
        jobTitleId: jobTitleObject?.jobTitleId,
        departmentId: departmentObject?.departmentId,
        punchType: punchType === 'Clock In' ? 'IN' : 'OUT',
        punchTime: `${new Date()?.toLocaleDateString()?.split('/')?.reverse()?.join('-')}T${currentTime}`,
      };

      saveWebCheckIn(punchData);
    }
  };

  return (
    <CustomPanel style={{ width: '50%', marginLeft: '10px', marginBottom: '16px', padding: '0px 15px' }}>
      <Grid container gap={getAllPunches?.length && getAllPunches?.[0]?.punchType === 'Clock In' || onSuccess ? 10.5 : 50}>
        <EvoVBox style={{ width: getAllPunches?.length && getAllPunches?.[0]?.punchType === 'Clock In' || onSuccess ? '190px' : 110 }}>
          <Clock />

          {
            getAllPunches?.length && getAllPunches?.[0]?.punchType === 'Clock In' || onSuccess ? (
              <Grid container gap={2}>
                <div onClick={() => onClickPunch({ type: 'Change Activity' })}>
                  <EvoImage name={'change_cost_center'} height='75px' width='40px' />
                </div>
                <div onClick={() => onClickPunch({ type: 'Clock Out' })}>
                  <EvoImage name={'finger-print-red'} height='75px' width='40px' />
                </div>
              </Grid>
            ) : (
              <div onClick={() => onClickPunch({ type: 'Clock In' })}>
                <EvoImage name={'finger-print-green'} height='75px' width='40px' />
              </div>
            )
          }
        </EvoVBox>

        {getAllPunches?.length && getAllPunches?.[0]?.punchType === 'Clock In' || onSuccess ? (
          <Grid textAlign={'center'}>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c', fontSize: '16px' }}>Clock Running Since</Typography>
            <Typography style={{ fontWeight: 600, color: 'blue', fontSize: '30px' }}>{loggedTime}</Typography>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c', fontSize: '16px' }}>Hrs</Typography>
          </Grid>
        ) : null}

        <Grid>
          <Grid container gap={20}>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c', fontSize: '16px' }}>Last Clocks</Typography>
            <div onClick={() => onClickPunch({ type: 'Last Clocks' })}>
              <EvoImage name={'action_ena'} height='20px' width='20px' />
            </div>
          </Grid>

          {
            getAllPunches?.slice(0, 3)?.map((item, index) => (
              <Grid key={index} container gap={2}>
                <Typography style={{ fontSize: 14 }}>{datetimeConverter(item?.punchTime)}</Typography>
                <Typography style={{ fontSize: 14 }}>{item?.punchType}</Typography>
              </Grid>
            ))
          }

          <Typography style={{ fontWeight: 600, color: 'blue', fontSize: 14 }} onClick={() => setViewHistoryVisible(true)}>View More History</Typography>
        </Grid>
      </Grid>

      <CustomDialog
        maxWidth={'lg'}
        width={'800px'}
        divider={false}
        handleClose={onClickClose}
        open={visible || onClickClock}
        snakeBarProps={snakeBarPropsRosterSetting}
        title={visible ? 'Add Punch' : 'Punch Defaults'}
        actions={{ onSave: onClickSavePunch, onCancel: onClickClose }}
        isLoading={loadingDepartment || loadingJob || onLoadingSaveWebCheckIn || loadingPunches}>
        {visible ? (
          <Grid container mx={4} mt={2} mb={1}>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c' }}>Punch Time</Typography>
            <Typography style={{ fontWeight: 500, color: '#5e5c5c', marginLeft: 25 }}>{punchTime}</Typography>
          </Grid>
        ) : null}

        {visible ? (
          <Grid container mx={4} my={1}>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c' }}>Punch Type</Typography>
            <Typography style={{ fontWeight: 500, color: '#5e5c5c', marginLeft: 25 }}>{punchType}</Typography>
          </Grid>
        ) : null}

        <Grid container mx={4} my={1}>
          <Typography style={{ fontWeight: 600, color: '#5e5c5c', marginRight: 15 }}>Department</Typography>

          {punchType !== 'Clock Out' ? (
            <EvoDataForm
              formData={{
                item: {
                  type: 'dropdown',
                  editorProps: {
                    width: '620px',
                    data: departmentData,
                    month: departmentObject,
                    getoptionlabelkey: 'departmentName',
                    caller: (object) => setDepartmentObject(object),
                    selectIndex: departmentData?.map(item => item?.departmentId)?.indexOf(departmentObject?.departmentId),
                  },
                },
              }}
            />
          ) : (
            <Typography style={{ fontWeight: 500, color: '#5e5c5c', marginLeft: '10px' }}>{departmentObject?.departmentName}</Typography>
          )}
        </Grid>

        <Grid container mx={4} my={1}>
          <Typography style={{ fontWeight: 600, color: '#5e5c5c', marginRight: '78px' }}>Job</Typography>

          {punchType !== 'Clock Out' ? (
            <EvoDataForm
              formData={{
                item: {
                  type: 'dropdown',
                  editorProps: {
                    data: jobData,
                    width: '620px',
                    month: jobTitleObject,
                    getoptionlabelkey: 'jobTitle',
                    caller: (object) => setJobTitleObject(object),
                    selectIndex: jobData?.map(item => item?.jobTitleId)?.indexOf(jobTitleObject?.jobTitleId),
                  },
                },
              }}
            />
          ) : (
            <Typography style={{ fontWeight: 500, color: '#5e5c5c', marginLeft: '10px' }}>{jobTitleObject?.jobTitle}</Typography>
          )}
        </Grid>

        {visible ? (
          <Grid container mx={4} my={1}>
            <Typography style={{ fontWeight: 600, color: '#5e5c5c' }}>Comments</Typography>

            <input
              type={'text'}
              value={comments}
              onChange={(e) => setComments(e?.target.value)}
              style={{ width: '620px', height: 30, marginLeft: '25px', fontWeight: 500, color: '#5e5c5c', marginBottom: 20 }}
            />
          </Grid>
        ) : null}
      </CustomDialog>

      <CustomDialog
        maxWidth={'lg'}
        divider={false}
        width={'1000px'}
        title={'Clock History'}
        handleClose={onClickClose}
        open={isViewHistoryVisible}
        isLoading={loadingDepartment || loadingJob || loadingPunches || onLoadingSaveWebCheckIn}>
        <Grid style={{ display: 'flex', alignItems: 'center' }}>
          <EvoDataForm formData={formData} />

          <Grid container item xs={1} style={{ marginLeft: '10px' }}>
            <EvoButton btnText={'Go'} onClick={() => setOnClickGo(true)} />
          </Grid>
        </Grid>

        <EvoDataGrid height={600} rows={getAllPunches} columns={getClockHistoryColumns} />
      </CustomDialog>
    </CustomPanel>
  );
};

export default ClockIn;