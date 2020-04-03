import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ExtruderSVG } from './../images/extruder.svg';
import { ReactComponent as BiscuitDoughSVG } from './../images/biscuit-dough.svg';

export default function Extruder(props) {
  let doughElement = '',
    animationPausedClass = '';
  if (props.isMachineMovementPaused) {
    animationPausedClass = 'animation-paused';
  }
  if (props.shouldPushNewBiscuit) {
    doughElement = (
      <BiscuitDoughSVG
        data-testid="biscuit-dough-svg"
        className={'biscuit-dough ' + animationPausedClass}
      />
    );
  }

  return (
    <div className="extruder left">
      <div>
        <ExtruderSVG />
      </div>
      {doughElement}
    </div>
  );
}

Extruder.propTypes = {
  isMachineMovementPaused: PropTypes.bool,
  shouldPushNewBiscuit: PropTypes.bool,
};

Extruder.defaultProps = {
  isMachineMovementPaused: false,
  shouldPushNewBiscuit: false,
};
