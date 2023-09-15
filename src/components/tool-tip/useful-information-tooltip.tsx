import { InfoCircleFilled } from '@ant-design/icons';
import { Tooltip, TooltipProps } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type Props = TooltipProps & {
  infoText: string;
};

export const UsefulInformationTooltip = ({ infoText, ...props }: Props) => {
  return (
    <Tooltip
      {...props}
      arrow={false}
      title={
        <VerticalSpace size={0}>
          {infoText.split(/\. |\.|\n/).map((text, i) => (
            <Text key={i} color={COLORS.PRIMARY.WHITE} className="useful-info-text">
              {text}
            </Text>
          ))}
        </VerticalSpace>
      }
      placement="right"
      overlayClassName="useful-info-tooltip"
    >
      <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
    </Tooltip>
  );
};
