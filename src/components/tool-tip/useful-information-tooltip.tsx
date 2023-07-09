import { InfoCircleFilled } from '@ant-design/icons';
import { Space, Tooltip, TooltipProps } from 'antd';
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
        <VerticalSpace size={10}>
          <Text color={COLORS.PRIMARY.WHITE} className="useful-info-text">
            {infoText}
          </Text>
          <Space style={{ justifyContent: 'flex-end', width: '100%' }} size="small">
            <Text color="#C3C3C3" className="useful-info-text useful-info-help-text">
              For more information
            </Text>
            <Text color={COLORS.PRIMARY.WHITE} className="useful-info-text useful-info-help-text" underline>
              Help
            </Text>
          </Space>
        </VerticalSpace>
      }
      placement="right"
      overlayClassName="useful-info-tooltip"
    >
      <InfoCircleFilled style={{ fontSize: 16, color: '#C3C3C3' }} />
    </Tooltip>
  );
};
