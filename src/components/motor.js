import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MotorSVG } from './../images/motor.svg';
import useInterval from 'react-useinterval';

export const MOTOR_TIMEOUT = 4000;

export default function Motor(props) {
  const [intervalOffset, setIntervalOffset] = useState(0),
    [lastIntervalTime, setLastIntervalTime] = useState(new Date());

  let containerCss = 'motor';
  containerCss += props.isOn ? ' motor-on' : '';
  containerCss += props.isMachineMovementPaused
    ? ' motor-on animation-paused'
    : '';

  const handlePulse = () => {
    setLastIntervalTime(new Date());
    props.onSendPulse();
  };

  useInterval(
    handlePulse,
    (props.isOn || props.isMachineMovementPaused) && intervalOffset === 0
      ? MOTOR_TIMEOUT
      : null,
  );

  useEffect(() => {
    if (props.isMachineMovementPaused) {
      if (intervalOffset === 0) {
        const offset =
          MOTOR_TIMEOUT - (new Date().getTime() - lastIntervalTime.getTime());
        setIntervalOffset(Math.abs(offset));
      }
    } else if (intervalOffset > 0) {
      setTimeout(() => {
        setIntervalOffset(0);
        setLastIntervalTime(new Date());
        props.onSendPulse();
      }, intervalOffset);
    }
  }, [props, intervalOffset, lastIntervalTime]);

  return (
    <div data-testid="motor-container" className={containerCss}>
      <MotorSVG className="motor-svg" />
    </div>
  );
}

Motor.propTypes = {
  isMachineMovementPaused: PropTypes.bool,
  isOn: PropTypes.bool,
  onSendPulse: PropTypes.func.isRequired,
};

Motor.defaultProps = {
  isMachineMovementPaused: false,
  isOn: false,
};
