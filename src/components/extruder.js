import React from 'react';
import ReactInterval from 'react-interval';

export default class Extruder extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            timeout: 2000,
            enabled: true,
            callback: this.pushDough
        }
    }

    pushDough = () => {
        let shouldPushDough = this.props.hasPulses && !this.props.hasBiscuitsToStamp;
        if(shouldPushDough){
            this.props.onPulseUsed();
        }
    }

    render() {
        let doughElement = '';
        const {timeout, enabled, callback} = this.state;
        let shouldPushDough = this.props.hasPulses && !this.props.hasBiscuitsToStamp;
        if(shouldPushDough){
            doughElement=<div>oOo</div>;
        }

        return (
            <div className='extruder left'>
                <div>EXTRUDER HERE</div>
                {doughElement}
                <ReactInterval {...{timeout, enabled, callback}} />
            </div>
        );
    }
}