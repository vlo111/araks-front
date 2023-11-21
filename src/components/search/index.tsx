import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoComplete as AutoCompleteComponent, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { renderTypes } from './options/node-type';
import { useGetUserGlobalSearch } from 'api/user/use-get-user-global-search';
import { renderProjects } from './options/projects';
import './index.css';
import { PATHS } from 'helpers/constants';
import { StyledSearchTitle } from './options/styles';

enum ProjectPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

const AutoComplete = styled(AutoCompleteComponent)`
  .ant-input-affix-wrapper {
    border-color: #c3c3c3;
    .ant-input-prefix {
      svg {
        color: #c3c3c3;
      }
    }
    .ant-input::placeholder {
      font-family: 'Rajdhani';
      font-weight: 500;
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 0.07em;
      color: #808080;
    }
  }
`;
export const Search = () => {
  const [search, setSearch] = useState<string>();
  const navigate = useNavigate();

  const { data } = useGetUserGlobalSearch(
    { enabled: search ? search.trim()?.length > 2 : false },
    search?.trim() ?? ''
  );
  const projects = useMemo(
    () => data.projects?.map(({ id, title, color, icon, privacy }) => renderProjects(id, title, color, icon, privacy)),
    [data.projects]
  );

  const nodeTypes = useMemo(
    () =>
      data.types?.map(({ id, node_type_id, title, color, node_type_name }) =>
        renderTypes(id, node_type_id, title, color, node_type_name)
      ),
    [data.types]
  );

  const renderTitle = (title: string) => <StyledSearchTitle>{title}</StyledSearchTitle>;

  const options = [];

  if (projects && projects.length > 0) {
    options.push({
      label: renderTitle('Projects'),
      options: projects,
    });
  }

  if (nodeTypes && nodeTypes.length > 0) {
    options.push({
      label: renderTitle('Types'),
      options: nodeTypes,
    });
  }

  const onSelect = (id: string | unknown) => {
    const project = projects?.find((project) => project.id === id);
    if (project?.privacy === ProjectPrivacy.PUBLIC) {
      navigate(`${PATHS.PUBLIC}${PATHS.PROJECTS}/${id}`);
    } else {
      navigate(`${PATHS.PROJECTS}/${id}`);
    }
  };

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      popupMatchSelectWidth={456}
      dropdownMatchSelectWidth={400}
      style={{ width: 456 }}
      onSelect={onSelect}
      options={options}
      value={search}
    >
      <Input
        prefix={<SearchOutlined style={{ fontSize: '18px' }} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
      />
    </AutoComplete>
  );
};
