import React from 'react';
import { v4 } from 'uuid';
import { Container } from './styles';
import TimelineItem, { TimelineItemProps } from './TimelineItem';

interface TimeLineItems {
  children: string;
  timelineItemsProps: TimelineItemProps;
}

interface TimeLineProps {
  timelineItems: TimeLineItems[];
}

const Timeline: React.FC<TimeLineProps> = ({ timelineItems }) => {
  return (
    <Container>
      {timelineItems.map((timelineItem) => (
        <TimelineItem
          key={v4()}
          headProps={timelineItem.timelineItemsProps.headProps}
        >
          {timelineItem.children}
        </TimelineItem>
      ))}
    </Container>
  );
};

export default Timeline;
