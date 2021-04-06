import React from 'react';
import LogoTmovWhite from '../../assets/logo-tmov-white.svg';

import {
  ContainerCard,
  Card as CardComponent,
  CardContent,
  CardWrapper,
  Chip,
  Logo,
  CardFooter,
} from './styles';

interface CardProps {
  animation?: boolean;
}

const Card: React.FC<CardProps> = ({ animation }) => {
  return (
    <ContainerCard>
      <CardComponent animation={animation}>
        <CardContent>
          <CardWrapper />
          <CardWrapper />
          <CardWrapper>
            <Chip />
          </CardWrapper>
          <CardWrapper>
            <Logo>
              <img className="logo" src={LogoTmovWhite} alt="TmovPay" />
            </Logo>
          </CardWrapper>
        </CardContent>
        <CardFooter />
      </CardComponent>
    </ContainerCard>
  );
};

export default Card;
