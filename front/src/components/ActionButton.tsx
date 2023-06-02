import React, { useState } from 'react';
import '../styles/ActionButton.css';

interface ActionButtonProps {
  action: string;
  handleClick: (arg0: string) => void;
  colors: {
    color: string;
    hover: string;
  };
}

function ActionButton(props: ActionButtonProps) {
  const [isHover, setIsHover] = useState(false);

  const { action, handleClick, colors } = props;
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const buttonColor = isHover ? colors.hover : colors.color;

  return (
    <button
      className="ActionButton"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: buttonColor }}
      onClick={() => handleClick(action)}
    >{`Action ${action}`}</button>
  );
}

export { ActionButton };
