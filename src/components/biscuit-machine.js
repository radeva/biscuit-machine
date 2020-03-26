import React, {useState, useEffect} from 'react';
import Switch, {SWITCH_STATES} from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Extruder from './extruder';
import Stamper from './stamper';
import './global.css';

// shouldPushNewBiscuit, hasBiscuitToStamp, hasBiscuitToBake
const initialState = 0b000;

export default function BiscuitMachine(props) { 
    const [machineState, setMachineState] = useState(initialState),
        [switchState, setSwitchState] = useState(SWITCH_STATES.OFF),
        [isMachineOn, setIsMachineOn] = useState(false),
        [biscuitsBakedCount, setBiscuitsBakedCount] = useState(0);

    const shouldPushNewBiscuit = machineState & 0b100,
            hasBiscuitToStamp = machineState & 0b010,
            hasBiscuitToBake = machineState & 0b001;

    const handleSwitchClick = (switchState) => {
        switch(switchState) {
            case SWITCH_STATES.ON:
                setSwitchState(SWITCH_STATES.ON)
                break;
            case SWITCH_STATES.OFF:
                setSwitchState(SWITCH_STATES.OFF)
                break;
            case SWITCH_STATES.PAUSE:
                setSwitchState(SWITCH_STATES.PAUSE)
                break;
        }
    };

    const handleMotorPulse = () => {
        console.log('handle pulse');
        if(switchState === switchState.PAUSE){
            return;
        }

        let nextState = machineState;
        switch(machineState){
            case 0b000:
                nextState = switchState === SWITCH_STATES.ON ? 0b100 : 0b000;
                break;
            case 0b100:
                nextState = switchState === SWITCH_STATES.ON ? 0b110 : 0b010;
                break;
            case 0b110:
                nextState = switchState === SWITCH_STATES.ON ? 0b111 : 0b011;
                break;
            case 0b111:
                if(switchState === SWITCH_STATES.OFF){
                    nextState = 0b011;
                }
                setBiscuitsBakedCount(biscuitsBakedCount + 1)
                break;
            case 0b011:
                setBiscuitsBakedCount(biscuitsBakedCount + 1)
                nextState = 0b001; // switch OFF
                break;
            case 0b001:
                setBiscuitsBakedCount(biscuitsBakedCount + 1)
                nextState = 0b000; // switch OFF
                break;
        }

        setMachineState(nextState);
    }

    const handleOvenReady = () => {
        setIsMachineOn(true);
    };

    let hasBiscuitOnConveyor = shouldPushNewBiscuit || 
        hasBiscuitToStamp || 
        hasBiscuitToBake;

    useEffect(() => {
        if(switchState === SWITCH_STATES.OFF && !hasBiscuitOnConveyor) {
            setIsMachineOn(false);
        }
    });

    const bakedBiscuits = []
    for (let i=0; i<biscuitsBakedCount; i++) {
        bakedBiscuits.push(<li key={i} className='baked-biscuit'>oOo</li>);
    }

    return  (
        <div className='container'>
            <h1>BISCUIT MACHINE</h1>
            <div>
                <Extruder 
                    shouldPushNewBiscuit = {shouldPushNewBiscuit}
                />
                <Stamper 
                    hasBiscuitToStamp = {hasBiscuitToStamp}
                />
                <Oven 
                    switchState={switchState}
                    hasBiscuitOnConveyor={hasBiscuitOnConveyor}
                    hasBiscuitToBake={hasBiscuitToBake}
                    handleOvenReady={handleOvenReady}
                />
            </div>
            <Conveyor isOn={isMachineOn} />
            <div>
                <div className='left'>
                    <Motor 
                        isOn={isMachineOn} 
                        onSendPulse={handleMotorPulse}
                    />
                </div>
                <div className='right'>
                    <Switch onSwitchClick={handleSwitchClick} switchState={switchState}/>
                </div>
            </div>
            <div className='stats'>
                <h2>Stats</h2>
                <div>Biscuits baked: {biscuitsBakedCount} </div>
            </div>
            <div className='biscuits-container'>
                <h2>Bucket with Biscuits</h2>
                <ul className='biscuits-list'>{bakedBiscuits}</ul>
            </div>
        </div>);
}