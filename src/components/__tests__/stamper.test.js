import React from 'react';
import Stamper from '../stamper';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Stamper', () => {
  it('should be rendered correctly when machine is off', () => {
    const { container } = render(
      <Stamper isMachineMovementOn={false} isMachineMovementPaused={false} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should be rendered correctly when machine is on', () => {
    const { getByTestId } = render(
      <Stamper isMachineMovementOn={true} isMachineMovementPaused={false} />,
    );

    expect(getByTestId('stamper-pusher')).toHaveClass('stamper-pusher-on');
  });

  it('should be rendered correctly when machine is paused', () => {
    const { getByTestId } = render(
      <Stamper isMachineMovementOn={false} isMachineMovementPaused={true} />,
    );

    expect(getByTestId('stamper-pusher')).toHaveClass('stamper-pusher-on');
    expect(getByTestId('stamper-pusher')).toHaveClass('animation-paused');
  });
});
