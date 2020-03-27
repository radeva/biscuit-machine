import React from 'react';
import {ReactComponent as MotorSVG} from './../images/motor.svg';
import useInterval from 'react-useinterval';

const MOTOR_TIMEOUT = 4000;

export default function Motor(props) {
    let containerCss = 'motor';

    if(props.isMachineMovementPaused) {
        containerCss += ' motor-on animation-paused';
    }
    if(props.isOn) {
        containerCss += ' motor-on';
    }

    useInterval(props.onSendPulse, props.isOn ? MOTOR_TIMEOUT : null);
    return (
        <div className={containerCss}> <MotorSVG /> </div>
    );
}