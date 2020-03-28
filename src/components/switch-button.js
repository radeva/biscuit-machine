import React from 'react';
import PropTypes from 'prop-types';

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

SwitchButton.propTypes = {
    name: PropTypes.string.isRequired,
    activeButtonName: PropTypes.string,
    disabled: PropTypes.bool
}

SwitchButton.defaultProps = {
    disabled: false
}