import React from 'react';
import '../styles/Action.css';
import '../styles/ActionCredit.css';

interface actionProps {
  action: string;
  color: string;
}

function Action(props: actionProps) {
  return (
    <div className="Action" style={{ backgroundColor: props.color }}>
      <div className="vertical-center">{props.action}</div>
    </div>
  );
}

export default Action;
