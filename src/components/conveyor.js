import React from 'react';
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

export default class Conveyor extends React.Component {
    render() {
        
        let conveyorElement = <ConveyorSVG />;
        if(this.props.isOn){
            conveyorElement = <ConveyorSVGOn />;
        }
        
        return (
            <div className="conveyor">
                {conveyorElement}
            </div>
        );
    }
}