import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { teamDateWidgetOption } from '../contants';
import { useMyTeamList } from '../../services/team';
import EvoDataGrid from '../../components/EvoDataGrid';
import { getMyTeamColumns } from './DashBoardContants';
import { DateWidget } from '../Staff/shared/datewidget';
import { CustomPanel } from '../../components/CustomPanel';

const MyTeams = () => {
  const { userId, startDate } = useSelector((state) => state?.commonReducer);
  const { data, isLoading } = useMyTeamList({ effectiveDate: startDate, userId });
  return (
    <Fragment>
      <CustomPanel isLoading={isLoading} title={'My Team'} style={{ marginLeft: '10px', marginBottom: '16px' }}>
        <DateWidget dateWidgetOption={teamDateWidgetOption} />

        <EvoDataGrid
          height={400}
          rows={data}
          columns={getMyTeamColumns}
        />

      </CustomPanel>
    </Fragment>
  );
};

export default MyTeams;
