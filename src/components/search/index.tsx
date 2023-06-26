import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete as AutoCompleteComponent, Input } from 'antd';

import './index.css';
import styled from 'styled-components';

const renderTitle = (title: string) => (
  <span>
    {title}
    <a style={{ float: 'right' }} href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

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

export const Search = () => (
  <AutoComplete
    popupClassName="certain-category-search-dropdown"
    popupMatchSelectWidth={500}
    style={{ width: 456 }}
    options={options}
  >
    <Input prefix={<SearchOutlined style={{ fontSize: '18px' }} />} placeholder="Search" />
  </AutoComplete>
);
