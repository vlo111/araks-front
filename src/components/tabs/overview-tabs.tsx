import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Tabs as TabsComponent } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PATHS, screenSize } from 'helpers/constants';
import { stripTrailingSlash } from 'helpers/utils';
import { ProjectBreadcrumb } from 'components/breadcrumb/project-breadcrumb';
import { OverviewWrapper } from 'components/layouts/components/overview/wrapper';
import { DataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { SchemaWrapper } from 'components/layouts/components/schema/wrapper';
import { useOverview } from 'context/overview-context';
import { useGetProject } from 'api/projects/use-get-project';
import { VisualisationWrapper } from '../layouts/components/visualisation/wrapper';
import { PerspectiveUser, UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { useIsPublicPage } from 'hooks/use-is-public-page';

const Tabs = styled(TabsComponent)`
  user-select: none;
  .ant-tabs-nav-wrap {
    justify-content: center;
  }

  .ant-tabs-nav {
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.16);
    margin-bottom: 0;
    z-index: 4; // greater than left side menu

    &::before {
      border-color: transparent;
    }

    .ant-tabs-tab {
      @media (min-width: ${screenSize.xxl}) {
        height: 64px;
      }
      height: 40px;

      &:not(.ant-tabs-tab-active) {
        border: none;
        background-color: transparent;
        background: transparent;
      }

      &.ant-tabs-tab-active {
        background: #f2f2f2;
        box-shadow: inset 3px 3px 9px rgba(111, 111, 111, 0.3);
        border-radius: 4px 4px 0px 0px;
      }
    }
  }
`;

const priorityRoles: UserProjectRole[] = [UserProjectRole.Owner, UserProjectRole.Editor, UserProjectRole.Viewer];

const getUserRoleForProject = (perspectiveUsers: PerspectiveUser[]) => {
  for (const priorityRole of priorityRoles) {
    const userRoleObj = perspectiveUsers?.find((roleObj) => roleObj.role === priorityRole);
    if (userRoleObj) {
      return userRoleObj.role;
    }
  }

  return null;
};

export const OverviewTabs = () => {
  const { updateRole, projectInfo } = useProject();
  const location = useLocation();
  const isPublicPage = useIsPublicPage();

  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch, setHideLeftSection } = useOverview();
  useGetProject(
    { id: params.id },
    {
      enabled: !!params.id,
      onSuccess: ({ data }) => {
        dispatch(data.title);
        updateRole(getUserRoleForProject(data.perspective_users));
      },
    }
  );

  const items = useMemo(() => {
    const tabs = [
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_OVERVIEW}`,
        label: 'Overview',
      },
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_SCHEME}`,
        label: 'Scheme',
      },
      {
        key: params.node_type_id
          ? PATHS.NODE_OVERVIEW
          : `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.DATA_SHEET}`,
        label: 'Data sheet',
      },
      {
        key: `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_VISUALISATION}`,
        label: 'Visualization',
      },
    ];

    if (projectInfo?.role === UserProjectRole.Owner) {
      tabs.push({
        key: PATHS.PROJECT_PERSPECTIVES,
        label: 'Perspectives',
      });
    }

    return tabs;
  }, [isPublicPage, params.node_type_id, projectInfo?.role]);

  const handleTabClick = useCallback(
    (key: string) => {
      navigate(key.replace(':id', params.id || ''));
      setHideLeftSection(false);
    },
    [navigate, params.id, setHideLeftSection]
  );

  const activeItem = useMemo(
    () =>
      items.find((item) => {
        return (
          item.key.replace(':id', params.id || '').replace(':node_type_id', params.node_type_id || '') ===
          stripTrailingSlash(location.pathname)
        );
      }),
    [items, location.pathname, params.id, params.node_type_id]
  );

  return (
    <Tabs
      id="overview-header-tabs"
      className="tabs"
      destroyInactiveTabPane
      defaultActiveKey={activeItem?.key}
      activeKey={activeItem?.key}
      type="card"
      tabBarGutter={32}
      onTabClick={handleTabClick}
      tabBarExtraContent={{
        left: (
          <ProjectBreadcrumb
            items={[
              { title: 'Home', className: 'home', onClick: () => navigate(PATHS.ROOT) },
              ...(state ? [{ title: state, className: 'project-name' }] : []),
            ]}
          />
        ),
      }}
      items={items.map((item) => ({
        ...item,
        disabled: !params.id,
        children: (
          <div className="site-layout-content">
            {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_OVERVIEW}` && <OverviewWrapper />}
            {item.key ===
              (params.node_type_id
                ? PATHS.NODE_OVERVIEW
                : `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.DATA_SHEET}`) && <DataSheetWrapper />}
            {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_SCHEME}` && <SchemaWrapper />}
            {item.key === PATHS.PROJECT_PERSPECTIVES && <SchemaWrapper />}
            {item.key === `${isPublicPage ? PATHS.PUBLIC_PREFIX : ''}${PATHS.PROJECT_VISUALISATION}` && (
              <VisualisationWrapper />
            )}
          </div>
        ),
      }))}
    />
  );
};
