import React from 'react';
import Stamper from '../stamper';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Stamper', () => {
  it('should be rendered correctly when machine is off', () => {
    const { queryByTestId, container } = render(
      <Stamper
        hasBiscuitToStamp={false}
        isMachineMovementOn={false}
        isMachineMovementPaused={false}
      />,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('raw-biscuit')).not.toBeInTheDocument();
  });

  it('should be rendered correctly when machine is on', () => {
    const { getByTestId } = render(
      <Stamper
        hasBiscuitToStamp={false}
        isMachineMovementOn={true}
        isMachineMovementPaused={false}
      />,
    );

    expect(getByTestId('stamper-pusher')).toHaveClass('stamper-pusher-on');
  });

  it('should be rendered correctly when machine is paused', () => {
    const { getByTestId } = render(
      <Stamper
        hasBiscuitToStamp={false}
        isMachineMovementOn={false}
        isMachineMovementPaused={true}
      />,
    );

    expect(getByTestId('stamper-pusher')).toHaveClass('stamper-pusher-on');
    expect(getByTestId('stamper-pusher')).toHaveClass('animation-paused');
  });
});

describe('Biscuit dough', () => {
  it('should be rendered correctly when machine is on', () => {
    const { queryByTestId } = render(
      <Stamper
        hasBiscuitToStamp={true}
        isMachineMovementOn={true}
        isMachineMovementPaused={false}
      />,
    );

    expect(queryByTestId('raw-biscuit')).toBeInTheDocument();
  });

  it('should have animation stopped when machine is paused', () => {
    const { queryByTestId } = render(
      <Stamper
        hasBiscuitToStamp={true}
        isMachineMovementOn={false}
        isMachineMovementPaused={true}
      />,
    );

    expect(queryByTestId('raw-biscuit')).toBeInTheDocument();
    expect(queryByTestId('raw-biscuit')).toHaveClass('animation-paused');
  });
});
