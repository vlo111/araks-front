import { Divider, Space, Spin } from "antd";
import useGetProject from "api/projects/use-get-project"
import VerticalSpace from "components/space/vertical-space";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MenuText, SecondaryText, Text } from "components/typography";
import { ProjectUserInfo } from "./components/project-user-info";
import { ViewColorIcon } from "./components/view-color-icon";
import { COLORS, PATHS, screenSize } from "helpers/constants";
import Icon from "components/icon";
import { useIsXXlScreen } from "hooks/use-breakpoint";

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
    @media (max-width: ${screenSize.xxl}) { 
        padding: 1.5px 16px;
    }
`;

export const ProjectOverview = () => {
    const isXXl = useIsXXlScreen();
    const navigate = useNavigate();
    const params = useParams();
    const { data, isLoading } = useGetProject(
        { id: params.id },
        { 
            enabled: !!params.id, 
        }
    );

    return <Spin spinning={isLoading}>
        <VerticalSpace size={17} className='overview-form-items'>
            <VerticalSpace size={42}>
                <div style={{ width: '100%', display: 'flex', gap: '22px' }}>
                    <ViewColorIcon project={data} />
                    <VerticalSpace size={14}>
                        <Space style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <MenuText ellipsis strong>{data?.title}</MenuText>
                            <Icon 
                                color='#3D487C' 
                                icon='edit-pencil' 
                                size={isXXl ? 25 : 18} 
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(PATHS.PROJECT_UPDATE.replace(':id', params.id || ''))} 
                            />
                        </Space>
                        <Divider style={{ margin: '0', backgroundColor: '#95A2E1' }} />
                        <ProjectUserInfo createdAt={data?.created_at} updatedAt={data?.updated_at} userFullName={`${data?.user?.first_name} ${data?.user?.last_name}`} />
                    </VerticalSpace>
                </div>
                <VerticalSpace size='small'>
                    <SecondaryText color="#C5C5C5">Description</SecondaryText>
                    <Text>{data?.description}</Text>
                </VerticalSpace>
            </VerticalSpace>
            <Divider style={{ margin: '0' }} />
            <VerticalSpace size='small'>
                <SecondaryText color="#C5C5C5">Project Info</SecondaryText>
                <Space size={7}>
                    <ProjectInfo>
                        <SecondaryText as='div' color={COLORS.PRIMARY.WHITE}>Node Types</SecondaryText>
                        <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                    </ProjectInfo>
                    <ProjectInfo>
                        <SecondaryText as='div' color={COLORS.PRIMARY.WHITE}>Connection Types</SecondaryText>
                        <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                    </ProjectInfo>
                    <ProjectInfo>
                        <SecondaryText as='div' color={COLORS.PRIMARY.WHITE}>Nodes</SecondaryText>
                        <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                    </ProjectInfo>
                    <ProjectInfo>
                        <SecondaryText as='div' color={COLORS.PRIMARY.WHITE}>Connections</SecondaryText>
                        <SecondaryText color={COLORS.PRIMARY.WHITE}>0</SecondaryText>
                    </ProjectInfo>
                </Space>
            </VerticalSpace>
            <Divider style={{ margin: '0' }} />
            <Space size={30}>
                <Icon color='#353432' icon={data?.privacy === 'public' ? 'globe1' : 'users1'} size={25} />
                <Text style={{ textTransform: 'capitalize' }}>{data?.privacy}</Text>
            </Space>
        </VerticalSpace>
    </Spin>
}