import { PopoverProps } from 'antd';
import { LongTextPopover } from 'components/popover';
import { VARIABLES } from 'helpers/constants';
import { ReactElement } from 'react';
import { Text } from './text';

type Props = PopoverProps & {
  className?: string;
  cutPosition?: number;
  name: string;
  titleContent?: ReactElement | string;
};

export const LongTitle = ({
  name,
  cutPosition = VARIABLES.MAX_PROJECT_TITLE_LENGTH,
  className,
  titleContent,
  ...props
}: Props) => (
  <LongTextPopover title={titleContent || <Text>{name}</Text>} align={{ offset: [15, 22] }} {...props}>
    <Text className={className}>{name.substring(0, cutPosition) + '...'}</Text>
  </LongTextPopover>
);
