import React from 'react';
import {ReactComponent as MotorSVG} from './motor.svg';
import ReactInterval from 'react-interval';
import styled from 'styled-components'

export default class Motor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 2000,
            enabled: false,
            callback: this.sendPulse
        }
    }

    componentDidUpdate() {
        let isMotorOn = this.props.isOn,
            hasMotorStarted = this.state.enabled;

        if(isMotorOn && !hasMotorStarted){
            this.startMotor();
        }
        else if(!isMotorOn && hasMotorStarted) {
            this.stopMotor();
        }
    }

    startMotor() {
        this.setState({enabled: true});
    }

    stopMotor() {
        this.setState({enabled: false});
    }

    sendPulse = () => {
        this.props.onSendPulse();
    }
    
    render() {
        let containerCss = 'motor';
        if(this.props.isOn) {
            containerCss += ' motor-on';
        }
        const {timeout, enabled, callback} = this.state;
        return (
            <React.Fragment>
                <div className={containerCss}> <MotorSVG /> </div>
                <ReactInterval {...{timeout, enabled, callback}} />
            </React.Fragment>
        );
    }
}