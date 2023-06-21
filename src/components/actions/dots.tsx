import { Button } from 'components/button';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import styled, { css } from 'styled-components';
import { FullWidth } from 'types/project';

const DotsWrapper = styled(({ fullWidth, ...props }) => <Button type="text" {...props} />)`
  && {
    position: relative;

    ${(props) =>
      props.fullWidth
        ? css``
        : css`
            height: 30px;
            width: 15px;
            padding: 3px;
            border-radius: 8px;
          `}

    &:hover, &:active {
      border-color: transparent;
      background-color: rgba(35, 47, 106, 0.1);
    }

    circle {
      fill: #f2f2f2;
      font-size: 20px;
    }
  }
`;

type Props = FullWidth & {
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const ActionDots = ({ fullWidth, style, onClick }: Props) => (
  <DotsWrapper fullWidth={fullWidth} style={style} onClick={onClick}>
    <DotsVertical className="more-dots" />
  </DotsWrapper>
);
