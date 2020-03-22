import React from 'react';
import ReactInterval from 'react-interval';

export default class Stamper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 2000,
            enabled: true,
            callback: this.stampDough
        }
    }

    stampDough = () => {
        if(this.props.hasPulses && this.props.hasBiscuitsToStamp) {
            this.props.onPulseUsed();
        }
    }
    
    render() {
        let doughElement = '';
        const {timeout, enabled, callback} = this.state;
        if(this.props.hasPulses && this.props.hasBiscuitsToStamp) {
            doughElement=<div>oOo</div>;
        }

        return (
            <div className='stamper left'>
                <div>STAMPER HERE</div>
                {doughElement}
                <ReactInterval {...{timeout, enabled, callback}} />
            </div>
        );
    }
}