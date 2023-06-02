import React from 'react';
import '../styles/ActionCredit.css';

interface actionCreditProps {
  name: string;
  currentCredit: number;
}

function ActionCredit(props: actionCreditProps) {
  return (
    <div className="ActionCredit">
      <div className="vertical-center">
        {`${props.name} : ${props.currentCredit} crédits`}
      </div>
    </div>
  );
}

export { ActionCredit, actionCreditProps };
