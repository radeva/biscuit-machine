import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as BiscuitDoughSVG } from './../images/biscuit-dough.svg';
import { ReactComponent as RawBiscuitSVG } from './../images/raw-biscuit.svg';
import { ReactComponent as BakedBiscuitSVG } from './../images/baked-biscuit.svg';

export default function Biscuit(props) {
  let animationPausedClass = '';
  if (props.isMachineMovementPaused) {
    animationPausedClass = 'animation-paused';
  }

  const doughElement = props.shouldPushNewBiscuit ? (
    <BiscuitDoughSVG
      data-testid="biscuit-dough-svg"
      className={'biscuit-dough ' + animationPausedClass}
    />
  ) : null;

  const biscuitToStampElement = props.hasBiscuitToStamp ? (
    <RawBiscuitSVG
      data-testid="raw-biscuit"
      className={'raw-biscuit ' + animationPausedClass}
    />
  ) : null;

  const biscuitToBakeElement = props.hasBiscuitToBake ? (
    <BakedBiscuitSVG
      data-testid="biscuit-in-oven"
      className={'baked-biscuit ' + animationPausedClass}
    />
  ) : null;

  return (
    <div className="biscuit-container">
      {doughElement}
      {biscuitToStampElement}
      {biscuitToBakeElement}
    </div>
  );
}

Biscuit.propTypes = {
  isMachineMovementPaused: PropTypes.bool,
  shouldPushNewBiscuit: PropTypes.bool,
  hasBiscuitToStamp: PropTypes.bool,
  hasBiscuitToBake: PropTypes.bool,
};

Biscuit.defaultProps = {
  isMachineMovementPaused: false,
  shouldPushNewBiscuit: false,
  hasBiscuitToStamp: false,
  hasBiscuitToBake: false,
};
