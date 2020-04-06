import React from 'react';
import Oven, {
  INITIAL_TEMPERATURE,
  HEAT_OVEN_STEP,
  HEAT_OVEN_INTERVAL_IN_MSECONDS,
  WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS,
} from '../oven';
import { SWITCH_STATES } from '../switch';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

jest.useFakeTimers();

describe('Oven when machine is off', () => {
  it('should show initial temperature and light off', () => {
    const handleOvenReady = jest.fn();

    const { getByTestId } = render(
      <Oven
        switchState={SWITCH_STATES.OFF}
        handleOvenReady={handleOvenReady}
      />,
    );

    const initialTemperatureRegExp = new RegExp('^' + INITIAL_TEMPERATURE);
    expect(getByTestId('oven-temperature')).toHaveTextContent(
      initialTemperatureRegExp,
    );
    expect(getByTestId('oven-light')).toHaveClass('oven-light');
    expect(getByTestId('oven-light')).not.toHaveClass('oven-light-on');
  });

  it('should show correct temperature while cooling down from less than 220C', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10); // go up to 60 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.OFF}
          handleOvenReady={handleOvenReady}
        />,
      );
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 5); // should go down to 50 C
    });

    expect(getByTestId('oven-temperature')).toHaveTextContent(50);
  });

  it('should show correct temperature while cooling down from more than 220C', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // start warming up to 230
      rerender(
        <Oven
          switchState={SWITCH_STATES.OFF}
          handleOvenReady={handleOvenReady}
        />,
      );
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 2); // should go down to 226 C
    });

    expect(getByTestId('oven-temperature')).toHaveTextContent(226);
  });
});

describe('Oven when machine is on', () => {
  it('should show correct temperature while warming up and before 220C is reached', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    // light is switched ON
    expect(getByTestId('oven-light')).toHaveClass('oven-light-on');

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10);
    });

    const newTemperatureRegExp = new RegExp(
      INITIAL_TEMPERATURE + HEAT_OVEN_STEP * 10,
    );
    expect(getByTestId('oven-temperature')).toHaveTextContent(
      newTemperatureRegExp,
    );
  });
});

it('should show correct temperature while warming up and after 220C is reached', () => {
  const handleOvenReady = jest.fn();
  const { getByTestId } = render(
    <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
  );

  act(() => {
    jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
    jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // start warming up
  });

  expect(getByTestId('oven-temperature')).toHaveTextContent(230);

  act(() => {
    jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // go up to 240
    jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS); // start cooling down
  });

  expect(getByTestId('oven-temperature')).toHaveTextContent(238);
});

describe('Oven when machine is paused', () => {
  it('should continue warming up when oven has not reached 220C', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 5); // go up to 110 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.PAUSE}
          handleOvenReady={handleOvenReady}
        />,
      );
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 4); // should go up to 220 C
    });

    expect(getByTestId('oven-temperature')).toHaveTextContent(220);
  });
});

describe('Biscuit in oven', () => {
  it('should be rendered when corresponding property is true', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId } = render(
      <Oven
        switchState={SWITCH_STATES.ON}
        handleOvenReady={handleOvenReady}
        hasBiscuitToBake={true}
      />,
    );

    expect(getByTestId('biscuit-in-oven')).toBeInTheDocument();
  });

  it('should not be rendered when corresponding property is false', () => {
    const handleOvenReady = jest.fn();
    const { queryByTestId } = render(
      <Oven
        switchState={SWITCH_STATES.ON}
        handleOvenReady={handleOvenReady}
        hasBiscuitToBake={false}
      />,
    );

    expect(queryByTestId('biscuit-in-oven')).toBeNull();
  });

  it('should pause animation when machine is paused', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven
        switchState={SWITCH_STATES.ON}
        handleOvenReady={handleOvenReady}
        hasBiscuitToBake={false}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // go up to 230 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.ON}
          handleOvenReady={handleOvenReady}
          hasBiscuitToBake={true}
        />,
      );
    });

    expect(getByTestId('biscuit-in-oven')).not.toHaveClass('animation-paused');

    act(() => {
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS); // go up to 232 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.PAUSE}
          handleOvenReady={handleOvenReady}
          hasBiscuitToBake={true}
        />,
      );
    });

    expect(getByTestId('biscuit-in-oven')).toHaveClass('animation-paused');
  });
});

describe('Oven when the machine is turned off', () => {
  it('should not be turned off while there are still biscuits on the conveyor', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // go up to 230 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.OFF}
          handleOvenReady={handleOvenReady}
          hasBiscuitOnConveyor={true}
        />,
      );
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 2);
    });

    const compareToTemperatureRegExp = new RegExp('^234');
    expect(getByTestId('oven-temperature')).toHaveTextContent(
      compareToTemperatureRegExp,
    );
  });

  it('should be turned off considering there are not biscuits on the conveyor', () => {
    const handleOvenReady = jest.fn();
    const { getByTestId, rerender } = render(
      <Oven switchState={SWITCH_STATES.ON} handleOvenReady={handleOvenReady} />,
    );

    act(() => {
      jest.advanceTimersByTime(HEAT_OVEN_INTERVAL_IN_MSECONDS * 10 * 9); // go up to 220 C
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 5); // go up to 230 C
      rerender(
        <Oven
          switchState={SWITCH_STATES.OFF}
          handleOvenReady={handleOvenReady}
          hasBiscuitOnConveyor={false}
        />,
      );
      jest.advanceTimersByTime(WARMUP_COOLDOWN_OVEN_INTERVAL_IN_MSECONDS * 2);
    });

    let compareToTemperatureRegExp = new RegExp('^226');
    expect(getByTestId('oven-temperature')).toHaveTextContent(
      compareToTemperatureRegExp,
    );
  });
});
