import React from 'react';
import '../styles/ActionList.css';
import { ActionButton } from './ActionButton';
import { pushActionHelper } from '../helpers/apiHelper';

interface ActionListProps {
  pushAction: (arg0: string) => void;
}

interface Color {
  color: string;
  hover: string;
}

function ActionList(props: ActionListProps) {
  const actions: Array<string> = ['A', 'B', 'C'];
  const colorSets: Array<Color> = [
    {
      color: '#23A455',
      hover: '#48B997',
    },
    {
      color: '#FF9999',
      hover: '#FF6666',
    },
    {
      color: '#FFBB99',
      hover: '#FF9966',
    },
  ];

  const handleClick = async (value: string): Promise<void> => {
    await pushActionHelper(value);
    props.pushAction(value);
  };

  return (
    <div className="ActionList">
      <p>Cliquez sur une action pour l'ajouter dans la queue</p>
      <div className="ButtonList">
        {actions.map((action: string, index: number) => {
          return (
            <ActionButton
              action={action}
              key={index}
              handleClick={handleClick}
              colors={colorSets[index]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ActionList;
