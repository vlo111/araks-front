import { Button as Component, ButtonProps, Space } from 'antd';
import { Text } from 'components/typography';
import styled, { css } from 'styled-components';
import { COLORS } from '../../helpers/constants';
import { ReactComponent as FolderFilled } from '../icons/folder-filled.svg';
import { ProjectActionPopover } from 'components/popover';
import { FolderActionMenu } from 'components/menu';
import { ActionDots } from 'components/actions/dots';
import { textSizeMedia } from 'components/typography/text';
import { CreateEditFolderModal, DeleteFolderModal } from 'components/modal';
import { useCallback, useState } from 'react';
import { RequestTypes } from 'api/types';
import { FOLDER_UPDATE_URL } from 'api/folders/use-manage-folder';

type Props = ButtonProps & {
  folderName: string;
  folderId: string;
  countItems: number;
  fullWidth?: boolean;
};

const FolrderText = (props: Omit<Props, 'ButtonProps'>) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openDeleteModal = useCallback(() => {
    setIsClicked?.(false);
    setIsDeleteModalOpen(true);
  }, [setIsClicked]);
  const openEditModal = useCallback(() => {
    setIsClicked?.(false);
    setIsEditModalOpen(true);
  }, [setIsClicked]);
  return (
    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space style={{ lineHeight: '1' }}>
        <FolderFilled />
        <Text className="folder-name">{props.folderName}</Text>
        <Text className="folder-count">({props.countItems})</Text>
      </Space>
      <ProjectActionPopover
        align={{ offset: [-20, -5] }}
        open={isClicked}
        onOpenChange={(open: boolean) => {
          !open && setIsClicked(false);
          return open;
        }}
        content={
          <FolderActionMenu
            setIsDeleteModalOpen={openDeleteModal}
            setIsEditModalOpen={openEditModal}
            folderName={props.folderName}
            folderId={props.folderId}
          />
        }
      >
        <ActionDots onClick={() => setIsClicked((prev) => !prev)} />
      </ProjectActionPopover>
      <DeleteFolderModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        folderId={props.folderId}
        countItems={props.countItems}
      />
      <CreateEditFolderModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        initialValue={props.folderName}
        type={RequestTypes.Put}
        url={FOLDER_UPDATE_URL.replace(':id', props.folderId)}
      />
    </Space>
  );
};

export const FolderButton = styled(({ folderName, folderId, countItems, fullWidth, ...props }: Props) => (
  <Component {...props} size="large" type="default">
    <FolrderText folderName={folderName} folderId={folderId} countItems={countItems} />
  </Component>
))`
  &.ant-btn-default {
    background: #f2f2f2;
    text-align: left;
    ${(props: Props) =>
      props.fullWidth
        ? css`
            border: none;
            border-bottom: 1px solid #c3c3c3;
            border-radius: 0;
            padding: 5px 20px;
          `
        : css`
            border: 1px solid #ffffff;
            box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.1);
            border-radius: 8px;
            padding: 16px 28px;
          `}

    .folder-name {
      color: ${COLORS.PRIMARY.GRAY_DARK};
      margin-left: 8px;
      font-weight: 600;
      font-size: 24px;
      line-height: 31px;
      ${textSizeMedia}
    }

    .folder-count {
      font-weight: 500;
    }

    .more-dots circle {
      fill: #f2f2f2;
    }

    &:not(:disabled) {
      &:hover,
      &:active {
        ${(props: Props) =>
          props.fullWidth
            ? css`
                border-bottom: 1px solid #c3c3c3;
              `
            : css``}

        svg path {
          fill: ${COLORS.PRIMARY.BLUE};
        }

        .folder-name,
        .folder-count {
          color: ${COLORS.PRIMARY.BLUE};
        }

        .more-dots circle {
          fill: ${COLORS.PRIMARY.BLUE};
        }
      }
    }
  }
`;
