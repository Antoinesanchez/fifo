import React from 'react';
import '../styles/Queue.css';
import Action from './Action';

interface QueueProps {
  actions: Array<string>;
}

const actionColorMapper: Record<string, string> = {
  A: '#23A455',
  B: '#FF9999',
  C: '#FFBB99',
};

function Queue({ actions }: QueueProps) {
  return (
    <div className="Queue">
      {actions.map((action: string, index: number) => {
        const color: string = actionColorMapper[action];
        return <Action action={action} color={color} key={index} />;
      })}
    </div>
  );
}

export default Queue;
