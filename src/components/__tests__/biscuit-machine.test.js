import React from 'react';
import BiscuitMachine from '../biscuit-machine';
import { HEAT_OVEN_INTERVAL_IN_MSECONDS } from '../oven';
import { MOTOR_TIMEOUT } from '../motor';
import { render, cleanup, fireEvent, act } from '@testing-library/react';

afterEach(cleanup);

jest.useFakeTimers();

describe('Biscuit Machine', () => {

  it('should keep machine state as it is when paused', () => {
    const { getByText, container } = render(<BiscuitMachine />);

    const buttonOn = getByText('ON');
    fireEvent.click(buttonOn);

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(MOTOR_TIMEOUT * 2); // move to 110
    });

    expect(container).toMatchSnapshot();

    const buttonPause = getByText('PAUSE');
    fireEvent.click(buttonPause);

    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });

    // check that state doesn't change
    expect(container).toMatchSnapshot();
  });
});
