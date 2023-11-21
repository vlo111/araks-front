import { Form } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { SelectConnectionFormItem } from 'components/form-item/select-connection-form-item';
import { ConnectionAutocomplete } from 'components/input/connection-autocomplete';
import { VerticalSpace } from 'components/space/vertical-space';
import { ConnectionSourcesSearchResult } from 'types/node';

type Props = { data: EdgeTypePropertiesResponse };

const formName = 'sourceData';

export const ConnectionSourceForm = ({ data }: Props) => {
  const form = Form.useFormInstance();
  const showEmptyField = Form.useWatch(formName);

  const handleSelect = (value: string, options: ConnectionSourcesSearchResult[]) => {
    const selectedRow = options?.find((row) => row.id === value);

    if (selectedRow) {
      form.setFieldValue(formName, [
        {
          source_type_id: selectedRow.project_type_id,
          source_id: selectedRow.id,
          name: selectedRow.name,
          id: data.id,
        },
      ]);
    }
  };

  return (
    <VerticalSpace size={0}>
      <ConnectionAutocomplete targetId={data.source_id || ''} handleSelect={handleSelect} placeholder="Source" />
      {!showEmptyField && <div style={{ height: '40px' }} />}
      <SelectConnectionFormItem color={data?.source?.color} isRequired formName={formName} isSource={true} />
    </VerticalSpace>
  );
};
