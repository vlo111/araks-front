import { Button, Col, message, Row, Space, Upload, UploadFile } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../context/auth-context';
import { Title } from 'components/typography';
import { FC, useState } from 'react';
import { AUTH_KEYS, COLORS } from 'helpers/constants';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { UploadProps } from 'antd/es/upload/interface';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';

type Prop = FC<{ count: number }>;

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

const Description = styled.div`
  display: block;
`;

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

export const InfoPanel: Prop = ({ count }) => {
  const { user } = useAuth();

  const [imageUrl, setImageUrl] = useState(user?.avatar);

  const [readMore, setReadMore] = useState(false);

  const hasLargeLength = user?.bio?.length !== undefined && user?.bio?.length > 80;

  const etc = hasLargeLength ? `${user?.bio?.slice(0, 80)}...` : user?.bio?.slice(0, 80);
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
      });
    }
  };

  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const customRequest: any = (options: any) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('profilePicture', file);
    fetch('https://dev-apiaraks.analysed.ai/api/uploads/image-upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        onSuccess(result, file);
      })
      .catch((error) => {
        onError(error, file);
      });
  };

  return (
    <Wrapper span={9} xs={24} sm={24} md={9}>
      <Avatar>
        <Upload
          name="avatar"
          listType="picture-card"
          action="https://dev-apiaraks.analysed.ai/api/uploads/image-upload"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        </Upload>
      </Avatar>
      <Title level={1}>{`${user?.first_name} ${user?.last_name}`}</Title>
      <Space>{`${user?.email}`}</Space>
      <Description>
        {readMore ? user?.bio : etc}
        {hasLargeLength && (
          <LearnMore onClick={() => setReadMore(!readMore)}>{`Learn ${readMore ? 'less' : 'more'}`}</LearnMore>
        )}
      </Description>
      <Footer>
        <Col span={12} xs={24} sm={24} md={24} xl={12}>
          <Title level={1}>{`${count}`}</Title>
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
