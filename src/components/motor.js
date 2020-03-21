import React from 'react';
import {ReactComponent as MotorSVG} from './motor.svg';
import styled from 'styled-components'

export default class Motor extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        let containerCss = 'motor';
        if(this.props.isOn) {
            containerCss += ' motor-on';
        }
        return (
            <div className={containerCss}> <MotorSVG /> </div>
        );
    }
}