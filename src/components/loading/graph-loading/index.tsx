import React from 'react';
import { Loading } from 'components/loading';
import './graph-loading.css';

const style = {
  top: '150px',
  left: '480px',
  width: 'calc(100% - 480px)',
  position: 'fixed',
  background: 'rgba(35, 47, 106, 0.1)',
  backdropFilter: 'blur(1px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const GraphLoading: React.FC = () => {
  return <Loading className="graph-loading" style={style} />;
};
