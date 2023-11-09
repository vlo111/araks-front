import { Space } from 'antd';
import { UserProjectRole } from 'api/types';
import { DownloadAction, UploadAction } from 'components/actions';
import { EditType, EditTypeProps } from 'components/button/edit-type';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useProject } from 'context/project-context';
import { COLORS } from 'helpers/constants';
// import { ManageNode } from './table-section/node/manage-node';
// import { useRef, useState } from 'react';

export const HeaderActions = () => {
  const { projectInfo } = useProject();
  // const [tableHead] = useState(0);
  // const tableRef = useRef<HTMLDivElement>(null);
  const { startEditType, finishEditType, editTypeisOpened, nodeTypeId, isConnectionType, nodesList } =
    useDataSheetWrapper();
  const iconProps = nodeTypeId ? { style: { color: COLORS.PRIMARY.GRAY_DARK } } : {};

  const editTypeProps: EditTypeProps = nodeTypeId
    ? {
        onClick: startEditType,
        open: editTypeisOpened,
        onOpenChange: (open: boolean) => {
          !open && finishEditType();
          return open;
        },
      }
    : ({} as EditTypeProps);

  return (
    <Space size={8}>
      {nodesList?.length ? (
        <>
          {projectInfo && projectInfo?.role !== UserProjectRole.Viewer && (
            <>
              {!isConnectionType && <DownloadAction icon={iconProps} />}
              {!isConnectionType && <UploadAction icon={iconProps} />}
              {/* {!isConnectionType && <ManageNode tableHead={tableHead} tableHeight={tableRef.current?.offsetHeight} />} */}
            </>
          )}
          {projectInfo?.role === UserProjectRole.Owner && <EditType icon={iconProps} {...editTypeProps} />}
        </>
      ) : (
        <></>
      )}
    </Space>
  );
};
