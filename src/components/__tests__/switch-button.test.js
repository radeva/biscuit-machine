import React from 'react';
import SwitchButton from '../switch-button';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('Switch button', () => {
  it('should render button correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<SwitchButton name="ON" onClick={handleClick}/>);
    let switchButton = getByText('ON');
    expect(switchButton).toBeInTheDocument('ON');
  });

  it('should render active button correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SwitchButton name="PAUSE" activeButtonName="PAUSE" onClick={handleClick}/>,
    );
    let switchButton = getByText('PAUSE');
    expect(switchButton).toHaveClass('switch-button-active');
  });

  it('should render non-active button correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SwitchButton name="PAUSE" activeButtonName="ON" onClick={handleClick}/>,
    );
    let switchButton = getByText('PAUSE');
    expect(switchButton).not.toHaveClass('switch-button-active');
  });

  it('should handle button click', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SwitchButton name="PAUSE" onClick={handleClick} />,
    );
    let switchButton = getByText('PAUSE');

    fireEvent.click(switchButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
