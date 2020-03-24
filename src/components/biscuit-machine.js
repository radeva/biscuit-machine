import React from 'react';
import Switch, {SWITCH_STATES} from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Extruder from './extruder';
import Stamper from './stamper';
import './global.css';

export default class BiscuitMachine extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            switchState: SWITCH_STATES.OFF,
            isOvenOn: false,
            isMotorOn: false,
            isConveyorOn: false,
            extruderPulsesCount: 0,
            stamperPulsesCount: 0,
            biscuitsToStampCount: 0,
            biscuitsToBakeCount: 0,
            biscuitsBakedCount: 0
        };

        this.handleSwitchClick = this.handleSwitchClick.bind(this);
        this.handleOvenHeatedEnough = this.handleOvenHeatedEnough.bind(this);
        this.handleMotorPulse = this.handleMotorPulse.bind(this);
        this.handlePulseUsedByExtruder = this.handlePulseUsedByExtruder.bind(this);
        this.handlePulseUsedByStamper = this.handlePulseUsedByStamper.bind(this);
        this.handleBiscuitBaked = this.handleBiscuitBaked.bind(this);
    }

    handleSwitchClick(switchState) {
        this.setState({switchState: switchState});
        
        switch(switchState) {
            case SWITCH_STATES.ON:
                this.setState({isOvenOn: true});
                break;
            case SWITCH_STATES.OFF:
                this.setState({isOvenOn: false, isMotorOn: false, isConveyorOn: false});
                break;
            case SWITCH_STATES.PAUSE:
                break;
        }
    }

    handleOvenHeatedEnough() {
        this.setState({ 
            isMotorOn: true, 
            isConveyorOn: true
        });
    }

    handleMotorPulse() {
        this.setState((state, props) => {
            return {
                extruderPulsesCount: state.extruderPulsesCount + 1,
                stamperPulsesCount: state.stamperPulsesCount + 1};
        });

        // TODO: Call Extruder here
    }

    handlePulseUsedByExtruder() {
        this.setState((state, props) => {
            return {
                extruderPulsesCount: state.extruderPulsesCount - 1, 
                biscuitsToStampCount: state.biscuitsToStampCount + 1
            };
        });

        // TODO: Call Stamper here
    }

    handlePulseUsedByStamper() {
        this.setState((state, props) => {
            return {
                stamperPulsesCount: state.stamperPulsesCount - 1, 
                biscuitsToStampCount: state.biscuitsToStampCount - 1,
                biscuitsToBakeCount: state.biscuitsToBakeCount + 1
            };
        });

        // TODO: Call Baking here
    }

    handleBiscuitBaked() {
        this.setState((state, props) => {
            if(state.biscuitsToBakeCount > 0) {
                return {
                    biscuitsToBakeCount: state.biscuitsToBakeCount - 1,
                    biscuitsBakedCount: state.biscuitsBakedCount + 1
                };
            }
            
            return {};
        });
    }

    render() {
        let hasBiscuitsToStamp = this.state.biscuitsToStampCount > 0;
        let hasBiscuitsToBake = this.state.biscuitsToBakeCount > 0;

        let shouldExtruderUsePulse = this.state.extruderPulsesCount > 0 && !hasBiscuitsToStamp;
        let shouldStamperUsePulse = this.state.stamperPulsesCount > 0 && hasBiscuitsToStamp;

        console.log('render', this.state.extruderPulsesCount, this.state.stamperPulsesCount, hasBiscuitsToStamp);

        return (
            <div className='container'>
                <h1>BISCUIT MACHINE</h1>
                <div>
                    <Extruder 
                        onPulseUsed={this.handlePulseUsedByExtruder} 
                        shouldUsePulse={shouldExtruderUsePulse} 
                    />
                    <Stamper 
                        onPulseUsed={this.handlePulseUsedByStamper} 
                        shouldUsePulse={shouldStamperUsePulse} 
                    />
                    <Oven 
                        isOn={this.state.isOvenOn} 
                        onOvenHeatedEnough={this.handleOvenHeatedEnough}
                        hasBiscuitsToBake={hasBiscuitsToBake}
                        onBiscuitBaked={this.handleBiscuitBaked}
                    />
                </div>
                <Conveyor isOn={this.state.isConveyorOn}/>
                <div>
                    <div className='left'>
                        <Motor isOn={this.state.isMotorOn} onSendPulse={this.handleMotorPulse}/>
                    </div>
                    <div className='right'>
                        <Switch onSwitchClick={this.handleSwitchClick} switchState={this.state.switchState}/>
                    </div>
                </div>
                <div className='stats'>
                    <h2>Stats</h2>
                    <div>Pulses: {this.state.pulsesCount}</div>
                    <div>Biscuits to stamp: {this.state.biscuitsToStampCount}</div>
                    <div>Biscuits to bake: {this.state.biscuitsToBakeCount}</div>
                    <div>Biscuits baked: {this.state.biscuitsBakedCount}</div>
                </div>
            </div>
        )
    }
}