import React from 'react';
import Switch, { SWITCH_STATES } from '../switch';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('Switch', () => {
  it('should render its buttons correctly', () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Switch switchState={SWITCH_STATES.OFF} onSwitchClick={handleClick} />,
    );

    expect(getByText('ON')).toBeInTheDocument();
    expect(getByText('PAUSE')).toBeInTheDocument();

    const buttonOff = getByText('OFF');
    expect(buttonOff).toBeInTheDocument();
    expect(buttonOff).toHaveClass('switch-button-active');
  });

  it('should handle button click correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Switch switchState={SWITCH_STATES.OFF} onSwitchClick={handleClick} />,
    );
    fireEvent.click(getByText('ON'));

    expect(handleClick).toHaveBeenCalledWith('ON');
  });

  it("should disable 'pause' button when turned off", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Switch switchState={SWITCH_STATES.OFF} onSwitchClick={handleClick} />,
    );

    const buttonPause = getByText('PAUSE');
    expect(buttonPause).toBeInTheDocument();
    expect(buttonPause).toHaveAttribute('disabled');
  });
});
