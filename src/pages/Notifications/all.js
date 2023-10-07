import React, { useState, useEffect } from 'react';

import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import MockData from './contant';
import EvoDataGrid from '../../components/EvoDataGrid';
import { EvoDataForm } from '../../components/EvoDataForm';
import { CustomPanel } from '../../components/CustomPanel';
import { EvoHBox, EvoVBox } from '../../components/EvoBox';
import { CustomDialog } from '../../components/CustomDialog';
import EvoToggleButton from '../../components/EvoButton/toggle';
import { AllNotificationToggleList } from '../Dashboard/DashBoardContants';

import {
  usePostNotificationOk,
  useGetAllNotification,
  usePostNotificationRMI,
  useGetNotificationPopup,
  useGetClosedNotification,
  usePostNotificationSubmit,
  usePostNotificationApprove,
  useGetInfoOnlyNotification,
  usePostNotificationForward,
  useGetNotificationApproval,
  useGetActionableNotification,
  useGetNotificationSelfRosterApproval,
  usePostNotificationSelfRosterApproval,
} from '../../services/notifications';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Index = () => {
  const { userId } = useSelector((state) => state?.commonReducer);

  const { data: getAllNotification, isLoading: loadingAllNotification } = useGetAllNotification({ userId });
  const { data: getClosedNotification, isLoading: loadingClosedNotification } = useGetClosedNotification({ userId });
  const { data: getInfoOnlyNotification, isLoading: loadingInfoOnlyNotification } = useGetInfoOnlyNotification({ userId });
  const { data: getActionableNotification, isLoading: loadingActionableNotification } = useGetActionableNotification({ userId });

  const [notifyId, setNotifyId] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [getDailogTitle, setDailogTitle] = useState('');
  const [actionButtons, setActionButtons] = useState({});
  const [forwardComment, setForwardComment] = useState('Forward');
  const [selfRosterVisible, setSelfRosterVisible] = useState(false);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const [moreInfoModalVisible, setMoreInfoModalVisible] = useState(false);
  const [nonSelfRosterVisible, setNonSelfRosterVisible] = useState(false);
  const [getNotification, setNotification] = useState(getAllNotification);
  const [moreInfoComment, setMoreInfoComment] = useState('Request More Info');
  const [snakeBarPropsRosterSetting, setSnakeBarPropsRosterSetting] = useState({});
  const [getToggleStatus, setToggleStatus] = useState(AllNotificationToggleList[0]);

  const { data: getNotificationPopup, isLoading: loadingPopup } = useGetNotificationPopup({ personRequestId: uniqueId });
  const { data: getNotificationApproval, isLoading: loadingApproval } = useGetNotificationApproval({ personRequestId: uniqueId });
  const { data: getNotificationSelfRosterApproval, isLoading: loadingSelfRosterApproval } = useGetNotificationSelfRosterApproval({ itemKey: uniqueId });

  const { mutate: callPostSelfRoster, isLoading: loadingPostSelfRosterApproval } = useMutation(usePostNotificationSelfRosterApproval, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data, context, variables) => onSuccessSelfRosterNotification(data, context, variables),
  });

  const { mutate: callPostOk, isLoading: loadingPostOk } = useMutation(usePostNotificationOk, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data) => data ? handleClose() : null,
  });

  const { mutate: callPostSubmit, isLoading: loadingPostSubmit } = useMutation(usePostNotificationSubmit, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data) => data ? handleClose() : null,
  });

  const { mutate: callPostApprove, isLoading: loadingPostApprove } = useMutation(usePostNotificationApprove, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data) => data ? handleClose() : null,
  });

  const { mutate: callPostRMI, isLoading: loadingPostRMI } = useMutation(usePostNotificationRMI, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data) => data ? handleClose() : null,
  });

  const { mutate: callPostForward, isLoading: loadingPostForward } = useMutation(usePostNotificationForward, {
    onError: (data, context, variables) => onErrorNotification(data, context, variables),
    onSuccess: (data) => data ? handleClose() : null,
  });

  const onSuccessSelfRosterNotification = ({ data }) => {
    if (data) {
      const selfRoster = data?.data;
      MockData.editInputData.items[0].value = `${selfRoster?.[0]?.fromDate?.[2] < 10 ? '0' + selfRoster?.[0]?.fromDate?.[2] : selfRoster?.[0]?.fromDate?.[2]}-${monthNames?.[selfRoster?.[0]?.fromDate?.[1]]?.substring(0, 3)}-${selfRoster?.[0]?.fromDate?.[0]}`;
      MockData.editInputData.items[1].value = `${selfRoster?.[0]?.toDate?.[2] < 10 ? '0' + selfRoster?.[0]?.toDate?.[2] : selfRoster?.[0]?.toDate?.[2]}-${monthNames?.[selfRoster?.[0]?.toDate?.[1]]?.substring(0, 3)}-${selfRoster?.[0]?.toDate?.[0]}`;
      MockData.editInputData.items[2].value = selfRoster?.[0]?.department;
      MockData.editInputData.items[3].value = selfRoster?.[0]?.jobTitle;
      MockData.editInputData.items[4].value = selfRoster?.[0]?.locationName;
      MockData.editInputData.items[5].value = selfRoster?.[0]?.comments;

      setSelfRosterVisible(true);
    }
  };

  const onErrorNotification = (error) => {
    if (error)
      setSnakeBarPropsRosterSetting({ msz: error?.response?.data?.status?.description, type: 'error' });
  };

  useEffect(() => setNotification(getAllNotification), getAllNotification);

  useEffect(() => {
    const selfRoster = getNotificationPopup?.[0];
    MockData.editInputData.items[0].value = `${selfRoster?.timeStart?.[2] < 10 ? '0' + selfRoster?.timeStart?.[2] : selfRoster?.timeStart?.[2]}-${monthNames?.[selfRoster?.timeStart?.[1]]?.substring(0, 3)}-${selfRoster?.timeStart?.[0]}`;
    MockData.editInputData.items[1].value = `${selfRoster?.timeEnd?.[2] < 10 ? '0' + selfRoster?.timeEnd?.[2] : selfRoster?.timeEnd?.[2]}-${monthNames?.[selfRoster?.timeEnd?.[1]]?.substring(0, 3)}-${selfRoster?.timeEnd?.[0]}`;
    MockData.editInputData.items[2].value = selfRoster?.department;
    MockData.editInputData.items[3].value = selfRoster?.jobTitle;
    MockData.editInputData.items[4].value = selfRoster?.locationName;
    MockData.editInputData.items[5].value = selfRoster?.comments;
  }, [getAllNotification, getNotificationPopup, getNotificationApproval, getNotificationSelfRosterApproval]);

  const handleNotification = (props) => {
    setToggleStatus(props);

    if (props?.value === 'all')
      setNotification(getAllNotification);

    if (props?.value === 'action')
      setNotification(getClosedNotification);

    if (props?.value === 'info')
      setNotification(getInfoOnlyNotification);

    if (props?.value === 'closed')
      setNotification(getActionableNotification);
  };

  const isLoading = loadingAllNotification || loadingClosedNotification || loadingInfoOnlyNotification || loadingActionableNotification || loadingPopup || loadingApproval || loadingSelfRosterApproval || loadingPostSelfRosterApproval || loadingPostOk || loadingPostSubmit || loadingPostApprove || loadingPostRMI || loadingPostForward;

  const getAllNotificationColumns = [
    {
      name: '',
      width: '80%',
      key: 'subject',
      renderCell: ({ row }) => (
        <EvoVBox>
          <EvoHBox>
            {row?.notifFlag ? (<Typography style={styles.notifFlag}>{row?.notifFlag}</Typography>) : null}
            <Typography style={styles.link} onClick={() => onClickTitle(row)}>{row?.subject}</Typography>
            {row?.actionType ? (<Typography style={(getToggleStatus.value === 'info' || getToggleStatus.value === 'closed' || row?.actionType === 'Info Only') ? styles.actionTypeSuccess : styles.actionTypeAlert}>({row?.actionType === 'Approval' ? 'Your Action Required' : row?.actionType})</Typography>) : null}
          </EvoHBox>
          <Typography style={styles.date}>{`${row?.dateStart?.[2] < 10 ? '0' + row?.dateStart?.[2] : row?.dateStart?.[2]}-${monthNames?.[row?.dateStart?.[1] - 1]?.substring(0, 3)} to ${row?.dateEnd?.[2]}-${monthNames[row?.dateEnd?.[1] - 1]?.substring(0, 3)}`}</Typography>
        </EvoVBox>
      ),
    },
    {
      key: 'action', name: '', width: '20%', renderCell: ({ row }) => {
        if (row?.timeStart?.length) {
          return (
            <EvoHBox>
              <WatchLaterIcon color='inherit' style={styles.icon} />
              <Typography style={styles.dateTime}>
                {`${row?.timeStart?.[2] < 10 ? '0' + row?.timeStart?.[2] : row?.timeStart?.[2]}-${monthNames[row?.timeStart?.[1] - 1]?.substring(0, 3)}-${row?.timeStart?.[0]} ${convertTime(`${row?.timeStart?.[3] < 10 ? '0' + row?.timeStart?.[3] : row?.timeStart?.[3]}:${row?.timeStart?.[4] === 0 ? '00' : row?.timeStart?.[4]}`)}`}
              </Typography>
            </EvoHBox>
          )
        }
      }
    },
  ];

  const convertTime = (time) => {
    time = time?.toString()?.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time?.length > 1) {
      time = time?.slice(1);
      time[5] = +time?.[0] < 12 ? ' AM' : ' PM';
      time[0] = +time?.[0] % 12 || 12;
    }

    return time?.join('');
  };

  const handleClose = () => {
    setUniqueId('');
    setSelfRosterVisible(false);
    setForwardModalVisible(false);
    setMoreInfoModalVisible(false);
    setNonSelfRosterVisible(false);
  };

  const handleForwardModal = () => setForwardModalVisible(true);

  const handleMoreInfoModal = () => setMoreInfoModalVisible(true);

  let mNotificationId = '';

  const onClickTitle = ({ notifCat, notifFlag, subject, itemKey, actionType, personId, personRequestId, notificationId }) => {
    mNotificationId = notificationId;
    setNotifyId(notificationId);

    if (actionType === 'Approval' && notifCat === 'REQUEST') {
      setActionButtons({ ['View Team Schedule']: {}, Approve: handleSubmitApprove, ['Request More Info']: handleMoreInfoModal, Forward: handleForwardModal });
    } else if (actionType === 'Info Only' && !notifFlag) {
      setActionButtons({});
    } else if (actionType === 'Approval' && notifFlag === 'Forwarded') {
      setActionButtons({ Ok: handleOkAction });
    } else if (actionType === 'Approval' && notifFlag === 'More Info Requested') {
      setActionButtons({ Submit: handleSubmitAction });
    }

    setDailogTitle(subject);

    if (actionType === 'Approval') {
      setUniqueId(itemKey);
      callPostSelfRoster({ itemKey, personId });
    } else {
      setUniqueId(personRequestId);
      setNonSelfRosterVisible(true);
    }
  };

  const handleOkAction = () => {
    callPostOk({ notificationId: mNotificationId ? mNotificationId : notifyId, action: 'OK', userId });
  };

  const handleSubmitAction = () => {
    callPostSubmit({ notificationId: mNotificationId ? mNotificationId : notifyId, action: 'SUBMIT', userId, comments: 'SUBMIT BY USER' });
    };

  const handleSubmitApprove = () => {
    callPostApprove({ notificationId: mNotificationId ? mNotificationId : notifyId, action: 'APPROVED', userId, comments: 'APPROVED BY USER' });
    };

  const handleSubmitRMI = () => {
    callPostRMI({ notificationId: mNotificationId ? mNotificationId : notifyId, action: 'RMI', userId, comments: moreInfoComment });
  };

  const handleSubmitForward = () => {
    callPostForward({ notificationId: mNotificationId ? mNotificationId : notifyId, action: 'FORWARDED', userId, comments: forwardComment, rmiUserId: userId });
  };

  const forwardactionButtons = { Forward: handleSubmitForward };
  const moreInfoactionButtons = { ['Request More Info']: handleSubmitRMI };

  return (
    <CustomPanel title={'Notifications'} style={{ marginLeft: '8px', marginBottom: '16px', paddingBottom: '10px' }} isLoading={isLoading}>
      <EvoToggleButton status={getToggleStatus} handlechange={handleNotification} list={AllNotificationToggleList} />

      <EvoDataGrid hideHeader={true} rows={getNotification} columns={getAllNotificationColumns} />

      <CustomDialog
        title={getDailogTitle}
        actions={actionButtons}
        open={selfRosterVisible}
        handleClose={handleClose}
        snakeBarProps={snakeBarPropsRosterSetting}>
        <EvoDataForm formData={MockData.editInputData} />
        <EvoDataGrid columns={MockData.calendarColumns} rows={getNotificationSelfRosterApproval} />
        <EvoDataGrid title={'Approval History'} columns={MockData.approvalHistoryColumns} rows={getNotificationSelfRosterApproval} />
      </CustomDialog>

      <CustomDialog
        title={getDailogTitle}
        actions={actionButtons}
        handleClose={handleClose}
        open={nonSelfRosterVisible}>
        <EvoDataForm formData={MockData.editInputData} />
        <EvoDataGrid columns={MockData.calendarColumns} rows={getNotificationPopup} />
        <EvoDataGrid title={'Approval History'} columns={MockData.approvalHistoryColumns} rows={getNotificationApproval} />
      </CustomDialog>

      <CustomDialog
        divider={false}
        title={'Forward'}
        handleClose={handleClose}
        open={forwardModalVisible}
        actions={forwardactionButtons}>
        <EvoHBox style={styles.box}>
          <Typography style={styles.typo}>Forward To</Typography>
          <input />
        </EvoHBox>

        <EvoHBox style={styles.box}>
          <Typography style={styles.typo}>Comments</Typography>
          <textarea rows={5} cols={35} onChange={({ target }) => setForwardComment(target?.value)} value={forwardComment} />
        </EvoHBox>
      </CustomDialog>

      <CustomDialog
        divider={false}
        handleClose={handleClose}
        title={'Request More Info'}
        open={moreInfoModalVisible}
        actions={moreInfoactionButtons}>
        <EvoHBox style={styles.box}>
          <Typography style={styles.typo}>Request More Info From</Typography>
          <input />
        </EvoHBox>

        <EvoHBox style={styles.box}>
          <Typography style={styles.typo}>Comments</Typography>
          <textarea rows={5} cols={35} onChange={({ target }) => setMoreInfoComment(target?.value)} value={moreInfoComment} />
        </EvoHBox>
      </CustomDialog>
    </CustomPanel>
  );
};

const styles = {
  link: {
    fontSize: '10px',
    cursor: 'pointer',
    color: '-webkit-link',
  },
  notifFlag: {
    color: 'white',
    fontSize: '8px',
    fontWeight: '600',
    padding: '2px 5px',
    borderRadius: '1px',
    backgroundColor: 'orange',
  },
  actionTypeAlert: {
    color: 'red',
    fontSize: '10px',
    fontWeight: '600',
  },
  actionTypeSuccess: {
    color: 'green',
    fontSize: '10px',
    fontWeight: '600',
  },
  date: {
    fontSize: '10px',
    marginTop: '-8px',
    fontWeight: '500',
  },
  dateTime: {
    color: 'gray',
    fontSize: '12px',
    fontWeight: '500',
  },
  icon: {
    color: 'gray',
    fontSize: '15px',
    marginRight: '-5px',
  },
  box: {
    margin: '10px 20px',
  },
  typo: {
    fontWeight: '600',
  },
};

export default Index;