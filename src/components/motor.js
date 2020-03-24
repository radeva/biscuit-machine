import React, { useState, useEffect } from 'react';
import {ReactComponent as MotorSVG} from './motor.svg';
import useInterval from 'react-useinterval';

const MOTOR_TIMEOUT = 4000;

export default function Motor(props) {
    let containerCss = 'motor';
    if(props.isOn) {
        containerCss += ' motor-on';
    }

    useInterval(props.onSendPulse, props.isOn ? MOTOR_TIMEOUT : null);
    return (
        <div className={containerCss}> <MotorSVG /> </div>
    );
}