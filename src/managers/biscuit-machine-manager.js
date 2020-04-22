import { SWITCH_STATES } from '../components/switch';

export default class BiscuitMachineManager {
  constructor(state) {
    this.machineState = state ?? 0b000;
  }

  getMachineState() {
    return this.machineState;
  }

  updateMachineState(switchState) {
    let nextState = this.machineState;
    switch (this.machineState) {
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
        if (switchState === SWITCH_STATES.OFF) {
          nextState = 0b011;
        }
        break;
      case 0b011:
        nextState = 0b001; // switch OFF
        break;
      case 0b001:
        nextState = 0b000; // switch OFF
        break;
      case 0b010:
        nextState = 0b001; // switch OFF, but there are biscuits on the conveyor
        break;
      default:
        console.error('Unexpected state: ' + this.machineState);
        break;
    }

    this.machineState = nextState;
  }

  shouldUpdateBakedBiscuitsCount() {
    return [0b111, 0b011, 0b001].includes(this.machineState);
  }

  shouldPushNewBiscuit() {
    return (this.machineState & 0b100) > 0;
  }

  hasBiscuitToStamp() {
    return (this.machineState & 0b010) > 0;
  }

  hasBiscuitToBake() {
    return (this.machineState & 0b001) > 0;
  }
}
