import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Tabs as TabsComponent } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { stripTrailingSlash } from 'helpers/utils';
import { ProjectBreadcrumb } from 'components/breadcrumb/project-breadcrumb';
import { OverviewWrapper } from 'components/layouts/components/overview/wrapper';
import { DataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { SchemaWrapper } from 'components/layouts/components/schema/wrapper';
import { useOverview } from 'context/overview-context';
import { useGetProject } from 'api/projects/use-get-project';
import { VisualisationWrapper } from "../layouts/components/visualisation/wrapper";

const Tabs = styled(TabsComponent)`
  .ant-tabs-nav-wrap {
    justify-content: center;
  }

  .ant-tabs-nav {
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.16);
    margin-bottom: 0;
    z-index: 2;

    &::before {
      border-color: transparent;
    }

    .ant-tabs-tab {
      height: 64px;

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

const items = [
  {
    key: PATHS.PROJECT_OVERVIEW,
    label: 'Overview',
  },
  {
    key: PATHS.PROJECT_SCHEME,
    label: 'Scheme',
  },
  {
    key: PATHS.PROJECT_PERSPECTIVES,
    label: 'Perspectives',
  },
  {
    key: PATHS.DATA_SHEET,
    label: 'Data sheet',
  },
  {
    key: PATHS.PROJECT_VISUALISATION,
    label: 'Visualisation',
  },
];

export const OverviewTabs = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useOverview();
  useGetProject(
    { id: params.id },
    {
      enabled: !!params.id,
      onSuccess: ({ data }) => {
        dispatch(data.title);
      },
    }
  );

  const handleTabClick = useCallback(
    (key: string) => {
      navigate(key.replace(':id', params.id || ''));
    },
    [navigate, params.id]
  );

  const activeItem = useMemo(
    () =>
      items.find((item) => {
        return (
          item.key.replace(':id', params.id || '').replace(':node_type_id', params.node_type_id || '') ===
          stripTrailingSlash(location.pathname)
        );
      }),
    [location.pathname, params.id, params.node_type_id]
  );
  return (
    <Tabs
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
        children: (
          <div className="site-layout-content">
            {item.key === PATHS.PROJECT_OVERVIEW && <OverviewWrapper />}
            {item.key === PATHS.DATA_SHEET && <DataSheetWrapper />}
            {item.key === PATHS.PROJECT_SCHEME && <SchemaWrapper />}
            {item.key === PATHS.PROJECT_PERSPECTIVES && <SchemaWrapper />}
            {item.key === PATHS.PROJECT_VISUALISATION && <VisualisationWrapper />}
          </div>
        ),
      }))}
    />
  );
};
