import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from './switch-button';

export const SWITCH_STATES = {
  ON: 'ON',
  OFF: 'OFF',
  PAUSE: 'PAUSE',
};

export default function Switch(props) {
  const handleClick = (e) => {
    props.onSwitchClick(e);
  };

  const activeState = props.switchState,
    isPauseDisabled = activeState !== SWITCH_STATES.ON || !props.isOvenReady;

  return (
    <div className="switch-container">
      <SwitchButton
        name={SWITCH_STATES.ON}
        activeButtonName={activeState}
        onClick={handleClick}
      />
      <SwitchButton
        name={SWITCH_STATES.PAUSE}
        disabled={isPauseDisabled}
        activeButtonName={activeState}
        onClick={handleClick}
      />
      <SwitchButton
        name={SWITCH_STATES.OFF}
        activeButtonName={activeState}
        onClick={handleClick}
      />
    </div>
  );
}

Switch.propTypes = {
  switchState: PropTypes.oneOf(Object.values(SWITCH_STATES)).isRequired,
  onSwitchClick: PropTypes.func.isRequired,
  isOvenReady: PropTypes.bool
};

Switch.defaultProps = {
  switchState: SWITCH_STATES.OFF,
  isOvenReady: false
};
