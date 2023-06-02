import React from 'react';
import '../styles/Header.css';
import { ActionCredit, actionCreditProps } from './ActionCredit';

interface headerProps {
  actions: Array<actionCreditProps>;
}

function Header({ actions }: headerProps) {
  return (
    <div className="Header">
      {actions.map((action: actionCreditProps) => (
        <ActionCredit
          key={action.name}
          name={action.name}
          currentCredit={action.currentCredit}
        />
      ))}
    </div>
  );
}

export default Header;
