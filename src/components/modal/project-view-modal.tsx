import { ReactComponent as LeftCircle } from 'components/icons/right-button.svg';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ReactComponent as Public } from 'components/icons/public.svg';

import { Button } from "components/button"
import { MenuText, Text } from "components/typography";
import styled from "styled-components";
import { Col, Drawer, Row, Space } from "antd";
import { COLORS, PATHS } from "helpers/constants";
import { ProjectLogo } from "components/project/project-logo";
import { ProjectButtonContent, ProjectList, ProjectStatisticsType } from "types/project";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ProjectStatistics } from "components/project/project-statistics";
import useGetProjectInfo from "api/projects/use-get-project-info";

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (value: undefined | string) => void;
    projectId: string;
};

type TitleProps = ProjectButtonContent & ProjectStatisticsType & {
    handleCancel: () => void
};

const ProjectWrapModal = styled(Drawer)`
    & {
        margin: 0;
        margin-left: auto;
        position: static;
        min-height: 100vh;
        height: 100%;

        &.ant-drawer-content {
            background: #FDFDFD;
            box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
            border-radius: 4px; 
            padding: 0;

            .ant-drawer-header {
                padding: 0 16px 0 72px;
                margin: 0;

                .back-link {
                    position: absolute;
                    font-size: 40px;
                    left: -20px;
                    top: 33px;
                    cursor: pointer;
                }
            }

            .ant-drawer-body {
                background-color: ${COLORS.PRIMARY.GRAY_LIGHT};
                padding: 0;

                .project-content {
                    height: calc(100vh - 228px);
                }
            }
        }
    }
`;

const TitleWrapper = styled(Space)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 104px;
    background: transparent;
`;


const FooterWrapper = styled.div`
    height: 40px;
    background: linear-gradient(119.84deg, rgba(255, 255, 255, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 42px 0;
`;

const Title = ({ project, comments, likes, views, size, handleCancel } : TitleProps) => <>
<LeftCircle className="back-link" onClick={handleCancel} />
<TitleWrapper>
    <Space>
        <ProjectLogo project={project} />
        <Text>{project.name}</Text>
    </Space>
    <Space size={30}>
        <ProjectStatistics comments={comments} likes={likes} views={views} size={size} />
        <Public width='16px' style={{ marginTop: '4px' }} />
        <DotsVertical />
    </Space>
</TitleWrapper></>


export const ProjectViewModal = ({ isModalOpen, setIsModalOpen, projectId }: Props) => {
    const navigate = useNavigate();

    const { data } = useGetProjectInfo({ id: projectId }, {enabled: !!projectId});
    const handleCancel = () => {
        setIsModalOpen(undefined);
    };

    const project: ProjectList = data && data.project ? {
        id: data.project.id,
        color: data.project.color, 
        name: data.project.title, 
        folderId: data.project.folder_id,
        type: data.project.privacy, 
        dateTime: dayjs(data.project.updated_at).format('YYYY-MM-DD HH:mm')
    } : {} as ProjectList;

    return <>
        <ProjectWrapModal 
            open={isModalOpen} 
            title={project.id ? <Title handleCancel={handleCancel} project={project} size={20} comments={data?.comments || 0} likes={data?.likes || 0} views={data?.views || 0} /> : ''}
            footer={false} 
            closable={false}
            placement='right'
            width='50vw'
        >
            <div className="project-content"></div>
            <FooterWrapper>
                <Row justify='center'>
                    <Col span={12}>
                        <Button block type="primary" onClick={() => navigate(PATHS.PROJECT_OVERVIEW.replace(':id', project.id))}>
                           <MenuText strong style={{ color: '#ffffff' }}>OPEN PROJECT</MenuText>
                        </Button>
                    </Col>
                </Row>
            </FooterWrapper>
        </ProjectWrapModal>
    </>
}