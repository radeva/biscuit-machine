import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MotorSVG } from './../images/motor.svg';
import useInterval from 'react-useinterval';

export const MOTOR_TIMEOUT = 4000;

export default function Motor(props) {
  let containerCss = 'motor';

  if (props.isMachineMovementPaused) {
    containerCss += ' motor-on animation-paused';
  }
  if (props.isOn) {
    containerCss += ' motor-on';
  }

  let intervalOffset = 0,
    lastIntervalStartDate = new Date();

  const handlePulse = () => {
    if (props.isMachineMovementPaused) {
      if (intervalOffset === 0) {
        intervalOffset = new Date().getTime() - lastIntervalStartDate.getTime();
      }

      return;
    }

    if (intervalOffset > 0) {
      setTimeout(() => {
        lastIntervalStartDate = new Date();
        props.onSendPulse();
      }, intervalOffset);
      intervalOffset = 0;
    } else {
      lastIntervalStartDate = new Date();
      props.onSendPulse();
    }
  };

  useInterval(
    handlePulse,
    props.isOn || props.isMachineMovementPaused ? MOTOR_TIMEOUT : null,
  );
  return (
    <div data-testid="motor-container" className={containerCss}>
      {' '}
      <MotorSVG className="motor-svg" />{' '}
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
