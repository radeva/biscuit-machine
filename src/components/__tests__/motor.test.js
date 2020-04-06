import React from 'react';
import Motor, { MOTOR_TIMEOUT } from '../motor';
import { render, cleanup, act } from '@testing-library/react';

afterEach(cleanup);

jest.useFakeTimers();

describe('Motor', () => {
  it('should render correctly when machine is off', () => {
    const handleMotorPulse = jest.fn();

    const { getByTestId } = render(
      <Motor
        isOn={false}
        onSendPulse={handleMotorPulse}
        isMachineMovementPaused={false}
      />,
    );

    const motorContainer = getByTestId('motor-container');
    expect(motorContainer).toBeInTheDocument();
    expect(motorContainer).not.toHaveClass('motor-on');
  });

  it('should render correctly when machine is on', () => {
    const handleMotorPulse = jest.fn();

    const { getByTestId } = render(
      <Motor
        isOn={true}
        onSendPulse={handleMotorPulse}
        isMachineMovementPaused={false}
      />,
    );

    const motorContainer = getByTestId('motor-container');
    expect(motorContainer).toBeInTheDocument();
    expect(motorContainer).toHaveClass('motor-on');
  });

  it('should render correctly when machine is paused', () => {
    const handleMotorPulse = jest.fn();

    const { getByTestId } = render(
      <Motor
        isOn={true}
        onSendPulse={handleMotorPulse}
        isMachineMovementPaused={true}
      />,
    );

    const motorContainer = getByTestId('motor-container');
    expect(motorContainer).toBeInTheDocument();
    expect(motorContainer).toHaveClass('motor-on');
    expect(motorContainer).toHaveClass('animation-paused');
  });

  it('should send pulse on every revolution', () => {
    const handleMotorPulse = jest.fn();

    render(
      <Motor
        isOn={true}
        onSendPulse={handleMotorPulse}
        isMachineMovementPaused={false}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT);
    });
    expect(handleMotorPulse).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(MOTOR_TIMEOUT * 5);
    });
    expect(handleMotorPulse).toHaveBeenCalledTimes(6);
  });
});
