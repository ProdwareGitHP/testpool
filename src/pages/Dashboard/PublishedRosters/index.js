import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';

import data from './publishedrosters.json';
import EvoDataGrid from '../../../components/EvoDataGrid';
import { CustomPanel } from '../../../components/CustomPanel';
import { CustomDialog } from '../../../components/CustomDialog';
import { usePublishedRosters, usePublishedRosterPopup, usePublishedRosterByMe } from '../../../services/rosterapi';

const PublishedRosters = () => {
  let totalHrs = 0;

  const { userId, employeeId } = useSelector((state) => state?.commonReducer);

  const [pubRosterHId, setPubRosterHId] = useState(0);
  const [showRoasterModel, setShowRoasterModel] = useState(false);
  const [showPublishedByMeModal, setShowPublishedByMeModal] = useState(false);

  const { data: getPublishedRosterByMe, isLoading: isPubByMeLoading } = usePublishedRosterByMe({ userId });
  const { data: getPublishedRosterPopup, isLoading: isPubPopupLoading } = usePublishedRosterPopup({ pubRosterHId });
  const { data: getPublishedRosters, isLoading: isPubRosterLoading } = usePublishedRosters({ personId: employeeId });

  const onClickRoaster = (id) => {
    setPubRosterHId(id);
    setShowRoasterModel(true);
  };

  const viewPublishedByMe = () => setShowPublishedByMeModal(true);

  getPublishedRosterPopup?.map(item => totalHrs += item?.schHrs);
  const startDate = getPublishedRosterPopup?.[getPublishedRosterPopup?.length - 1]?.timeStart?.substr(0, 10)?.split('-')?.reverse()?.join('-');
  const endDate = getPublishedRosterPopup?.[0]?.timeStart?.substr(0, 10)?.split('-')?.reverse()?.join('-');

  const getPublishRosterColumns = [
    {
      name: '',
      width: '50%',
      key: 'publishedForName',
      renderCell: ({ row }) => <Box component={'span'} sx={styles.link} onClick={() => onClickRoaster(row?.pubRosterHId)}>Published By: {row?.publishedByName}</Box>
    },
    { name: '', key: 'publishedOn', width: '50%' },
  ];

  const getPublishedRosterPopupColumns = [
    { name: 'Effective Date', key: 'effectiveDate', width: '20%' },
    { name: 'Description', key: 'departmentName', width: '40%' },
    { name: 'Time', key: 'time', width: '25%', renderCell: ({ row }) => <Box>{convertTimeFormate(row?.timeStart?.substr(11, 19))} to {convertTimeFormate(row?.timeEnd?.substr(11, 19))}</Box> },
    { name: 'SCH Hrs', key: 'schHrs', width: '20%' },
  ];

  const PublishedTable = ({ data, columns }) => (
    <EvoDataGrid hideHeader rows={data} height={400} columns={columns} />
  );

  const convertTimeFormate = (timeString) => new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' });

  return (
    <>
      <CustomPanel isLoading={isPubRosterLoading} title={'Published Roster(s)'}>
        <Grid xs={'12'}>
          <Grid style={styles.viewRoastersByMeHeading}>
            <Typography style={styles.vrbmHeading} onClick={viewPublishedByMe}>View Roster(s) Published by me</Typography>
          </Grid>

          <Grid container style={styles.mappingCon}>
            <PublishedTable data={getPublishedRosters} columns={getPublishRosterColumns} />

            <Grid style={styles.paginationCon}>
              <Typography style={styles.loadMoreItemsText}>Load More Items</Typography>
              <Typography style={{ fontSize: '12px' }}>1-{getPublishedRosters?.length} of {getPublishedRosters?.length} items</Typography>
            </Grid>

            {showPublishedByMeModal ? (
              <CustomDialog maxWidth={'xl'} title={'Published Roster(s)'} open={showPublishedByMeModal} handleClose={setShowPublishedByMeModal} isLoading={isPubByMeLoading} style={{ width: 500 }}>
                <PublishedTable data={getPublishedRosterByMe} columns={data?.roasterHeaders} />
              </CustomDialog>
            ) : null}
          </Grid>
        </Grid>
      </CustomPanel>

      {showRoasterModel ? (
        <CustomDialog maxWidth={'md'} title={'Published Roster(s)'} handleClose={setShowRoasterModel} isLoading={isPubPopupLoading} style={{ width: '700px' }}>
          <EvoDataGrid
            height={600}
            headerRowHeight={70}
            rows={getPublishedRosterPopup}
            columns={getPublishedRosterPopupColumns}
            title={`Your shift schedule from ${startDate} to ${endDate}`}
          />

          <Typography style={styles.totalHrs}>Total Hrs {totalHrs}</Typography>
        </CustomDialog>
      ) : null}
    </>
  );
};

const styles = {
  viewRoastersByMeHeading: {
    display: 'flex',
    cursor: 'pointer',
    padding: '10px 5px',
    paddingBottom: '14px',
    justifyContent: 'flex-end',
    borderBottom: '1px solid #e0e0e0',
  },
  vrbmHeading: {
    color: 'blue',
    fontSize: '12px',
  },
  mappingCon: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    paddingTop: '1px',
    borderBottom: '1px solid #e0e0e0',
  },
  paginationCon: {
    display: 'flex',
    padding: '5px',
    paddingTop: '14px',
    justifyContent: 'flex-end',
  },
  loadMoreItemsText: {
    color: 'blue',
    fontSize: '12px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  link: {
    color: '-webkit-link',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  totalHrs: {
    fontSize: 14,
    display: 'flex',
    fontWeight: '700',
    justifyContent: 'flex-end',
  },
};

export default PublishedRosters;