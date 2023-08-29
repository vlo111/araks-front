const infoPanelContainer = `
  padding: 16px;
  height: 160px;
  width: 410px;
  padding: 1rem;
  border-radius: 4px;
  background: linear-gradient(136deg, rgba(237, 239, 248, 0.90) 0%, rgba(237, 239, 248, 0.40) 100%);
  box-shadow: 0px 10px 10px 0px rgba(141, 143, 166, 0.20);
  backdrop-filter: blur(7px);
`;

export const renderTooltipModal = (model: { [key: string]: unknown }) => `
  <div style="${infoPanelContainer}">
    <div style="display: flex; gap: 1rem">
      <div style="width: 40%">
        ${
          model.img
            ? `<img style="border-radius: 50%" src="${model.img}" width="130" height="130" />`
            : `<div style="border: 10px solid ${
                (model?.style as { stroke: string }).stroke
              }; background: white; width: 130px; height: 130px; border-radius: 50%; "></div>`
        }
      </div>

      <div style="display: flex; gap: 0.4rem; flex-direction: column; width: 60%">
        <div style="color: #232F6A; letter-spacing: 1.12px; font-weight: 600; font-size: 16px;">Name</div>
        <div style="color: #414141; font-size: 20px; font-weight: 700; letter-spacing: 1.4px;">${model.label}</div>
        
        <div style="display: flex; gap: 0.8rem; align-items: center">
          <div style="background: ${
            (model?.style as { stroke: string }).stroke
          }; width: 16px; height: 16px; border-radius: 50%"></div>
          <div>${model.nodeTypeName}</div>
        </div>
        
        <div style="display: flex; gap: 0.8rem; align-items: center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M6.32324 0.52551C5.57762 0.651303 4.93047 1.27668 4.75461 2.03144C4.65262 2.47352 4.70889 2.91919 4.93047 3.44752C4.94805 3.49065 3.98085 4.56529 2.89759 5.70462C2.86242 5.74416 2.80614 5.73337 2.5916 5.66149C2.04293 5.4746 1.56812 5.50335 1.07221 5.75853C-0.116565 6.35875 -0.366279 7.96891 0.572786 8.92854C0.952633 9.3167 1.40634 9.5 1.96204 9.49641C2.51774 9.49281 2.97145 9.28795 3.34778 8.87103C3.88237 8.2816 4.01954 7.44058 3.703 6.6966L3.62211 6.5133L4.67724 5.38115L5.73237 4.24901L5.95043 4.34245C6.14387 4.42871 6.20718 4.4359 6.63978 4.4359C7.07238 4.4359 7.13569 4.42871 7.33265 4.34245L7.55071 4.24901L8.60935 5.38115C9.18967 6.00653 9.65745 6.53486 9.65041 6.55283C9.47104 6.95897 9.4429 7.07757 9.42532 7.41901C9.4007 8.0336 9.566 8.48646 9.98102 8.91416C10.3538 9.29873 10.8181 9.5 11.3527 9.5C11.8838 9.5 12.341 9.30232 12.7244 8.91057C13.2871 8.33551 13.4454 7.46933 13.1253 6.72175C13.0444 6.53845 13.0444 6.52767 13.1042 6.4522C13.1359 6.40907 13.6107 5.89511 14.1593 5.30927L15.1547 4.24901L15.3727 4.34245C15.5697 4.42512 15.6365 4.4359 16.0304 4.4359C16.5404 4.4359 16.7585 4.3784 17.0891 4.15915C17.6518 3.78896 18 3.13843 18 2.45914C18 2.21474 17.8839 1.76188 17.7644 1.53186C17.6342 1.28746 17.2579 0.902892 17.0117 0.759128C16.769 0.618958 16.3364 0.500351 16.0691 0.500351C15.334 0.503945 14.6412 0.942427 14.3035 1.62171C14.0644 2.09973 14.0679 2.86168 14.3141 3.35048L14.3809 3.48706L13.7197 4.1951C13.3574 4.58326 12.8756 5.09362 12.654 5.32724L12.2495 5.74775L11.9858 5.65071C11.7607 5.56804 11.6657 5.55367 11.3527 5.55367C11.0397 5.55367 10.9412 5.56804 10.7126 5.6543L10.4382 5.75134L10.0232 5.30927C8.83445 4.04414 8.34557 3.50862 8.3526 3.46909C8.35612 3.44752 8.40184 3.32532 8.4546 3.19593C8.52846 3.01623 8.55308 2.88325 8.56715 2.62088C8.58825 2.19318 8.53901 1.94159 8.35964 1.58218C7.99386 0.834603 7.13217 0.38534 6.32324 0.52551Z" fill="#232F6A"/>
          </svg>
          <div style="color: #414141; font-size: 20px; font-weight: 700; letter-spacing: 1.4px;">Connection: 24</div>
        </div>
      </div>
    </div>
  </div>
`;
