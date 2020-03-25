import React, {useReducer} from 'react';
import Switch, {SWITCH_STATES} from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Extruder from './extruder';
import Stamper from './stamper';
import './global.css';

const actionTypes = {
    turnSwitchOn: 'turnSwitchOn',
    pauseSwitch: 'pauseSwitch',
    turnSwitchOff: 'turnSwitchOff',
    startBaking: 'startBaking',
    releaseMotorPulses: 'releaseMotorPulses',
    markPulseInUseByExtruder: 'markPulseInUseByExtruder',
    usePulseByExtruder: 'usePulseByExtruder',
    markPulseInUseByStamper: 'markPulseInUseByStamper',
    usePulseByStamper: 'usePulseByStamper',
    bakeBiscuitInProgress: 'bakeBiscuitInProgress',
    bakeBiscuitDone: 'bakeBiscuitDone',
}

const initialState = {
    switchState: SWITCH_STATES.OFF,
    isOvenOn: false,
    isMotorOn: false,
    isConveyorOn: false,
    pulsesCount: 0,
    pulsesInUseByExtruder: 0,
    pulsesInUseByStamper: 0,
    totalPulsesReleased: 0,
    biscuitsToStampCount: 0,
    biscuitsToBakeCount: 0,
    biscuitsBakingInProgressCount: 0,
    biscuitsBakedCount: 0,
    showNewBiscuit: false
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.turnSwitchOn:
        return {
            ...state,
            isOvenOn: true, 
            switchState: SWITCH_STATES.ON
        };
    case actionTypes.turnSwitchOff:
        return {
            ...state,
            isOvenOn: false,
            isMotorOn: false,
            isConveyorOn: false,
            switchState: SWITCH_STATES.OFF
        }
    case actionTypes.startBaking:
        return {
            ...state, 
            isMotorOn: true, 
            isConveyorOn: true
        };
    case actionTypes.releaseMotorPulses:
        return {
            ...state,
            pulsesCount: state.pulsesCount + 1,
            totalPulsesReleased: state.totalPulsesReleased + 1,
        }
    case actionTypes.markPulseInUseByExtruder:
        return {
            ...state,
            pulsesInUseByExtruder: state.pulsesInUseByExtruder + 1,
            pulsesCount: state.pulsesCount - 1
        }
    case actionTypes.markPulseInUseByStamper:
        return {
            ...state,
            pulsesInUseByStamper: state.pulsesInUseByStamper + 1,
            pulsesCount: state.pulsesCount - 1
        }
    case actionTypes.usePulseByExtruder:
        return {
            ...state,
            pulsesInUseByExtruder: state.pulsesInUseByExtruder - 1,
            biscuitsToStampCount: state.biscuitsToStampCount + 1
        };
    case actionTypes.usePulseByStamper:
        return {
            ...state,
            pulsesInUseByStamper: state.pulsesInUseByStamper - 1,
            biscuitsToStampCount: state.biscuitsToStampCount - 1,
            biscuitsToBakeCount: state.biscuitsToBakeCount + 1
        };
    case actionTypes.bakeBiscuitInProgress:
        return {
            ...state,
            biscuitsToBakeCount: state.biscuitsToBakeCount - 1,
            biscuitsBakingInProgressCount: state.biscuitsBakingInProgressCount + 1
        };
    case actionTypes.bakeBiscuitDone:
        return {
            ...state,
            biscuitsBakingInProgressCount: state.biscuitsBakingInProgressCount -1,
            biscuitsBakedCount: state.biscuitsBakedCount + 1
        };
    default:
      throw new Error(); // TODO
  }
}

export default function BiscuitMachine(props){

    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleSwitchClick = (switchState) => {
        switch(switchState) {
            case SWITCH_STATES.ON:
                dispatch({type: actionTypes.turnSwitchOn});
                break;
            case SWITCH_STATES.OFF:
                dispatch({type: actionTypes.turnSwitchOff});
                break;
            case SWITCH_STATES.PAUSE:
                break;
        }
    };

    const bakedBiscuits = []
    for (let i=0; i<state.biscuitsBakedCount; i++) {
        bakedBiscuits.push(<li key={i} className='baked-biscuit'>oOo</li>);
    }

    const hasBiscuitsToStamp = state.biscuitsToStampCount > 0;
    const hasBiscuitsToBake = state.biscuitsToBakeCount > 0,
        shouldShowBiscuitInOven = state.biscuitsToBakeCount > 0 || state.biscuitsBakingInProgressCount > 0;
    const shouldExtruderUsePulse = state.pulsesCount > 0 && !hasBiscuitsToStamp,
        shouldExtruderShowBiscuit = shouldExtruderUsePulse || state.pulsesInUseByExtruder > 0;
    const shouldStamperUsePulse = state.pulsesCount > 0 && hasBiscuitsToStamp,
        shouldStamperShowBiscuit = shouldStamperUsePulse || state.pulsesInUseByStamper > 0;
    
    return (
        <div className='container'>
            <h1>BISCUIT MACHINE</h1>
            <div>
                <Extruder 
                    onPulseUsed={() => dispatch({type: actionTypes.usePulseByExtruder})} 
                    shouldUsePulse={shouldExtruderUsePulse}
                    shouldShowBiscuit = {shouldExtruderShowBiscuit}
                    onMarkPulseInUse={() => dispatch({type: actionTypes.markPulseInUseByExtruder})} 
                />
                <Stamper 
                    onPulseUsed={() => dispatch({type: actionTypes.usePulseByStamper})}
                    shouldUsePulse={shouldStamperUsePulse}
                    shouldShowBiscuit = {shouldStamperShowBiscuit}
                    onMarkPulseInUse={() => dispatch({type: actionTypes.markPulseInUseByStamper})} 
                />
                <Oven 
                    isOn={state.isOvenOn} 
                    onStartBaking={() => dispatch({type: actionTypes.startBaking})}
                    hasBiscuitsToBake={hasBiscuitsToBake}
                    shouldShowBiscuitInOven={shouldShowBiscuitInOven}
                    onBakeBiscuitInProgress={() => dispatch({type: actionTypes.bakeBiscuitInProgress})}
                    onBakeBiscuitDone={() => dispatch({type: actionTypes.bakeBiscuitDone})}
                />
            </div>
            <Conveyor isOn={state.isConveyorOn}/>
            <div>
                <div className='left'>
                    <Motor 
                        isOn={state.isMotorOn} 
                        onSendPulse={() => dispatch({type: actionTypes.releaseMotorPulses})}
                    />
                </div>
                <div className='right'>
                    <Switch onSwitchClick={handleSwitchClick} switchState={state.switchState}/>
                </div>
            </div>
            <div className='stats'>
                <h2>Stats</h2>
                <div>Total pulses released: {state.totalPulsesReleased}</div>
                <div>Pulses in use by extruder: {state.pulsesInUseByExtruder}</div>
                <div>Pulses in use by stamper: {state.pulsesInUseByStamper}</div>
                <div>Pulses free: {state.pulsesCount}</div>
                <div>Biscuits to stamp: {state.biscuitsToStampCount}</div>
                <div>Biscuits to bake: {state.biscuitsToBakeCount}</div>
                <div>Biscuits baking in progress: {state.biscuitsBakingInProgressCount}</div>
                <div>Biscuits baked: {state.biscuitsBakedCount}</div>
            </div>
            <div className='biscuits-container'>
                <h2>Bucket with Biscuits</h2>
                <ul className='biscuits-list'>{bakedBiscuits}</ul>
            </div>
        </div>
    )
}