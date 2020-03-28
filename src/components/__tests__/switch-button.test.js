import React from 'react';
import ReactDOM from 'react-dom';
import SwitchButton from '../switch-button';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

it("renders button text correctly", () => {
    const {getByText} = render(<SwitchButton name="ON" />);
    let switchButton = getByText("ON");
    expect(switchButton).toBeInTheDocument("ON");
});

it("renders button active style correctly", () => {
    const {getByText} = render(<SwitchButton name="PAUSE" activeButtonName="PAUSE" />);
    let switchButton = getByText("PAUSE");
    expect(switchButton).toHaveClass("switch-button-active");
});

it("renders button non-active style correctly", () => {
    const {getByText} = render(<SwitchButton name="PAUSE" activeButtonName="ON" />);
    let switchButton = getByText("PAUSE");
    expect(switchButton).not.toHaveClass("switch-button-active");
});

it("handles button click", () => {
    const handleClick = jest.fn();
    const {getByText} = render(<SwitchButton name="PAUSE" onClick={handleClick}/>);
    let switchButton = getByText("PAUSE");

    fireEvent.click(switchButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
});

