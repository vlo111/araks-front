import { ReactComponent as MoreSvg } from './content/icons/more.svg';
import { Share } from './content/footers/share';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => <MoreSvg style={{ display: 'flex' }} onClick={(event) => event.stopPropagation()} />;

const children = (
  <>
    <span>{text}</span>
    <Share />
  </>
);

export const list = [
  { header: <div>Main</div>, key: '1', children },
  { header: <div>Work</div>, key: '2', children, extra: genExtra() },
  { header: <div>Manege a business</div>, key: '3', children, extra: genExtra() },
];
