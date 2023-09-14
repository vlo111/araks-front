import { Col, Row as RowComponent, Spin } from 'antd';
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { PATHS } from 'helpers/constants';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { CommentLike } from 'pages/project-overview/comment-like';
import { Share } from 'pages/project-overview/share';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Row = styled(({ hasProject, ...props }) => <RowComponent {...props} />)`
  &.overview {
    height: calc(100vh - 152px);

    .ant-col.overview__section {
      background: #f7f7f7;

      opacity: ${(props) => (props.hasProject ? 1 : 0.2)};
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
      min-height: calc(100vh - 264px);
    }
  }
`;

export const OverviewWrapper = () => {
  const isPublicPage = useIsPublicPage();
  const params = useParams();
  const location = useLocation();
  const { projectInfo } = useProject();
  const spanNumber =
    (location.pathname === PATHS.PROJECT_CREATE || projectInfo?.role !== UserProjectRole.Viewer) && !isPublicPage
      ? 8
      : 12;

  return (
    <Spin spinning={!projectInfo && location.pathname !== PATHS.PROJECT_CREATE}>
      <Row className="overview" hasProject={!!params.id}>
        <Col span={spanNumber} className="overview__section project-save">
          <Outlet />
        </Col>
        {((projectInfo && projectInfo?.role !== UserProjectRole.Viewer) ||
          location.pathname === PATHS.PROJECT_CREATE) &&
          !isPublicPage && (
            <Col span={8} className="overview__section project-share">
              <Share />
            </Col>
          )}
        <Col span={spanNumber} className="overview__section project-comments">
          <CommentLike />
        </Col>
      </Row>
    </Spin>
  );
};
