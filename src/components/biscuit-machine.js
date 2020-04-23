import React, { useState } from 'react';
import { SWITCH_STATES } from '../constants';
import Switch from './switch';
import Oven from './oven';
import Conveyor from './conveyor';
import Motor from './motor';
import Biscuit from './biscuit';
import Extruder from './extruder';
import Stamper from './stamper';
import BakedBiscuitsList from './baked-biscuits-list';
import BiscuitMachineManager from '../managers/biscuit-machine-manager';

const biscuitMachineManager = new BiscuitMachineManager();

export default function BiscuitMachine() {
  const [, setMachineState] = useState(0b000),
    [switchState, setSwitchState] = useState(SWITCH_STATES.OFF),
    [isOvenReady, setIsOvenReady] = useState(false),
    [bakedBiscuitsCount, setBakedBiscuitsCount] = useState(0);

  const shouldPushNewBiscuit = biscuitMachineManager.shouldPushNewBiscuit();
  const hasBiscuitToStamp = biscuitMachineManager.hasBiscuitToStamp();
  const hasBiscuitToBake = biscuitMachineManager.hasBiscuitToBake();

  const handleSwitchClick = (switchState) => {
    setSwitchState(switchState);
  };

  const handleMotorPulse = () => {
    biscuitMachineManager.updateMachineState(switchState);
    setMachineState(biscuitMachineManager.getMachineState());
    if (biscuitMachineManager.shouldUpdateBakedBiscuitsCount()) {
      setBakedBiscuitsCount(bakedBiscuitsCount + 1);
    }
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
        <Biscuit
          shouldPushNewBiscuit={shouldPushNewBiscuit}
          hasBiscuitToStamp={hasBiscuitToStamp}
          hasBiscuitToBake={hasBiscuitToBake}
          isMachineMovementPaused={isMachineMovementPaused}
        />
        <Extruder />
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
