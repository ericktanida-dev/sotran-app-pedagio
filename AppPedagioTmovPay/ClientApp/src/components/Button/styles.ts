import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #051824;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #ffffff;
  width: 100%;
  font-weight: 500;
  margin: 16px 0;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#051824')};
  }

  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
  }
`;
