import styled, { css, keyframes } from 'styled-components';

export const ContainerCard = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface CardProps {
  animation?: boolean;
}

const cardMove = keyframes`
  0% {
    top: -20%;
    transform: perspective(200px) rotateX(0deg);
  }
  100% {
    top: -80%;
    transform: perspective(200px) rotateX(15deg);
  }
`;

export const Card = styled.div<CardProps>`
  position: relative;
  top: -320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 250px;
  border-radius: 5%;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: perspective(200px) rotateX(15deg);
  background: #8aba3f;

  ${(props) =>
    props.animation
      ? css`
          animation: ${cardMove} 3s infinite alternate;
        `
      : css`
          top: -80%;
        `}
`;

export const CardContent = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CardFooter = styled.div`
  width: 100%;
  height: 50%;
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Chip = styled.div`
  background: gold;
  width: 70%;
  height: 40%;
  border-radius: 10%;
  box-shadow: 0px 0px 5px gold;
`;

export const Logo = styled.div`
  height: auto;
  width: 100%;
  transform: rotate(90deg);
`;
