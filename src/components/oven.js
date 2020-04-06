import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from 'react-useinterval';
import { SWITCH_STATES } from './switch';
import { ReactComponent as BakedBiscuitSVG } from './../images/baked-biscuit.svg';

export const OVEN_MIN_TEMPERATURE = 220,
  OVEN_MAX_TEMPERATURE = 240,
  HEAT_OVEN_STEP = 2,
  HEAT_OVEN_INTERVAL_IN_MSECONDS = 100,
  WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS = 1000,
  INITIAL_TEMPERATURE = 40;

export default function Oven(props) {
  const [temperature, setTemperature] = useState(INITIAL_TEMPERATURE),
    [isOn, setIsOn] = useState(false),
    [isWarmingUp, setIsWarmingUp] = useState(false);

  const isOvenOn =
    props.switchState !== SWITCH_STATES.OFF || props.hasBiscuitOnConveyor;

  if ((!isOn && isOvenOn) || (isOn && !isOvenOn)) {
    setIsOn(isOvenOn);
  }

  const shouldTemperatureGoUp = isOn && temperature < OVEN_MIN_TEMPERATURE,
    shouldTemperatureGoDown =
      !isOn &&
      temperature > INITIAL_TEMPERATURE &&
      temperature <= OVEN_MIN_TEMPERATURE,
    shouldWarmUp =
      (isOn || props.hasBiscuitOnConveyor) &&
      (temperature === OVEN_MIN_TEMPERATURE ||
        (isWarmingUp &&
          temperature > OVEN_MIN_TEMPERATURE &&
          temperature < OVEN_MAX_TEMPERATURE)),
    shouldCoolDown =
      temperature === OVEN_MAX_TEMPERATURE ||
      ((!isWarmingUp || !isOn) &&
        temperature > OVEN_MIN_TEMPERATURE &&
        temperature < OVEN_MAX_TEMPERATURE);

  const calculateTemperatureDown = () => {
    if (temperature === OVEN_MIN_TEMPERATURE) {
      props.handleOvenReady(false);
    }

    setTemperature(temperature - HEAT_OVEN_STEP);
  };

  const calculateTemperatureUp = () => {
    const newTemperature = temperature + HEAT_OVEN_STEP;
    setTemperature(newTemperature);

    if (newTemperature === OVEN_MIN_TEMPERATURE) {
      props.handleOvenReady(true);
    }
  };

  const coolDown = () => {
    setIsWarmingUp(false);
    setTemperature(temperature - HEAT_OVEN_STEP);
  };

  const warmUp = () => {
    setIsWarmingUp(true);
    setTemperature(temperature + HEAT_OVEN_STEP);
  };

  useInterval(
    calculateTemperatureUp,
    shouldTemperatureGoUp ? HEAT_OVEN_INTERVAL_IN_MSECONDS : null,
  );
  useInterval(
    calculateTemperatureDown,
    shouldTemperatureGoDown ? HEAT_OVEN_INTERVAL_IN_MSECONDS : null,
  );
  useInterval(
    coolDown,
    shouldCoolDown ? WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS : null,
  );
  useInterval(
    warmUp,
    shouldWarmUp ? WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS : null,
  );

  let ovenLightClassName = 'oven-light';
  if (isOn) {
    ovenLightClassName += ' ' + ovenLightClassName + '-on';
  }

  let biscuitElement = '',
    animationPausedClass = '';
  if (props.switchState === SWITCH_STATES.PAUSE) {
    animationPausedClass = 'animation-paused';
  }
  if (props.hasBiscuitToBake) {
    biscuitElement = (
      <BakedBiscuitSVG
        data-testid="biscuit-in-oven"
        className={'baked-biscuit ' + animationPausedClass}
      />
    );
  }

  return (
    <div className="oven right">
      <label>GORENJE</label>
      <span className={ovenLightClassName} data-testid="oven-light">
        &#8226;
      </span>
      <br />
      <label data-testid="oven-temperature">
        {temperature}
        <span>&#8451;</span>
      </label>
      <div>{biscuitElement}</div>
    </div>
  );
}

Oven.propTypes = {
  switchState: PropTypes.oneOf(Object.values(SWITCH_STATES)).isRequired,
  hasBiscuitOnConveyor: PropTypes.bool,
  handleOvenReady: PropTypes.func.isRequired,
  hasBiscuitToBake: PropTypes.bool,
};

Oven.defaultProps = {
  hasBiscuitOnConveyor: false,
  hasBiscuitToBake: false,
};
