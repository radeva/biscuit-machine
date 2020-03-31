import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as MotorSVG} from './../images/motor.svg';
import useInterval from 'react-useinterval';

export const MOTOR_TIMEOUT = 4000;

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
        <div data-testid='motor-container' className={containerCss}> <MotorSVG /> </div>
    );
}

Motor.propTypes = {
    isMachineMovementPaused: PropTypes.bool,
    isOn: PropTypes.bool,
    onSendPulse: PropTypes.func.isRequired
}

Motor.defaultProps = {
    isMachineMovementPaused: false,
    isOn: false
}
