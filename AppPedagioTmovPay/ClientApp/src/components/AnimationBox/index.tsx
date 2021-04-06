import React from 'react';

import Box from '../Box';
import CardReader from '../CardReader';
import Card from '../Card';
import { AnimationContent } from './styles';

interface AnimationProps {
  onChange?: (a: number) => void;
}

interface Alert {
  message: string;
  type: 'success' | 'warning' | 'danger' | 'default';
}

enum EStatusCardReader {
  cardPresent,
  cardNotPresent,
  cardReaderNotPresent,
}

const AnimationBox: React.FC<AnimationProps> = ({ onChange }) => {
  const [
    statusCardReader,
    setStatusCardReader,
  ] = React.useState<EStatusCardReader>(2);

  const alertType = React.useMemo((): Alert => {
    if (statusCardReader === EStatusCardReader.cardReaderNotPresent) {
      return { message: 'Leitora não identificada', type: 'danger' };
    }

    if (statusCardReader === EStatusCardReader.cardNotPresent) {
      return { message: 'Insira o cartão', type: 'warning' };
    }

    return { message: 'Cartão identificado', type: 'success' };
  }, [statusCardReader]);

  React.useEffect(() => {
    async function getStatus(): Promise<void> {
      try {
        const response = await fetch('Pedagio/GetStatusCardReader');
        const data = await response.json();
        setStatusCardReader(data);
        if (onChange) onChange(data);
      } catch (err) {
        setStatusCardReader(2);
      }
    }

    const timer = setInterval(() => {
      getStatus();
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimationContent>
      <Box alert={alertType.type}>{alertType.message}</Box>
      <CardReader
        cardError={statusCardReader === EStatusCardReader.cardReaderNotPresent}
        cardLed={{
          animation: true,
          color:
            statusCardReader === EStatusCardReader.cardReaderNotPresent
              ? 'red'
              : 'green',
        }}
      />
      {statusCardReader !== EStatusCardReader.cardReaderNotPresent && (
        <Card
          animation={statusCardReader === EStatusCardReader.cardNotPresent}
        />
      )}
    </AnimationContent>
  );
};

export default AnimationBox;
