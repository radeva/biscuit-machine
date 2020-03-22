import React from 'react';
import Switch, {SWITCH_STATES} from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Extruder from './extruder';
import Stamper from './stamper';
import './global.css';

const MOTOR_PULSES_PER_REVOLUTION = 1;

export default class BiscuitMachine extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            switchState: SWITCH_STATES.OFF,
            isOvenOn: false,
            isMotorOn: false,
            isConveyorOn: false,
            pulsesCount: 0,
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
            return {pulsesCount: state.pulsesCount + MOTOR_PULSES_PER_REVOLUTION};
        });
    }

    handlePulseUsedByExtruder() {
        console.log('handle pulse by extruder');
        this.setState((state, props) => {
            let newPulsesCount = state.pulsesCount;
            if(state.pulsesCount > 0) {
                newPulsesCount--;
            }

            return {
                pulsesCount: newPulsesCount, 
                biscuitsToStampCount: state.biscuitsToStampCount + 1
            };
        });
    }

    handlePulseUsedByStamper() {
        this.setState((state, props) => {
            let newPulsesCount = state.pulsesCount;
            if(state.pulsesCount > 0) {
                newPulsesCount--;
            }
            
            return {
                pulsesCount: newPulsesCount, 
                biscuitsToStampCount: state.biscuitsToStampCount - 1,
                biscuitsToBakeCount: state.biscuitsToBakeCount + 1
            };
        });
    }

    handleBiscuitBaked() {
        console.log('in handle biscuitbaked');
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
        let hasPulses = this.state.pulsesCount > 0;
        let hasBiscuitsToStamp = this.state.biscuitsToStampCount > 0;
        let hasBiscuitsToBake = this.state.biscuitsToBakeCount > 0;

        return (
            <div className='container'>
                <h1>BISCUIT MACHINE</h1>
                <div>
                    <Extruder 
                        onPulseUsed={this.handlePulseUsedByExtruder} 
                        hasPulses={hasPulses} 
                        hasBiscuitsToStamp={hasBiscuitsToStamp} 
                    />
                    <Stamper 
                        onPulseUsed={this.handlePulseUsedByStamper} 
                        hasPulses={hasPulses} 
                        hasBiscuitsToStamp={hasBiscuitsToStamp} 
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
                        <div>Pulses: {this.state.pulsesCount}</div>
                        <div>Biscuits to stamp: {this.state.biscuitsToStampCount}</div>
                        <div>Biscuits to bake: {this.state.biscuitsToBakeCount}</div>
                        <div>Biscuits baked: {this.state.biscuitsBakedCount}</div>
                    </div>
                    <div className='right'>
                        <Switch onSwitchClick={this.handleSwitchClick} switchState={this.state.switchState}/>
                    </div>
                </div>
            </div>
        )
    }
}