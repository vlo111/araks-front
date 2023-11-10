import { Space } from 'antd';
import { UserProjectRole } from 'api/types';
import { AddNode, DownloadAction, UploadAction } from 'components/actions';
import { EditType, EditTypeProps } from 'components/button/edit-type';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useProject } from 'context/project-context';
import { COLORS } from 'helpers/constants';

export const HeaderActions = () => {
  const { projectInfo } = useProject();
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
              {/* {!isConnectionType && <ManageNode tableHeight={undefined} tableHead={0} />} */}
              {!isConnectionType && <AddNode />}
              {!isConnectionType && <DownloadAction icon={iconProps} />}
              {!isConnectionType && <UploadAction icon={iconProps} />}
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
