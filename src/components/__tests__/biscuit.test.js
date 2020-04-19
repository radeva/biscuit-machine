import React from 'react';
import Biscuit from '../biscuit';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Biscuit Dough', () => {
  it('should render correctly when machine is on', () => {
    const { queryByTestId } = render(
      <Biscuit shouldPushNewBiscuit={true} isMachineMovementPaused={false} />,
    );

    expect(queryByTestId('biscuit-dough-svg')).toBeInTheDocument();
  });

  it('should render correctly when machine is paused', () => {
    const { queryByTestId } = render(
      <Biscuit shouldPushNewBiscuit={true} isMachineMovementPaused={true} />,
    );

    expect(queryByTestId('biscuit-dough-svg')).toBeInTheDocument();
    expect(queryByTestId('biscuit-dough-svg')).toHaveClass('animation-paused');
  });

  it('should render correctly when no buscuit to push', () => {
    const { queryByTestId } = render(
      <Biscuit shouldPushNewBiscuit={false} isMachineMovementPaused={false} />,
    );

    expect(queryByTestId('biscuit-dough-svg')).toBeNull();
  });
});

describe('Biscuit to stamp', () => {
  it('should be rendered correctly when machine is on', () => {
    const { queryByTestId } = render(
      <Biscuit hasBiscuitToStamp={true} isMachineMovementPaused={false} />,
    );

    expect(queryByTestId('raw-biscuit')).toBeInTheDocument();
  });

  it('should have animation stopped when machine is paused', () => {
    const { queryByTestId } = render(
      <Biscuit hasBiscuitToStamp={true} isMachineMovementPaused={true} />,
    );

    expect(queryByTestId('raw-biscuit')).toBeInTheDocument();
    expect(queryByTestId('raw-biscuit')).toHaveClass('animation-paused');
  });

  it('should be rendered correctly when no biscuit to stamp', () => {
    const { queryByTestId } = render(
      <Biscuit hasBiscuitToStamp={false} isMachineMovementPaused={false} />,
    );

    expect(queryByTestId('raw-biscuit')).toBeNull();
  });
});

describe('Biscuit in oven', () => {
  it('should be rendered when corresponding property is true', () => {
    const { getByTestId } = render(<Biscuit hasBiscuitToBake={true} />);

    expect(getByTestId('biscuit-in-oven')).toBeInTheDocument();
  });

  it('should not be rendered when corresponding property is false', () => {
    const { queryByTestId } = render(<Biscuit hasBiscuitToBake={false} />);

    expect(queryByTestId('biscuit-in-oven')).toBeNull();
  });

  it('should pause animation when machine is paused', () => {
    const { getByTestId } = render(
      <Biscuit hasBiscuitToBake={true} isMachineMovementPaused={true} />,
    );

    expect(getByTestId('biscuit-in-oven')).toHaveClass('animation-paused');
  });
});
