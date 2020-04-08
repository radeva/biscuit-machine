import React from 'react';
import BiscuitMachine from '../biscuit-machine';
import { HEAT_OVEN_INTERVAL_IN_MSECONDS } from '../oven';
import { MOTOR_TIMEOUT } from '../motor';
import { render, cleanup, fireEvent, act } from '@testing-library/react';

afterEach(cleanup);

jest.useFakeTimers();

let biscuitDough, rawBiscuit, biscuitInOven;
describe('Biscuit Machine', () => {
  it('should transition machine state correctly when turned on and off', () => {
    const { getByText, queryByTestId } = render(<BiscuitMachine />);

    const buttonOn = getByText('ON');
    fireEvent.click(buttonOn);

    // validate 100
    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeNull();

    // validate 110
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeNull();

    // validate 111
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeInTheDocument();

    // validate bakedBiscuits count, still 111
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeInTheDocument();

    // validate 011
    act(() => {
      const buttonOff = getByText('OFF');
      fireEvent.click(buttonOff);
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeInTheDocument();

    // validate 001
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeInTheDocument();

    // validate 000
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeNull();
  });

  it('should transition machine state correctly when turned off and just one biscuit preparation has started', () => {
    const { getByText, queryByTestId } = render(<BiscuitMachine />);

    const buttonOn = getByText('ON');
    fireEvent.click(buttonOn);

    // validate 100
    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeNull();

    // validate 010
    act(() => {
      const buttonOn = getByText('OFF');
      fireEvent.click(buttonOn);
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeNull();

    // validate 001
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeInTheDocument();

    // validate 000
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeNull();
    expect(rawBiscuit).toBeNull();
    expect(biscuitInOven).toBeNull();
  });

  it('should keep machine state as it is when paused', () => {
    const { getByText, queryByTestId } = render(<BiscuitMachine />);

    const buttonOn = getByText('ON');
    fireEvent.click(buttonOn);

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(MOTOR_TIMEOUT * 2); // move to 110
    });

    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeNull();

    const buttonPause = getByText('PAUSE');
    fireEvent.click(buttonPause);

    // validate 011
    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    // check that state doesn't change
    [biscuitDough, rawBiscuit, biscuitInOven] = getBiscuitElements(
      queryByTestId,
    );
    expect(biscuitDough).toBeInTheDocument();
    expect(rawBiscuit).toBeInTheDocument();
    expect(biscuitInOven).toBeNull();
  });
});

function getBiscuitElements(queryByTestId) {
  let biscuitDough = queryByTestId('biscuit-dough-svg');
  let rawBiscuit = queryByTestId('raw-biscuit');
  let biscuitInOven = queryByTestId('biscuit-in-oven');

  return [biscuitDough, rawBiscuit, biscuitInOven];
}
