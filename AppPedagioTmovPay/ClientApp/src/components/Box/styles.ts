import styled, { css } from 'styled-components';

interface ContainerProps {
  alert?: 'success' | 'warning' | 'danger' | 'default';
  scrollbar?: boolean;
}

const containerVariations = {
  success: css`
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    background-color: #f6ffed;
    border: 1px solid #b7eb8f;
  `,
  warning: css`
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    background: #fffbe6;
    border: 1px solid #ffe58f;
  `,
  danger: css`
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
  `,
  default: css`
    background: rgb(255, 255, 255);
    border: 1px solid #f0f0f0;
  `,
};

export const Container = styled.div<ContainerProps>`
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;

  ${(props) => containerVariations[props.alert || 'default']}

  ${(props) =>
    props.scrollbar &&
    css`
      float: left;
      height: 400px;
      background: #f5f5f5;
      overflow-y: scroll;
      width: 100%;

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #051824;
      }

      > div {
        width: 100%;
        min-height: auto;
      }
    `}
`;
