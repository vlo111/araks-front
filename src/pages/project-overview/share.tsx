import { Col, Form, Row } from 'antd';
import { UserProjectRole } from 'api/types';
import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text, Title } from 'components/typography';
import { useProject } from 'context/project-context';
import { COLORS, PATHS } from 'helpers/constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetPerspectives } from '../../api/perspective/use-get-perspectives';
import { ShareInputItemAddon } from '../../components/form/share-input-item';
import { useState } from 'react';
import { useCreatePerspectiveUser } from '../../api/perspective/shared-users/use-create-perspective-user';
import { UserList } from '../project-perspectives/components/section/share/user-list';
import { Icon } from '../../components/icon';
import styled from 'styled-components';
import { SeeAllMembersDrawer } from '../../components/drawer/share-members';
import { PerspectiveSelect } from '../../components/select/perspective-select';

const ShareRow = styled(Row)`
  margin-top: auto;
  cursor: pointer;
  width: 12rem;
  position: absolute;
  bottom: 1rem;
  gap: 1rem;
  right: 20px;
`;

export const Share = () => {
  const params = useParams();

  const [showAllMembers, setShowAllMembers] = useState(false);

  const { projectInfo } = useProject();

  const navigate = useNavigate();

  const location = useLocation();

  const { data } = useGetPerspectives({ id: params.id }, { enabled: !!params.id });

  const [form] = Form.useForm();

  const id = Form.useWatch('perspective', form);

  const { mutate } = useCreatePerspectiveUser({}, id);

  const onFinish = ({ role, perspective, email }: { perspective: string; role: string; email: string }) => {
    mutate({
      perspective_id: perspective || (data && data[0].id),
      role: role || 'edit',
      email,
    });
    form.setFieldValue('email', '');
  };

  return (
    <div style={{ padding: '32px' }}>
      <VerticalSpace>
        <Title level={3} color={COLORS.PRIMARY.GRAY_DARK}>
          Share
        </Title>
        <Form name="share" form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
          <VerticalSpace size={48}>
            {(location.pathname === PATHS.PROJECT_CREATE || projectInfo?.role === UserProjectRole.Owner) && (
              <VerticalSpace>
                <Row>
                  <Col span={24}>
                    <PerspectiveSelect />
                  </Col>
                </Row>
                <Row gutter={[37, 0]}>
                  <Col xs={24} xxl={16}>
                    <ShareInputItemAddon />
                  </Col>
                  <Col xs={24} xxl={8}>
                    <Button htmlType="submit" block type="primary">
                      Send Invite
                    </Button>
                  </Col>
                </Row>
              </VerticalSpace>
            )}
            <VerticalSpace size={8}>
              <UserList perspectiveId={id || (data && data[0]?.id)} />
              <ShareRow
                onClick={() => {
                  navigate(PATHS.PROJECT_OVERVIEW.replace(':id', params.id ?? ''));
                }}
              >
                <Col span={2}>
                  <Icon color="#353432" icon={'users'} size={25} />
                </Col>
                <Col span={20}>
                  <Text
                    style={{ textDecoration: 'underline', color: '#232F6A' }}
                    onClick={() => setShowAllMembers(true)}
                  >
                    See all members
                  </Text>
                </Col>
              </ShareRow>
            </VerticalSpace>
          </VerticalSpace>
        </Form>
      </VerticalSpace>
      <SeeAllMembersDrawer
        id={id ?? (data && data[0]?.id)}
        open={showAllMembers}
        onClose={() => setShowAllMembers(false)}
      />
    </div>
  );
};
