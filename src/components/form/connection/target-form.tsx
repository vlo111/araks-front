import { Form } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { SelectConnectionFormItem } from 'components/form-item/select-connection-form-item';
import { ConnectionAutocomplete } from 'components/input/connection-autocomplete';
import { VerticalSpace } from 'components/space/vertical-space';
import { ConnectionSourcesSearchResult } from 'types/node';

type Props = { data: EdgeTypePropertiesResponse };

const formName = 'targetData';

export const ConnectionTargetForm = ({ data }: Props) => {
  const form = Form.useFormInstance();
  const showEmptyField = Form.useWatch(formName);

  const handleSelect = (value: string, options: ConnectionSourcesSearchResult[]) => {
    const selectedRow = options?.find((row) => row.id === value);

    if (selectedRow) {
      form.setFieldValue(formName, [
        {
          target_type_id: selectedRow.project_type_id,
          target_id: selectedRow.id,
          name: selectedRow.name,
          id: data.id,
        },
      ]);
    }
  };

  return (
    <VerticalSpace size={0}>
      <ConnectionAutocomplete targetId={data.target_id || ''} handleSelect={handleSelect} placeholder="Target" />
      {!showEmptyField && <div style={{ height: '40px' }} />}
      <SelectConnectionFormItem color={data.target?.color} isRequired formName={formName} isSource={false} />
    </VerticalSpace>
  );
};
