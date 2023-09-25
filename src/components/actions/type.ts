import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { ButtonProps } from 'antd';

export type ActionProps = {
  icon?: Partial<CustomIconComponentProps>;
  button?: ButtonProps;
  isPdf?: boolean;
  token?: string;
  nodeId?: string;
};

export type SearchActionProps = {
  isSearchActive: boolean;
  setSearchActive: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};
