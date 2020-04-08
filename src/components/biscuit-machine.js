import React, { useState } from 'react';
import Switch, { SWITCH_STATES } from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Extruder from './extruder';
import Stamper from './stamper';
import BakedBiscuitsList from './baked-biscuits-list'


// shouldPushNewBiscuit, hasBiscuitToStamp, hasBiscuitToBake
const initialState = 0b000;

export default function BiscuitMachine() {
  const [machineState, setMachineState] = useState(initialState),
    [switchState, setSwitchState] = useState(SWITCH_STATES.OFF),
    [isOvenReady, setIsOvenReady] = useState(false),
    [bakedBiscuitsCount, setBakedBiscuitsCount] = useState(0);

  const shouldPushNewBiscuit = (machineState & 0b100) > 0,
    hasBiscuitToStamp = (machineState & 0b010) > 0,
    hasBiscuitToBake = (machineState & 0b001) > 0;

  const handleSwitchClick = (switchState) => {
    setSwitchState(switchState);
  };

  const handleMotorPulse = () => {
    let nextState = machineState;
    switch (machineState) {
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
        setBakedBiscuitsCount(bakedBiscuitsCount + 1);
        if (switchState === SWITCH_STATES.OFF) {
          nextState = 0b011;
        }
        break;
      case 0b011:
        setBakedBiscuitsCount(bakedBiscuitsCount + 1);
        nextState = 0b001; // switch OFF
        break;
      case 0b001:
        setBakedBiscuitsCount(bakedBiscuitsCount + 1);
        nextState = 0b000; // switch OFF
        break;
      case 0b010:
        nextState = 0b001; // switch OFF, but there are biscuits on the conveyor
        break;
      default:
        console.error('Unexpected state: ' + machineState);
        break;
    }

    setMachineState(nextState);
  };

  const handleOvenReady = (isReady) => {
    setIsOvenReady(isReady);
  };

  let hasBiscuitOnConveyor =
    shouldPushNewBiscuit || hasBiscuitToStamp || hasBiscuitToBake;

  const isMachineMovementOn =
    (switchState === SWITCH_STATES.ON && isOvenReady) ||
    (switchState === SWITCH_STATES.OFF && hasBiscuitOnConveyor);

  const isMachineMovementPaused = switchState === SWITCH_STATES.PAUSE;

  return (
    <div className="container">
      <h1>BISCUIT MACHINE</h1>
      <div>
        <Extruder
          shouldPushNewBiscuit={shouldPushNewBiscuit}
          isMachineMovementPaused={isMachineMovementPaused}
        />
        <Stamper
          hasBiscuitToStamp={hasBiscuitToStamp}
          isMachineMovementOn={isMachineMovementOn}
          isMachineMovementPaused={isMachineMovementPaused}
        />
        <Oven
          switchState={switchState}
          hasBiscuitOnConveyor={hasBiscuitOnConveyor}
          hasBiscuitToBake={hasBiscuitToBake}
          handleOvenReady={handleOvenReady}
        />
      </div>
      <Conveyor isOn={isMachineMovementOn} />
      <div>
        <div className="left">
          <Motor
            isOn={isMachineMovementOn}
            onSendPulse={handleMotorPulse}
            isMachineMovementPaused={isMachineMovementPaused}
          />
        </div>
        <div className="right">
          <Switch 
            onSwitchClick={handleSwitchClick} 
            switchState={switchState} 
            isOvenReady={isOvenReady}
          />
        </div>
      </div>
      <div className="biscuits-container">
        <h2>Bucket with Biscuits ({bakedBiscuitsCount})</h2>
        <BakedBiscuitsList bakedBiscuitsCount={bakedBiscuitsCount} />
      </div>
    </div>
  );
}