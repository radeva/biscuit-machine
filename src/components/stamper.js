import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as StamperSVG } from './../images/stamper.svg';
import { ReactComponent as StamperPusherSVG } from './../images/stamper-pusher.svg';
import { ReactComponent as RawBiscuitSVG } from './../images/raw-biscuit.svg';

export default function Stamper(props) {
  let doughElement = '',
    animationPausedClass = '',
    stamperPusherClassName = 'stamper-pusher ';

  if (props.isMachineMovementOn) {
    stamperPusherClassName += 'stamper-pusher-on ';
  } else if (props.isMachineMovementPaused) {
    animationPausedClass = 'animation-paused';
    stamperPusherClassName += 'stamper-pusher-on ' + animationPausedClass;
  }

  if (props.hasBiscuitToStamp) {
    doughElement = (
      <RawBiscuitSVG
        data-testid="raw-biscuit"
        className={'raw-biscuit ' + animationPausedClass}
      />
    );
  }
  return (
    <div className="stamper left">
      <StamperSVG />
      <StamperPusherSVG
        data-testid="stamper-pusher"
        className={stamperPusherClassName}
      />
      {doughElement}
    </div>
  );
}

Stamper.propTypes = {
  isMachineMovementOn: PropTypes.bool,
  isMachineMovementPaused: PropTypes.bool,
  hasBiscuitToStamp: PropTypes.bool,
};

Stamper.defaultProps = {
  isMachineMovementOn: false,
  isMachineMovementPaused: false,
  hasBiscuitToStamp: false,
};
