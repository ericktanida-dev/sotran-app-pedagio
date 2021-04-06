import styled from 'styled-components';

export const Container = styled.li`
  position: relative;
  margin: 0;
  padding-bottom: 20px;
  font-size: 14px;
  list-style: none;

  &:last-child {
    padding-bottom: 0px;

    & > *:first-of-type {
      display: none;
    }
  }
`;

export const Tail = styled.div`
  position: absolute;
  top: 10px;
  left: 4px;
  height: calc(100% - 10px);
  border-left: 2px solid #f0f0f0;
`;

interface HeadProps {
  color: string;
}

export const Head = styled.div<HeadProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 100px;
  color: ${(props) => props.color};
  border-color: ${(props) => props.color};
`;

export const Content = styled.div`
  position: relative;
  top: -7.001px;
  margin: 0 0 0 26px;
  word-break: break-word;
`;
