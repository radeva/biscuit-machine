import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as ConveyorSVG} from './conveyor.svg';
import styled from 'styled-components'

const ConveyorSVGOn = styled(ConveyorSVG)`
  .path {
    animation: conveyor 5s linear infinite;
  }
  
  @keyframes conveyor {
    to {
        stroke-dashoffset: -400;
    }
}`;

export default function Conveyor(props) {
    let conveyorElement = <ConveyorSVG />;
    if(props.isOn){
        conveyorElement = <ConveyorSVGOn />;
    }
    
    return (
        <div className="conveyor">
            {conveyorElement}
        </div>
    );
}

Conveyor.propTypes = {
    isOn: PropTypes.bool
}

Conveyor.defaultProps = {
    isOn: false
}