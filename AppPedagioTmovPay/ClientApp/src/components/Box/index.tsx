import React from 'react';

import { Container } from './styles';

interface BoxProps {
  alert?: 'success' | 'warning' | 'danger' | 'default';
  containerStyle?: object;
  scrollbar?: boolean;
}

const Box: React.FC<BoxProps> = ({
  children,
  alert,
  containerStyle,
  scrollbar,
}) => {
  return (
    <Container scrollbar={scrollbar} style={containerStyle} alert={alert}>
      <div>{children}</div>
    </Container>
  );
};

export default Box;
