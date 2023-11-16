import { Input } from 'components/input';
import { ReactComponent as InComeConnection } from 'components/icons/in-come.svg';
import styled from 'styled-components';
import { FormItem } from 'components/form/form-item';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';

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

type Props = {
  color: string | undefined;
  isRequired: boolean;
  isSource: boolean;
  formName: string;
};

type DeleteEdgesHandle = (remove: (index: number | number[]) => void, name: number) => void;

export const SelectConnectionFormItem = ({ color, isRequired = false, formName, isSource }: Props) => {
  const form = Form.useFormInstance();

  const destroyedEdgesIds = Form.useWatch('destroyedEdgesIds', { preserve: true });

  const edgeList = Form.useWatch(formName, { preserve: true });

  const deleteEdgesHandle: DeleteEdgesHandle = (remove, name) => {
    if (edgeList[name].rowId) {
      const edges =
        destroyedEdgesIds && destroyedEdgesIds.length
          ? [...destroyedEdgesIds, edgeList[name].rowId]
          : [edgeList[name].rowId];

      form.setFieldValue('destroyedEdgesIds', edges);
    }

    remove(name);
  };

  return (
    <Form.List name={formName}>
      {(fields, { add, remove }) => (
        <>
          <VerticalSpace>
            {fields.map((field) => (
              <ResultFormItem
                backgroundColor={color}
                style={{ marginBottom: 0 }}
                key={field.name}
                name={[field.name, 'name']}
                rules={[{ required: isRequired, message: VALIDATE_MESSAGES.required }]}
              >
                <Input
                  prefix={<InComeConnection />}
                  disabled
                  suffix={<CloseOutlined onClick={() => deleteEdgesHandle(remove, field.name)} />}
                />
              </ResultFormItem>
            ))}
          </VerticalSpace>
        </>
      )}
    </Form.List>
  );
};
