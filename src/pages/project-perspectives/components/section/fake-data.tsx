import { ReactComponent as MoreSvg } from './collapse/icons/more.svg';
import { PanelFooter } from './collapse/panel-footer';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => <MoreSvg style={{ display: 'flex' }} onClick={(event) => event.stopPropagation()} />;

const children = (
  <>
    <span>{text}</span>
    <PanelFooter />
  </>
);

export const list = [
  { header: <div>Main</div>, key: '1', children },
  { header: <div>Work</div>, key: '2', children, extra: genExtra() },
  { header: <div>Manege a business</div>, key: '3', children, extra: genExtra() },
];
