import { Button, Col, message, Row, Space, Upload, UploadFile, Image } from 'antd';
import styled from 'styled-components';
import { useAuth } from 'context/auth-context';
import { Title } from 'components/typography';
import { FC, useState } from 'react';
import { COLORS, PATHS } from 'helpers/constants';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { UploadProps } from 'antd/es/upload/interface';
import { Link } from 'react-router-dom';
import { CloseCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAvatarUpload } from 'api/upload/use-image-upload';
import { IMAGE_UPLOAD_URL } from 'api/upload/constants';
import ImgCrop from 'antd-img-crop';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { useUpdateUserAvatar } from '../../api/user/use-update-avatar';
import { ProjectCountData } from 'api/projects/use-get-project-count';

type Prop = FC<{
  info: ProjectCountData | undefined;
}>;

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

export const StyledLink = styled(Link)`
  color: #232f6a;
  &:hover {
    color: #232f6a;
    opacity: 0.8;
  }
`;

const StyledDiv = styled.div`
  && {
    .ant-upload-select {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      min-width: 250px;
      max-width: 250px;
      min-height: 250px;
      max-height: 250px;
    }
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  min-width: 250px;
  max-width: 250px;
  min-height: 250px;
  max-height: 250px;
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

export const InfoPanel: Prop = ({ info }) => {
  const { user, addUser } = useAuth();
  const { mutate } = useUpdateUserAvatar();
  const { mutateAsync } = useAvatarUpload();

  const [loading, setLoading] = useState(false);
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
    const isLt2M = file.size / 1024 / 1024 > 0.5;
    if (isLt2M) {
      message.error('Image must smaller than 5MB!');
      return false;
    }
    return isJpgOrPng;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleRemove = () => {
    setImageUrl('');
    mutate(
      { avatar: null },
      {
        onSuccess: ({ data }) => {
          if (data) addUser(data);
        },
      }
    );
  };

  const customRequest: (options: UploadRequestOption) => void = async (options) => {
    const { file, onSuccess } = options;
    const { data } = await mutateAsync(file);

    onSuccess && onSuccess(data);

    mutate({ avatar: data.uploadPath });

    if (user) {
      addUser({
        ...user,
        avatar: `${process.env.REACT_APP_AWS_URL}${data.uploadPath}`,
      });
    }
  };

  return (
    <Wrapper span={9} xs={24} sm={24} md={9}>
      <StyledDiv>
        {imageUrl ? (
          <StyledImage
            preview={{
              visible: false,
              mask: <CloseCircleOutlined style={{ fontSize: 24 }} onClick={handleRemove} />,
            }}
            src={imageUrl || user?.avatar}
            alt="avatar"
          />
        ) : (
          <ImgCrop rotationSlider>
            <Upload
              action={`${process.env.REACT_APP_AWS_URL}${IMAGE_UPLOAD_URL}`}
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              maxCount={1}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </ImgCrop>
        )}
      </StyledDiv>
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
          <Title level={1}>{`${info?.projects}`}</Title>
          <StyledLink to={PATHS.ROOT}>Projects</StyledLink>
        </Col>
        <Col span={12} xs={24} sm={24} md={24} xl={12}>
          <Title level={1}>{`${info?.shared}`}</Title>
          <StyledLink to={PATHS.SHARED}>Shared Projects</StyledLink>
        </Col>
      </Footer>
    </Wrapper>
  );
};
