import styled, { css, keyframes } from 'styled-components';

export const ContainerCardReader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardReader = styled.div`
  position: relative;
  top: -80px;
  background: #dfdfdfbd;
  width: 250px;
  height: 250px;
  transform-origin: bottom;
  transform: perspective(200px) rotateX(25deg);
  z-index: 1;
`;

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;

interface LedProps {
  animation?: boolean;
  color?: 'red' | 'green';
}

export const Led = styled.div<LedProps>`
  position: absolute;
  width: 7%;
  height: 7%;
  border-radius: 30%;
  right: 45%;
  top: 40%;

  ${(props) =>
    props.color === 'green'
      ? css`
          background: rgba(172, 255, 47);
          box-shadow: 0 0 5px greenyellow;
        `
      : css`
          background: rgba(255, 99, 71);
          box-shadow: 0 0 5px red;
        `};

  ${(props) =>
    props.animation
      ? css`
          animation: ${blinker} 1s linear infinite;
        `
      : ''}
`;

interface ClipProps {
  direction?: 'left' | 'right';
}

const clipDirectionVariations = {
  left: css`
    clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%);
    left: 0;
  `,
  right: css`
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 50%);
    right: 0;
  `,
};

export const Clip = styled.div<ClipProps>`
  position: absolute;
  width: 25%;
  height: 50%;
  background: #f0f2f5;

  ${(props) => clipDirectionVariations[props.direction || 'left']}
`;

export const CardInsertContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 20%;
  background: #bbbbbbbd;
  bottom: -20%;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
  transform-origin: top;
  transform: perspective(100px) rotateX(-15deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardInsert = styled.div`
  background: #dfdfdf70;
  width: 80%;
  height: 25%;
  border-radius: 7px;
`;

export const CardReaderError = styled.div`
  position: relative;
  top: -60px;
  font-size: 10em;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgba(255, 99, 71);
  font-weight: 600;
  animation: ${blinker} 1s linear infinite;
`;
