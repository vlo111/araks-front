import { Button as Component, ButtonProps, Space } from "antd"
import { Text } from "components/typography";
import styled, { css } from "styled-components"
import { COLORS } from "../../helpers/constants";
import { ReactComponent as FolderFilled } from '../icons/folder-filled.svg';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ProjectActionPopover } from "components/popover";
import { FolderActionMenu } from "components/menu";

type Props = ButtonProps & {
    folderName: string;
    folderId: string;
    countItems: number;
    fullWidth?: boolean;
}

const DotsWrapper = styled.div`
    & {
        height: 30px;
        width: 15px;
        padding: 5px;
        border-radius: 8px;

        &:hover, &:active {
            border-color: transparent;
            background-color: rgba(35, 47, 106, 0.1);
        }

        circle {
            fill: #F2F2F2;
            font-size: 20px;
        }
    }
`;

const FolrderText = (props: Omit<Props, 'ButtonProps'>) => <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Space style={{ lineHeight: '1' }}>
        <FolderFilled />
        <Text className="folder-name">{props.folderName}</Text>
        <Text className="folder-count">({props.countItems})</Text>
    </Space>
    <ProjectActionPopover align={{ offset: [-20, -5] }} content={<FolderActionMenu countItems={props.countItems} folderName={props.folderName} folderId={props.folderId} />}>
        <DotsWrapper><DotsVertical className="more-dots" /></DotsWrapper>
    </ProjectActionPopover>
</Space>

export const FolderButton = styled(({ folderName, folderId, countItems, fullWidth, ...props  }: Props) => <Component
 {...props}
 children={<FolrderText folderName={folderName} folderId={folderId} countItems={countItems} />}
 size="large" 
 type="default" 
/>)`
    &.ant-btn-default {
        background: #F2F2F2;
        text-align: left;
        ${(props: Props) => props.fullWidth ? css`
            border: none;
            border-bottom: 1px solid #C3C3C3;
            border-radius: 0;
            padding: 5px 20px;
        ` : css`
            border: 1px solid #FFFFFF;
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
        } 

        .folder-count {
            font-weight: 500;
        }

        .more-dots circle {
            fill: #F2F2F2;
        }

        &:not(:disabled) {
            &:hover, &:active {
                ${(props: Props) => props.fullWidth ? css`
                    border-bottom: 1px solid #C3C3C3;
                ` : css`
                `}

                svg path {
                    fill: ${COLORS.PRIMARY.BLUE};
                }

                .folder-name, .folder-count {
                    color: ${COLORS.PRIMARY.BLUE};
                }

                .more-dots circle {
                    fill: ${COLORS.PRIMARY.BLUE};
                }
            }
        }
    }
`;