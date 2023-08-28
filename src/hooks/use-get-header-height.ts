import { useState, useEffect } from 'react';

export const useGetHeaderHeight = () => {
  const [sectionHeight, setSectionHeight] = useState('0');

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(${headerHeight}px + ${headerTabsHeight}px )`;
    setSectionHeight(contentHeight);
  }, []);

  return sectionHeight;
};
