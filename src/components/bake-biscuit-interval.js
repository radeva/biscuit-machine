import React from 'react';
import ReactInterval from 'react-interval';

export default class BakeBiscuitInterval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 2200,
            enabled: true,
            callback: this.bakeBiscuit
        }
    }

    bakeBiscuit = () => {
        console.log('bake biscuit');
        if(this.props.hasBiscuitsToBake) {
            this.props.onBiscuitBaked();
        }
    }
    
    render() {
        let biscuitElement = '';
        const {timeout, enabled, callback} = this.state;
        if(this.props.hasBiscuitsToBake) {
            biscuitElement=<div>oOo</div>;
        }

        return (
            <div>
                {biscuitElement}
                <ReactInterval {...{timeout, enabled, callback}} />
            </div>
        );
    }
}