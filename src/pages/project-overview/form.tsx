import { Col, Divider, Form, Row as RowComponent, Spin } from "antd";
import useGetProject from "api/projects/use-get-project"
import { Input as InputComponent } from "components/input";
import VerticalSpace from "components/space/vertical-space";
import { FormItem } from "components/form/form-item";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AddColorIcon } from "./components/add-color-icon";
import { SecondaryText, Text } from "components/typography";
import { COLORS } from "helpers/constants";
import { ProjectType } from "./components/project-type";
import { Button } from "components/button";
import { ManageProjectUrlProp, URL_CREAT_PROJECT, useManageProject } from "api/projects/use-manage-project";
import { CreateOverviewFormData, RequestType, RequestTypes } from "api/types";
import dayjs from "dayjs";
import { ProjectUserInfo } from "./components/project-user-info";

const { TextArea: TextAreaComponent } = InputComponent;

const TextArea = styled(TextAreaComponent)`
    background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);
    border: 1px solid #808080;
    border-radius: 4px;
`;

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

const Input = styled(InputComponent)`
    border: none;
    border-bottom: 1px solid #95A2E1;
    border-radius: 0;
    background: transparent;
    font-family: 'Rajdhani';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: 0.07em;
`;

type OwnerInfoProps = {
    title: string;
    value: string;
}

const OwnerInfo = ({ title, value }: OwnerInfoProps) => <Row>
    <Col span={8}><SecondaryText color={COLORS.PRIMARY.BLUE}>{ title }</SecondaryText></Col>
    <Col span={16}><SecondaryText>{ value }</SecondaryText></Col>
</Row>

type Props = {
    manageUrl?: ManageProjectUrlProp;
    type?: RequestType;
}

export const ProjectForm = ({ manageUrl= URL_CREAT_PROJECT, type = RequestTypes.Post }: Props) => {
    const params = useParams();
    const [form] = Form.useForm();

    const { mutate } = useManageProject(manageUrl, type);

    const onFinish = (values: CreateOverviewFormData) => {
        mutate(values);
    };

    const handleCancel = () => {
        form.resetFields();
    }
    const { data, isLoading } = useGetProject(
        { id: params.id },
        { 
            enabled: !!params.id, 
            onSuccess: (data) => {
                if (data.data?.project){
                    form.setFieldsValue(data.data.project);
                }
            } 
        }
    );

    // const { data: userData, isLoading: userIsLoading } = useGetUser(
    //     { id: data?.project.user_id },
    //     { 
    //         enabled: !!data?.project.user_id, 
    //     }
    // );

    return <Spin spinning={isLoading}>
        <Row className="overview">
            <Col span={8} className='overview__section project-save'>
                <Form
                    name="overview-create"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    requiredMark={false}
                >
                    <VerticalSpace size={17} className='overview-form-items'>
                        <VerticalSpace size={42}>
                            <div style={{ width: '100%', display: 'flex', gap: '22px' }}>
                                <AddColorIcon />
                                <VerticalSpace size={14}>
                                    <FormItem
                                        name="title" 
                                        rules={[{ required: true, message: 'Title is required' }, { min: 3, message: 'The minimum length for this field is 3 characters'}]}
                                        style={{ marginBottom: '0' }}
                                        >
                                        <Input placeholder='Untitled' /> 
                                    </FormItem>
                                    <ProjectUserInfo createdAt={data?.project?.created_at} updatedAt={data?.project?.updated_at} />
                                </VerticalSpace>
                            </div>
                            <FormItem name="description" label='Description' >
                                <TextArea rows={4} />
                            </FormItem>
                        </VerticalSpace>
                        <Divider style={{ margin: '0' }} />
                        <Text>Privacy</Text>
                        <ProjectType />
                    </VerticalSpace>
                    <Row align='bottom' justify='end' gutter={[32, 32]} style={{ alignSelf: 'end' }}>
                        <Col span={3}>
                            <Button type="text" onClick={handleCancel}>Cancel</Button>
                        </Col>
                        <Col span={10}>
                            <Button block htmlType="submit" type="primary">Save</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={8} className='overview__section project-share'></Col>
            <Col span={8} className='overview__section project-comments'></Col>
        </Row>
    </Spin>
}