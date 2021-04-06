import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif !important;
`;

export const AnimationContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 350px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const Content = styled.div`
  flex: 1;
  margin-top: 5px;
  margin-right: 20px;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  > button {
    &:first-child {
      margin-right: 20px;
    }
  }
`;

export const InfoHeader = styled.div`
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
  color: #333;

  h3 {
    font-weight: 300;
  }

  hr {
    margin-top: 15px;
    background: #f9f9f9;
  }
`;

export const Description = styled.h2`
  font-weight: 300;
  color: #777;
  margin: 0px;
  border-left: 3px solid #e6e6e6;
  margin-bottom: 15px;
  padding-left: 12px;
`;

export const LocalInfo = styled.div`
  background: #f9f9f9;
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const LocalLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;

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

export const Divider = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f1f1f1;
`;

export const LocalItemPedagio = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
