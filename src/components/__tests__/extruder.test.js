import React from 'react';
import Extruder from '../extruder';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders extruder correctly', () => {
  const { queryByTestId, container } = render(
    <Extruder shouldPushNewBiscuit={false} isMachineMovementPaused={false} />,
  );

  expect(container).toMatchSnapshot();
  expect(queryByTestId('biscuit-dough-svg')).not.toBeInTheDocument();
});

it('renders biscuit correctly', () => {
  const { queryByTestId } = render(
    <Extruder shouldPushNewBiscuit={true} isMachineMovementPaused={false} />,
  );

  expect(queryByTestId('biscuit-dough-svg')).toBeInTheDocument();
});

it('renders biscuit correctly when machine is paused', () => {
  const { queryByTestId } = render(
    <Extruder shouldPushNewBiscuit={true} isMachineMovementPaused={true} />,
  );

  expect(queryByTestId('biscuit-dough-svg')).toBeInTheDocument();
  expect(queryByTestId('biscuit-dough-svg')).toHaveClass('animation-paused');
});
