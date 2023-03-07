import { Col, Divider, Row as RowComponent, Space, Spin } from "antd";
import useGetProject from "api/projects/use-get-project"
import VerticalSpace from "components/space/vertical-space";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MenuText, SecondaryText, Text } from "components/typography";
import { ManageProjectUrlProp, URL_CREAT_PROJECT } from "api/projects/use-manage-project";
import { RequestType, RequestTypes } from "api/types";
import { ProjectUserInfo } from "./components/project-user-info";
import { ViewColorIcon } from "./components/view-color-icon";
import { COLORS, PATHS } from "helpers/constants";
import Icon from "components/icon";

const Row = styled(RowComponent)`
    &.overview {
        height: calc(100vh - 152px);

        .ant-col.overview__section {
            background: #F7F7F7;

            opacity: 0.2;
            box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);

            &:first-child {
                opacity: 1;
                box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
            }

            &.project-save {
                padding: 32px 32px 40px;
            }
        }

        .overview-form-items {
            min-height: 80vh;
        }
    }
    
`;

const ProjectInfo = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100%;
    background: rgba(35, 47, 106, 0.4);
    box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.16);
    backdrop-filter: blur(2px);
    border-radius: 4px;
    padding: 2px 21px;
`;

type Props = {
    manageUrl?: ManageProjectUrlProp;
    type?: RequestType;
}

export const ProjectOverview = ({ manageUrl= URL_CREAT_PROJECT, type = RequestTypes.Post }: Props) => {
    const navigate = useNavigate();
    const params = useParams();
    const { data, isLoading } = useGetProject(
        { id: params.id },
        { 
            enabled: !!params.id, 
        }
    );

    return <Spin spinning={isLoading}>
        <Row className="overview">
            <Col span={8} className='overview__section project-save'>
                <VerticalSpace size={17} className='overview-form-items'>
                    <VerticalSpace size={42}>
                        <div style={{ width: '100%', display: 'flex', gap: '22px' }}>
                            <ViewColorIcon icon={data?.project?.icon || ''} color={data?.project?.color || ''} />
                            <VerticalSpace size={14}>
                                <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <MenuText strong color="">{data?.project?.title}</MenuText>
                                    <Icon 
                                        color='#3D487C' 
                                        icon='edit-pencil' 
                                        size={25} 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(PATHS.PROJECT_UPDATE.replace(':id', params.id || ''))} 
                                    />
                                </Space>
                                <Divider style={{ margin: '0', backgroundColor: '#95A2E1' }} />
                                <ProjectUserInfo createdAt={data?.project?.created_at} updatedAt={data?.project?.updated_at} />
                            </VerticalSpace>
                        </div>
                        <VerticalSpace size='small'>
                            <SecondaryText color="#C5C5C5">Description</SecondaryText>
                            {data?.project?.description}
                        </VerticalSpace>
                    </VerticalSpace>
                    <Divider style={{ margin: '0' }} />
                    <VerticalSpace size='small'>
                        <SecondaryText color="#C5C5C5">Project Info</SecondaryText>
                        <Space size={7}>
                            <ProjectInfo>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>Node Types</SecondaryText>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                            </ProjectInfo>
                            <ProjectInfo>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>Connection Types</SecondaryText>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                            </ProjectInfo>
                            <ProjectInfo>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>Nodes</SecondaryText>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                            </ProjectInfo>
                            <ProjectInfo>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>Connections</SecondaryText>
                                <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                            </ProjectInfo>
                        </Space>
                    </VerticalSpace>
                    <Divider style={{ margin: '0' }} />
                    <Space size={30}>
                        <Icon color='#353432' icon={data?.project?.privacy === 'public' ? 'globe1' : 'users1'} size={25} />
                        <Text style={{ textTransform: 'capitalize' }}>{data?.project?.privacy}</Text>
                    </Space>
                </VerticalSpace>
            </Col>
            <Col span={8} className='overview__section project-share'></Col>
            <Col span={8} className='overview__section project-comments'></Col>
        </Row>
    </Spin>
}