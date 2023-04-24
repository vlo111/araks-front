import { Button, Col, Row, Skeleton, Space } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../context/auth-context';
import { Title } from 'components/typography';
import { useMemo, useState } from 'react';
import { COLORS } from 'helpers/constants';
import { useGetProjects } from '../../api/projects/use-get-projects';

const Wrapper = styled(Col)`
  background: #f7f7f7;
  box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
  padding: 2rem 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  h1 {
    font-size: clamp(1rem, 2.5vw, 2rem);
  }
`;

const Avatar = styled(Space)`
  margin: 0 auto;
  max-width: 250px;
  min-width: 100px;
  
  img {
    border-radius: 5px;
    width: 100%;
  }
`;

const LearnMore = styled(Button)`
  border: none;
  background: none;
  color: ${COLORS.PRIMARY.BLUE};
  height: auto;
  padding: 0 5px;

  span {
    text-decoration: underline;
    font-weight: 700;
    font-size: 18px;
  }
`;

const Description = styled(Space)``;

const Footer = styled(Row)`
  display: flex;
  justify-content: center;
  color: ${COLORS.PRIMARY.BLUE};
  width: 100%;

  .ant-col {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h1 {
    font-size: clamp(1rem, 1.5vw, 2rem);
    color: ${COLORS.PRIMARY.BLUE} !important;
  }
`;

export const InfoPanel = () => {
  const { user } = useAuth();
  const {
    data: { data: projects },
    isInitialLoading,
  } = useGetProjects({
    page: 1,
    size: 1,
    sortField: 'updated_at',
    sortOrder: 'DESC',
  });

  const [readMore, setReadMore] = useState(false);

  const bio: string = useMemo(() => (readMore ? user?.bio : user?.bio?.slice(0, 180)), [readMore, user]) ?? '';

  if (isInitialLoading) {
    return <Skeleton />;
  }

  return (
    <Wrapper span={9} xs={24} sm={24} md={9}>
      <Avatar>
        <img src={user?.avatar} alt={user?.first_name} />
      </Avatar>
      <Title level={1}>{`${user?.first_name} ${user?.last_name}`}</Title>

      <Description>
        {bio}
        {bio.length > 180 && (
          <LearnMore onClick={() => setReadMore(!readMore)}>{`Learn ${readMore ? 'less' : 'more'}`}</LearnMore>
        )}
      </Description>

      <Footer>
        <Col span={12} xs={24} sm={24} md={24} xl={12}>
          <Title level={1}>{`${projects.count}`}</Title>
          <Space>Projects</Space>
        </Col>
        <Col span={12} xs={24} sm={24} md={24} xl={12}>
          <Title level={1}>{`${0}`}</Title>
          <Space>Shared Projects</Space>
        </Col>
      </Footer>
    </Wrapper>
  );
};
