import React from 'react';

import { Container, Tail, Head, Content } from './styles';

interface HeadProps {
  color: string;
}

export interface TimelineItemProps {
  headProps: HeadProps;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ children, headProps }) => {
  return (
    <Container>
      <Tail />
      <Head color={headProps.color} />
      <Content>{children}</Content>
    </Container>
  );
};

export default TimelineItem;
