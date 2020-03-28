import React from 'react';

export default function SwitchButton(props) {
    const handleClick = (e) => {
      props.onClick(e.target.innerHTML);
    }

    let buttonClassName = 'switch-button';
    const buttonName = props.name;
    if(props.activeButtonName === buttonName) {
      buttonClassName += ' ' + buttonClassName + '-active';
    }

    return (
      <button 
        className={buttonClassName} 
        onClick={handleClick} 
        disabled={props.disabled}
      > 
        {buttonName} 
      </button>
    )
}