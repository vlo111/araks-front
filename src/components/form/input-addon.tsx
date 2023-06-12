import { FormItem } from './form-item';
import styled from 'styled-components';
import { Input } from 'components/input';
import { Role } from 'components/dropdown';

const ShareInput = styled(Input)`
  height: 40px;
  && {
    .ant-input-group-addon {
      background: linear-gradient(91.54deg, rgba(232, 235, 248, 0.7) 5.25%, rgba(232, 235, 248, 0.2) 97.48%);
      border-color: #c3c3c3;
      .ant-form-item {
        margin-bottom: 0;
      }
    }

    .ant-input-wrapper,
    input {
      border-color: #c3c3c3;
    }

    input {
      height: 40px;
      font-weight: 600;
      letter-spacing: 0.07em;
      color: #c5c5c5;
    }
  }
`;

export const InputAddon = () => {
  const selectAfter = (
    <FormItem name="role">
      <Role />
    </FormItem>
  );

  return (
    <FormItem name="email" rules={[{ required: true }, { type: 'email' }]}>
      <ShareInput placeholder="Email" addonAfter={selectAfter} />
    </FormItem>
  );
};
