import { SWITCH_STATES } from '../../components/switch';
import BiscuitMachineManager from '../biscuit-machine-manager';

describe('Biscuit Machine Manager', () => {
  it('should transition state correctly when machine is turned on', () => {
    testState(0b000, SWITCH_STATES.ON, 0b100);
    testState(0b100, SWITCH_STATES.ON, 0b110);
    testState(0b110, SWITCH_STATES.ON, 0b111);
    testState(0b111, SWITCH_STATES.ON, 0b111);
  });

  it('should transition state correctly when machine is turned off', () => {
    testState(0b000, SWITCH_STATES.OFF, 0b000);
    testState(0b100, SWITCH_STATES.OFF, 0b010);
    testState(0b110, SWITCH_STATES.OFF, 0b011);
    testState(0b111, SWITCH_STATES.OFF, 0b011);
    testState(0b011, SWITCH_STATES.OFF, 0b001);
    testState(0b001, SWITCH_STATES.OFF, 0b000);
    testState(0b010, SWITCH_STATES.OFF, 0b001);
  });

  it('should update baked biscuits count', () => {
    testShouldUpdateBiscuitsCount(0b111, true);
    testShouldUpdateBiscuitsCount(0b011, true);
    testShouldUpdateBiscuitsCount(0b001, true);
  });

  it('should not update baked biscuits count', () => {
    testShouldUpdateBiscuitsCount(0b000, false);
    testShouldUpdateBiscuitsCount(0b100, false);
    testShouldUpdateBiscuitsCount(0b110, false);
    testShouldUpdateBiscuitsCount(0b010, false);
  });

  it('should push new biscuit', () => {
    testShouldPushNewBiscuit(0b100, true);
    testShouldPushNewBiscuit(0b110, true);
    testShouldPushNewBiscuit(0b111, true);
  });

  it('should not push new biscuit', () => {
    testShouldPushNewBiscuit(0b000, false);
    testShouldPushNewBiscuit(0b011, false);
    testShouldPushNewBiscuit(0b001, false);
    testShouldPushNewBiscuit(0b010, false);
  });

  it('should have biscuit to stamp', () => {
    testShouldHaveBiscuitToStamp(0b110, true);
    testShouldHaveBiscuitToStamp(0b111, true);
    testShouldHaveBiscuitToStamp(0b010, true);
    testShouldHaveBiscuitToStamp(0b011, true);
  });

  it('should not have biscuit to stamp', () => {
    testShouldHaveBiscuitToStamp(0b000, false);
    testShouldHaveBiscuitToStamp(0b100, false);
    testShouldHaveBiscuitToStamp(0b001, false);
  });

  it('should have biscuit to bake', () => {
    testShouldHaveBiscuitToBake(0b111, true);
    testShouldHaveBiscuitToBake(0b011, true);
    testShouldHaveBiscuitToBake(0b001, true);
  });

  it('should not have biscuit to bake', () => {
    testShouldHaveBiscuitToBake(0b000, false);
    testShouldHaveBiscuitToBake(0b100, false);
    testShouldHaveBiscuitToBake(0b110, false);
    testShouldHaveBiscuitToBake(0b010, false);
  });
});

function testState(initialState, switchState, expectedState) {
  const biscuitMachineManager = new BiscuitMachineManager(initialState);
  biscuitMachineManager.updateMachineState(switchState);

  expect(biscuitMachineManager.machineState).toBe(expectedState);
}

function testShouldUpdateBiscuitsCount(machineState, expectedValue) {
  const biscuitMachineManager = new BiscuitMachineManager(machineState);
  expect(biscuitMachineManager.shouldUpdateBakedBiscuitsCount()).toBe(
    expectedValue,
  );
}

function testShouldPushNewBiscuit(machineState, expectedValue) {
  const biscuitMachineManager = new BiscuitMachineManager(machineState);
  expect(biscuitMachineManager.shouldPushNewBiscuit()).toBe(expectedValue);
}

function testShouldHaveBiscuitToStamp(machineState, expectedValue) {
  const biscuitMachineManager = new BiscuitMachineManager(machineState);
  expect(biscuitMachineManager.hasBiscuitToStamp()).toBe(expectedValue);
}

function testShouldHaveBiscuitToBake(machineState, expectedValue) {
  const biscuitMachineManager = new BiscuitMachineManager(machineState);
  expect(biscuitMachineManager.hasBiscuitToBake()).toBe(expectedValue);
}
