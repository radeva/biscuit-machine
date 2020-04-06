import React from 'react';
import Conveyor from '../conveyor';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Conveyor', () => {
  it('should render correctly when off', () => {
    const { container } = render(<Conveyor isOn={false} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly when on', () => {
    const { container } = render(<Conveyor isOn={true} />);

    expect(container).toMatchSnapshot();
  });
});
