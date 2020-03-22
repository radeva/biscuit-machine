import React from 'react';
import Switch, {SWITCH_STATES} from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import './global.css';

export default class BiscuitMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchState: SWITCH_STATES.OFF,
            isOvenOn: false,
            isMotorOn: false,
            isConveyorOn: false
        };

        this.handleSwitchClick = this.handleSwitchClick.bind(this);
        this.handleOvenHeatedEnough = this.handleOvenHeatedEnough.bind(this);
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

    render() {
        return (
            <div>
                <h1>BISCUIT MACHINE</h1>
                <Oven 
                    isOn={this.state.isOvenOn} 
                    handleOvenHeatedEnough={this.handleOvenHeatedEnough}
                />
                <Conveyor isOn={this.state.isConveyorOn}/>
                <div className='bottom-container'>
                    <div className='left'>
                        <Motor isOn={this.state.isMotorOn}/>
                    </div>
                    <div className='right'>
                        <Switch onSwitchClick={this.handleSwitchClick} switchState={this.state.switchState}/>
                    </div>
                </div>
            </div>
        )
    }
}