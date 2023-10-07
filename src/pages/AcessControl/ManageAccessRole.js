import React, { useState } from "react";
import { CustomPage } from "../../components/CustomPage";
import EvoDataGrid from "../../components/EvoDataGrid";
import { useManageAccessRoleGetData } from "../../services/accesscontrol";
import AccessRoleModal from "./AccessRoleModal";

const ManageAccessRole = (props) => {
  const [errorProps, setErrorProps] = useState({});

  const {
    data: getAccessRoleData,
    refetch: getAllProjectRefetch,
    isLoading,
  } = useManageAccessRoleGetData();

  const tableColumns = [
    { key: "roleName", name: "Role Name", width: 250 },
    { key: "enabled", name: "Enabled?", width: 80 },
  ];

  return (
    <CustomPage
      title={props.title}
      isLoading={isLoading}
      snakeBarProps={errorProps}
    >
      <EvoDataGrid
        columns={tableColumns}
        rows={getAccessRoleData}
        RowEditorModal={(props) => (
          <AccessRoleModal
            {...props}
            getRolesRefetch={getAllProjectRefetch}
            setErrorProps={setErrorProps}
          />
        )}
        CreatorModal={(props) => (
          <AccessRoleModal
            {...props}
            getRolesRefetch={getAllProjectRefetch}
            setErrorProps={setErrorProps}
          />
        )}
      />
    </CustomPage>
  );
};

export default ManageAccessRole;
