import React from 'react';
import SwitchButton from './switch-button';

export const SWITCH_STATES = {
    ON: 'ON',
    OFF: 'OFF',
    PAUSE: 'PAUSE'
}
export default function Switch(props) {
    const handleClick = (e) => {
      props.onSwitchClick(e);
    }

    const activeState = props.switchState,
          isPauseDisabled = activeState !== SWITCH_STATES.ON;

    return (
      <div className="switch-container">
        <div>Switch</div>
        <SwitchButton name={SWITCH_STATES.ON} activeButtonName={activeState} onClick={handleClick}/>
        <SwitchButton name={SWITCH_STATES.PAUSE} disabled={isPauseDisabled} activeButtonName={activeState} onClick={handleClick}/>
        <SwitchButton name={SWITCH_STATES.OFF} activeButtonName={activeState} onClick={handleClick}/>
      </div>
    );
}