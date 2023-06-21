import { AutoComplete, Col, Form, Row, Space } from 'antd';
import { ProjectTypePropertyReturnData, SearchPageParameters } from 'api/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, VALIDATE_MESSAGES } from 'helpers/constants';
import styled from 'styled-components';
import { FormItem } from '../form-item';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

import { Input } from 'components/input';
import { useState } from 'react';
import { useGetConnectionSourceSearch } from 'api/node/use-get-connection-sources-search';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { ConnectionSourcesSearchResult } from 'types/node';
import { CloseOutlined } from '@ant-design/icons';
import { useDebounce } from 'use-debounce';

type Props = {
  data: ProjectTypePropertyReturnData;
};

const WrapperConnection = styled(({ backgroundColor, ...props }) => <Space {...props} />)`
  padding: 2px 12px;
  background-color: ${(props) => props.backgroundColor};
  box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.16);

  border-radius: 4px;
  width: 100%;

  svg path {
    fill: ${COLORS.PRIMARY.WHITE};
  }
`;

const StyledFormItem = styled(FormItem)`
  label,
  .ant-row {
    width: 100%;
  }
`;

const ResultFormItem = styled(({ backgroundColor, ...props }) => <FormItem {...props} />)`
  background: ${(props) => props.backgroundColor};
  border-radius: 4px;

  svg {
    fill: ${COLORS.PRIMARY.WHITE};
  }

  .ant-input-prefix path {
    fill: ${COLORS.PRIMARY.WHITE};
  }

  .ant-input-affix-wrapper {
    border: none;
    border-radius: 4px;
    background: linear-gradient(
      135deg,
      ${(props) => props.backgroundColor} 1.28%,
      ${(props) => props.backgroundColor} 100%
    );
    box-shadow: 0px 4px 4px 0px rgba(111, 111, 111, 0.16);
    backdrop-filter: blur(2px);
  }

  .ant-input.ant-input-disabled {
    color: ${COLORS.PRIMARY.WHITE};
  }
`;

const initPageData: SearchPageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const ConnectionType = ({ data }: Props) => {
  const form = useFormInstance();
  const [pageData] = useState(initPageData);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<ConnectionSourcesSearchResult[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const { isInitialLoading } = useGetConnectionSourceSearch(
    { ...pageData, search: debouncedSearchValue },
    data.target_id,
    {
      enabled: !!(debouncedSearchValue && debouncedSearchValue.length > 3),
      onSuccess: (data) => {
        setOptions(data);
      },
    }
  );

  const handleSelect = (value: string) => {
    const selectedRow = options?.find((row) => row.dataset_id === value);
    if (selectedRow) {
      form.setFieldValue(data.name, [
        ...(form.getFieldValue(data.name) || []),
        {
          source_type_id: selectedRow.type_id,
          source_id: selectedRow.dataset_id,
          name: selectedRow.node_name.join(', '),
          id: data.id,
        },
      ]);
      setSearchValue('');
      setOptions([]);
    }
  };

  const label = (
    <Row justify="space-between">
      <Col>
        <Space>
          <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
          <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
        </Space>
      </Col>
      <Col>
        <WrapperConnection backgroundColor={data?.target?.color}>
          <Connection />
          <Text color={COLORS.PRIMARY.WHITE}>{data?.target?.name}</Text>
        </WrapperConnection>
      </Col>
    </Row>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <VerticalSpace>
        <StyledFormItem
          labelCol={{ span: 24 }}
          label={label}
          required={data.required_type}
          style={{ marginBottom: '0' }}
        >
          <AutoComplete
            options={options?.map((row) => ({ value: row.dataset_id, label: row.node_name.join(',') }))}
            onSearch={handleSearch}
            value={searchValue}
            open={!!options.length}
            onSelect={handleSelect}
            disabled={isInitialLoading}
            key={options?.length + debouncedSearchValue}
          >
            <Input />
          </AutoComplete>
        </StyledFormItem>
        <Form.List name={data.name}>
          {(fields, { add, remove }) => (
            <>
              <VerticalSpace>
                {fields.map((field) => (
                  <ResultFormItem
                    backgroundColor={data.source?.color}
                    key={field.name}
                    style={{ marginBottom: 0 }}
                    name={[field.name, 'name']}
                    rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
                  >
                    <Input
                      prefix={<Connection />}
                      disabled
                      suffix={<CloseOutlined onClick={() => remove(field.name)} />}
                    />
                  </ResultFormItem>
                ))}
              </VerticalSpace>
            </>
          )}
        </Form.List>
      </VerticalSpace>
    </div>
  );
};
