import { edgePropertyD } from './path-d';

interface Props {
  id: string;
  stroke: string[];
}

type EdgeSvgType = ({ id, stroke }: Props) => JSX.Element;

export const EdgeSvg: EdgeSvgType = ({ id, stroke }) => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter={`url(#${id})`}>
      <rect x="4" width="32" height="32" rx="4" fill={`url(#fill${id})`} shapeRendering="crispEdges" />
    </g>
    <path d={edgePropertyD} fill="white" />
    <defs>
      <filter id={id} x="0" y="-4" width="40" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_394_4629" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.435294 0 0 0 0 0.435294 0 0 0 0 0.435294 0 0 0 0.3 0" />
        <feBlend mode="normal" in2="effect1_backgroundBlur_394_4629" result="effect2_dropShadow_394_4629" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_394_4629" result="shape" />
      </filter>
      <linearGradient id={`fill${id}`} x1="5.23077" y1="1.5" x2="38.5687" y2="4.62864" gradientUnits="userSpaceOnUse">
        <stop offset="0.0127841" stopColor={stroke[0]} />
        <stop offset="1" stopColor={stroke[1]} stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>
);
