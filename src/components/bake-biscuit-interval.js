import React from 'react';
import ReactInterval from 'react-interval';

export default class BakeBiscuitInterval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 3800,
            enabled: false,
            callback: this.bakeBiscuit
        }
    }

    componentDidUpdate() {
        if(this.props.isOvenOn && this.props.hasBiscuitsToBake && !this.state.enabled){
            this.startBaking();
        }
    }

    startBaking() {
        this.setState({enabled: true});
    }

    stopBaking() {
        this.setState({enabled: false});
    }

    bakeBiscuit = () => {
        if(this.props.hasBiscuitsToBake) {
            this.props.onBiscuitBaked();
        }else{
            if(!this.props.isOvenOn) {
                this.stopBaking()
            }
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