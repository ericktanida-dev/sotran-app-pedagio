import styled from 'styled-components';

interface CheckProps {
  active?: boolean;
}

interface TagProps {
  status?: string;
}

export const Container = styled.div`
  background: #fdfdfd;
  border: 1px solid #f1f1f1;
  padding: 10px;
  min-height: 65px;
  border-radius: 5px;
  display: flex;
  flex: 1;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%) !important;
  margin-bottom: 15px;
  transition: 0.3s all;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;

export const Tag = styled.div<TagProps>`
  border-radius: 20px;
  min-width: 90px;
  padding: 2px 14px;
  border: 1px solid #73c300;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-right: 25px;

  span {
    color: #73c300;
    font-weight: 500;
    font-size: 14px;
  }

  ${(props) => {
    switch (props.status) {
      case 'PAGO_EMBARCADOR':
        return `
          background: #0d364a;
          border: 1px solid #0d364a;

          span {
            color: #f1f1f1;
          }
        `;

      case 'EM_ABERTO':
        return 'background: #f0ffec;';

      default:
        return 'background: #000;';
    }
  }}
`;

export const LocalLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 25px;

  span {
    font-size: 14px;
    margin: 0;
    color: #999;
    font-weight: 500;
    line-height: 1.5;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }
`;

export const Check = styled.div<CheckProps>`
  width: 28px;
  height: 28px;

  border-radius: 50%;
  border: 2px solid #777;
  margin-right: 50px;
  cursor: pointer;
  transition: 0.3s all;
  justify-content: center;
  align-items: center;
  display: flex;

  &:hover {
    border: 2px solid #73c300;
  }

  ${(props) =>
    props.active &&
    `
    color: #73c300;
    border: 2px solid #73c300;
  `}
`;
