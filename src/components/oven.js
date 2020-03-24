import React from 'react';
import ReactInterval from 'react-interval';
import BakeBiscuitInterval from './bake-biscuit-interval';

const 
    OVEN_MIN_TEMPERATURE = 220,
    OVEN_MAX_TEMPERATURE = 240,
    HEAT_OVEN_STEP = 2,
    HEAT_OVEN_INTERVAL_IN_SECONDS = 100,
    COOLDOWN_OVEN_INTERVAL_IN_SECONDS = 3000,
    COOLDOWN_OVEN_STEP = 2,
    WARMUP_OVEN_INTERVAL_IN_SECONDS = 3000,
    WARMUP_OVEN_STEP = 2,
    INITIAL_TEMPERATURE = 40;

export default class Oven extends React.Component {
    heatingInterval = null;

    constructor(props) {
        super(props);
       
        this.state = {
            temperature: INITIAL_TEMPERATURE,
            callback: this.calculateTemperature,
            heatingStarted: false,
            enabled: false,
            timeout: HEAT_OVEN_INTERVAL_IN_SECONDS,
            bakingEnabled: false
        }
    }

    componentDidUpdate() {
        if(this.props.isOn && !this.state.heatingStarted){
            this.startHeating();
        }
    }

    startHeating() {
        this.setState({heatingStarted: true, enabled: true});
    }

    cooldown() {
        this.setState({
            timeout: COOLDOWN_OVEN_INTERVAL_IN_SECONDS, 
            callback: this.startCooldown
        });
    }

    warmup() {
        if(this.props.isOn) {
            this.setState({
                timeout: WARMUP_OVEN_INTERVAL_IN_SECONDS, 
                callback: this.startWarmup
            });
        }else {
            this.setState({
                timeout: HEAT_OVEN_INTERVAL_IN_SECONDS, 
                callback: this.calculateTemperature
            });
        }
    }

    startCooldown = () => {
        const {temperature} = this.state;
        if(temperature === OVEN_MIN_TEMPERATURE) {
            this.warmup();
        } else {
            this.setState({temperature: temperature - COOLDOWN_OVEN_STEP});
        }
    }

    startWarmup = () => {
        const {temperature} = this.state;
 
        if(!this.props.isOn || (this.props.isOn && temperature === OVEN_MAX_TEMPERATURE)) {
            this.cooldown();
        } else {
            this.setState({temperature: temperature + WARMUP_OVEN_STEP});
        }
    }

    calculateTemperature = () => {
        if(this.props.isOn) {
            this.calculateTemperatureUp();  
        } else {
            this.calculateTemperatureDown();
        }
    }

    calculateTemperatureDown() {
        const {temperature} = this.state;
        if(temperature === INITIAL_TEMPERATURE) {
            this.setState({enabled: false});
            return;
        }
        this.setState({temperature: temperature - HEAT_OVEN_STEP});
    }

    calculateTemperatureUp() {
        const {temperature} = this.state;
        let bakingEnabled = false;
        if(temperature === OVEN_MIN_TEMPERATURE) {
            this.props.onOvenHeatedEnough();
            bakingEnabled = true;
            this.warmup();
        }
        this.setState({temperature: temperature + HEAT_OVEN_STEP, bakingEnabled: bakingEnabled});
    }

    render() {
        let ovenLightClassName = 'oven-light';
        let isOvenOn = this.props.isOn;
        if(isOvenOn){
            ovenLightClassName += ' ' + ovenLightClassName + '-on';
        }

        const {timeout, enabled, callback} = this.state;

        return (
            <div className='oven right' >
                <label>GORENJE</label><span className={ovenLightClassName}>&#8226;</span><br />
                <label>{this.state.temperature}<span>&#8451;</span></label>
                <BakeBiscuitInterval isEnabled={this.state.bakingEnabled} isOvenOn={isOvenOn} hasBiscuitsToBake={this.props.hasBiscuitsToBake} onBiscuitBaked={this.props.onBiscuitBaked}/>
                <ReactInterval {...{timeout, enabled, callback}} />
            </div>
        );
    }
}