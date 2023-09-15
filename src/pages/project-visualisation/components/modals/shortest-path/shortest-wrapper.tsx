import styled from 'styled-components';

export const Wrapper = styled.div`
  .header {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.4px;
  }

  .source-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .name {
      color: #232f6a;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1.12px;
    }

    .container {
      border-radius: 4px;
      border: 1px solid #fff;
      background: linear-gradient(122deg, #edeff8 3.09%, #edeff8 99.26%);
      box-shadow: 3px 3px 10px 0px rgba(141, 143, 166, 0.2);
      backdrop-filter: blur(7px);
      padding: 1rem;
      gap: 1rem;

      .type {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .name {
          color: #414141;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.98px;
        }
      }

      .node {
        .name {
          color: #414141;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1.4px;
        }
      }
    }

    .not-result {
      color: #232f6a;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1.4px;
    }
  }
`;
