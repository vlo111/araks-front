import { Drawer } from 'antd';
import { containerStyle, contentStyle, drawerStyle, maskStyle } from './style';
import { useSchema } from "components/layouts/components/schema/wrapper";

export const Share = () => {
  const { perspective: { openShare }, startPerspectiveShare } = useSchema() || {};

  const onClose = () => {
    startPerspectiveShare({ openShare: false });
  };

  return (
    <>
      <div style={containerStyle}>
        <Drawer
          title="Share"
          placement="right"
          onClose={onClose}
          open={openShare}
          getContainer={false}
          contentWrapperStyle={contentStyle}
          drawerStyle={drawerStyle}
          maskStyle={maskStyle}
        />
      </div>
    </>
  );
};
