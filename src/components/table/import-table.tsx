import React, { useCallback, useState } from 'react';
import { Col, Row, Space, Table } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyTypes } from 'components/form/property/types';
import { ImportActionType, ItemMapping, useImport } from 'context/import-context';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { Select } from 'components/select';
import { ColumnsType } from 'antd/es/table';
import { ImportMappingIgnoreErrorsModal } from 'components/modal/import-mapping-ignore-errors-modal';
import { ExcelType } from 'pages/import/types';
import { processDataWithType } from './utils';
import './import-table.css';

const { Option } = Select;

export const ImportTable: React.FC = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { state, dispatch } = useImport();

  const [rowData, setRowData] = useState<ItemMapping[]>([]);

  useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!nodeTypeId,
    onSuccess: (data) => {
      const propertiesFielter = data.filter(
        (row) =>
          row.ref_property_type_id !== PropertyTypes.IMAGE_URL &&
          row.ref_property_type_id !== PropertyTypes.Document &&
          row.ref_property_type_id !== PropertyTypes.Connection
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

  const clearRowData = useCallback((record: ItemMapping, isDefaultProperty = false) => {
    setRowData((prevData) =>
      prevData?.map(({ check, importedFields, ...item }) => ({
        ...item,
        ...(item.key !== record.key && !isDefaultProperty ? { check, importedFields } : {}),
      }))
    );
  }, []);

  const handleFieldChange = useCallback(
    (record: ItemMapping, value?: unknown, isDefaultProperty = false) => {
      let dataToProcess;
      if (!value) {
        clearRowData(record);
        dataToProcess = [...rowData?.filter((item) => !!item.importedFields && item.key !== record.key)];
        if (isDefaultProperty) {
          dispatch({
            type: ImportActionType.IMPORT_MAPPING_CLEAR_DATA,
            payload: {},
          });
          return;
        }
      } else {
        setRowData((prevData) =>
          prevData?.map((item) =>
            item.key === record.key
              ? ({
                  ...item,
                  importedFields: value,
                  importedFieldsIndex: !state.isCSV ? state.columnRow?.findIndex((item) => item === value) : undefined,
                } as ItemMapping)
              : item
          )
        );

        dataToProcess = [
          ...rowData?.filter((item) => !!item.importedFields && item.key !== record.key),
          {
            ...record,
            importedFieldsIndex: !state.isCSV ? state.columnRow?.findIndex((item) => item === value) : undefined,
            importedFields: value,
          } as ItemMapping,
        ];
      }

      const processResult = processDataWithType(dataToProcess, (state.sheetData as ExcelType).data, state.isCSV);
      if (processResult.wrongDataInfo && !!value) {
        // just for testing if not matches
        setRowData((prevData) =>
          prevData?.map((item) =>
            item.key === record.key
              ? {
                  ...item,
                  check: {
                    matched: !processResult.wrongDataInfo[record.key]?.count,
                    ...processResult.wrongDataInfo[record.key],
                  },
                }
              : item
          )
        );
      }
      dispatch({
        type: ImportActionType.IMPORT_MAPPING_SAVE_DATA,
        payload: {
          sheetData: processResult.data,
          mappingHasWarning:
            !!processResult.wrongDataInfo[record.key]?.count ||
            rowData.filter((data) => data.key !== record.key).findIndex((wData) => wData.check?.count) > -1,
          mapping: dataToProcess,
        },
      });

      return;
    },
    [clearRowData, dispatch, rowData, state.columnRow, state.isCSV, state.sheetData]
  );

  const calcPercent = (record: ItemMapping) => {
    if (!record?.check?.allData || Number.isNaN(record?.check.allData) || Number.isNaN(record?.check.emptyValue)) {
      return 0;
    }

    return Math.round(((record?.check.allData - record?.check.emptyValue) * 100) / record?.check.allData);
  };

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
            allowClear
            disabled={!!(!state.mapping?.length && index)}
            style={{ width: '100%' }}
            placeholder="Select"
            value={record.importedFields} // Bind the selected value to the state
            onChange={(value) => {
              handleFieldChange(record, value, !index);
            }}
            onClear={() => {
              clearRowData(record, !index);
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
              <SecondaryText color="#C3C3C3">{`${calcPercent(record)}% of rows have a value`}</SecondaryText>
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
                  <SecondaryText color="#C3C3C3">{`${calcPercent(record)}% of rows have a value`}</SecondaryText>
                </VerticalSpace>
              </Col>
              <Col span={12}>
                <ImportMappingIgnoreErrorsModal
                  count={record?.check.count}
                  onClose={() => {
                    setRowData((prevData) =>
                      prevData?.map((item) =>
                        item.key === record.key
                          ? {
                              ...item,
                              check: {
                                ...(item.check || { allData: 0, emptyValue: 0 }),
                                matched: true,
                                count: 0,
                              },
                            }
                          : item
                      )
                    );

                    if (
                      rowData
                        .filter((item) => item.key !== record.key && item.check)
                        .findIndex((item) => !item.check?.matched) === -1
                    ) {
                      // there is no row with warning
                      dispatch({ type: ImportActionType.IMPORT_MAPPING_CLEAR_WARNING, payload: {} });
                    }
                  }}
                  onCancel={() => {
                    //clear selected value which has warnings
                    clearRowData(record);
                    handleFieldChange(record);
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

  return <Table dataSource={rowData} columns={columns} pagination={false} />;
};
