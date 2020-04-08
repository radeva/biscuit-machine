import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as BakedBiscuitSVG } from './../images/baked-biscuit.svg';

export default function BakedBiscuitsList(props) {
  const bakedBiscuits = [],
    bakedBiscuitsCount = props.bakedBiscuitsCount;

  for (let i = 0; i < bakedBiscuitsCount; i++) {
    bakedBiscuits.push(
      <li key={i}>
        <BakedBiscuitSVG />
      </li>,
    );
  }

  return (
    <ul className="biscuits-list" data-testid="biscuits-list">
      {bakedBiscuits}
    </ul>
  );
}

BakedBiscuitsList.propTypes = {
  bakedBiscuitsCount: PropTypes.number,
};

BakedBiscuitsList.defaultProps = {
  bakedBiscuitsCount: 0,
};
