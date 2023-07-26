import React, { useState } from 'react';
import { Col, Row, Space } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyTypes } from 'components/form/property/types';
import { ImportActionType, ItemMapping, useImport } from 'context/import-context';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { Select } from 'components/select';
import Table, { ColumnsType } from 'antd/es/table';

import './import-table.css';
import { ImportMappingIgnoreErrorsModal } from 'components/modal/import-mapping-ignore-errors-modal';

const { Option } = Select;

export const ImportTable: React.FC = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { state, dispatch } = useImport();

  const [rowData, setRowData] = useState<ItemMapping[]>();

  useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      const propertiesFielter = data.filter(
        (row) =>
          row.ref_property_type_id !== PropertyTypes.IMAGE_URL && row.ref_property_type_id !== PropertyTypes.Document
      );
      setRowData(
        propertiesFielter.map((item) => ({
          dataFields: `${item.name} (${item.ref_property_type_id})`,
          key: item.id,
          property: item,
        }))
      );
      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SET_COLUMNS,
        payload: {
          columnsMapped: propertiesFielter.map((item) => ({
            dataIndex: item.id,
            key: item.id,
            title: item.name,
            property: item,
          })),
          type_id: nodeTypeId,
        },
      });
    },
  });

  const columns: ColumnsType<ItemMapping> = [
    {
      title: 'Data schema fields',
      dataIndex: 'dataFields',
      key: 'dataFields',
      render: (_: unknown, record: ItemMapping, index: number) => {
        return (
          <VerticalSpace size={2}>
            {index === 0 && (
              <SecondaryText color={COLORS.PRIMARY.BLUE} disabled>
                Default property
              </SecondaryText>
            )}
            <Input value={record.dataFields} disabled />
            <Space>
              {record.property.required_type && (
                <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Required</SecondaryText>
              )}
              {record.property.unique_type && (
                <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Unique</SecondaryText>
              )}
              {record.property.multiple_type && <SecondaryText color="#C3C3C3">Multiple</SecondaryText>}
            </Space>
          </VerticalSpace>
        );
      },
    },
    {
      title: 'Imported fields',
      dataIndex: 'importedFields',
      key: 'importedFields',
      className: 'on-top',
      render: (_: unknown, record: ItemMapping, index: number) => (
        <VerticalSpace size={2}>
          {index === 0 && <SecondaryText color={COLORS.PRIMARY.BLUE}>Default property </SecondaryText>}
          <Select
            disabled={!!(!state.mapping && index)}
            style={{ width: '100%' }}
            placeholder="Select"
            value={record.importedFields} // Bind the selected value to the state
            onChange={(value) => {
              //should check happen
              if (value === 'Type') {
                // just for testing if not matches
                setRowData((prevData) =>
                  prevData?.map((item) =>
                    item.key === record.key ? { ...item, check: { matched: false, count: 100 } } : item
                  )
                );
                return;
              }
              setRowData((prevData) =>
                prevData?.map((item) => (item.key === record.key ? { ...item, check: { matched: true } } : item))
              );
              dispatch({
                type: ImportActionType.IMPORT_MAPPING_CHECK_APPROVE,
                payload: {
                  [record.key]: {
                    key: record.key,
                    dataFields: record.dataFields,
                    importedFields: value,
                  },
                },
              });
              return;
              // handleImportFieldChange(record, value);
            }}
          >
            {state.columnRow?.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </VerticalSpace>
      ),
    },
    {
      title: 'Matching process',
      dataIndex: 'check',
      key: 'check',
      className: 'on-top',
      render: (_: unknown, record: ItemMapping) => {
        if (record?.check && record.check.matched) {
          return (
            <VerticalSpace size={0}>
              <SecondaryText color={COLORS.SECONDARY.GREEN_LIGHT}>Matched to the column</SecondaryText>
              <SecondaryText color="#C3C3C3">100% of rows have a value</SecondaryText>
            </VerticalSpace>
          );
        }
        if (record?.check && !record.check.matched) {
          return (
            <Row>
              <Col span={12}>
                <VerticalSpace size={0}>
                  <SecondaryText
                    color={COLORS.SECONDARY.MAGENTA}
                  >{`${record?.check.count} validation errors`}</SecondaryText>
                  <SecondaryText color="#C3C3C3">100% of rows have a value</SecondaryText>
                </VerticalSpace>
              </Col>
              <Col span={12}>
                <ImportMappingIgnoreErrorsModal
                  count={record?.check.count}
                  onClose={() => {
                    // eslint-disable-next-line no-console
                    console.log('onClose');
                  }}
                />
              </Col>
            </Row>
          );
        }

        return '';
      },
    },
  ];

  // const handleImportFieldChange = (record: ItemMapping, value: string) => {
  //   setRowData((prevData) =>
  //     prevData?.map((item) => (item.key === record.key ? { ...item, importedFields: value } : item))
  //   );import { type } from './../../types/project-node-types';

  // };

  // const handleCheckClick = (record: ItemMapping) => {
  //   dispatch({ type: ImportActionType.IMPORT_MAPPING_CHECK_APPROVE, payload: { [record.key]: record } });
  // };

  return <Table dataSource={rowData} columns={columns} pagination={false} />;
};
