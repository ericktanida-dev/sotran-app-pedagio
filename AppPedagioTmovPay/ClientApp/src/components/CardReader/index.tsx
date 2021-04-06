import React from 'react';

import {
  ContainerCardReader,
  CardReader as CardReaderComponent,
  Clip,
  Led,
  CardInsertContainer,
  CardInsert,
  CardReaderError,
} from './styles';

interface LedProps {
  color?: 'green' | 'red';
  animation?: boolean;
}

interface CardReaderProps {
  cardError?: boolean;
  cardLed?: LedProps;
}

const CardReader: React.FC<CardReaderProps> = ({ cardError, cardLed }) => {
  return (
    <ContainerCardReader>
      <CardReaderComponent>
        <Clip direction="left" />
        <Clip direction="right" />
        {cardLed && <Led {...cardLed} />}
        <CardInsertContainer>
          <CardInsert />
        </CardInsertContainer>
      </CardReaderComponent>
      {cardError && <CardReaderError>X</CardReaderError>}
    </ContainerCardReader>
  );
};

export default CardReader;
