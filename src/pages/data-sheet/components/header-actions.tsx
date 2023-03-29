import { Space } from 'antd';
import { DownloadAction, UploadAction } from 'components/actions';
import { EditType, EditTypeProps } from 'components/button/edit-type';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { COLORS } from 'helpers/constants';

export const HeaderActions = () => {
  const { startEditType, finishEditType, editTypeisOpened, nodeTypeId } = useDataSheetWrapper();
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
      <UploadAction icon={iconProps} />
      <DownloadAction icon={iconProps} />
      <EditType icon={iconProps} {...editTypeProps} />
    </Space>
  );
};
