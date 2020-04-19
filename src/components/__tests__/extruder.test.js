import React from 'react';
import Extruder from '../extruder';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Extruder', () => {
  it('should render correctly', () => {
    const { container } = render(<Extruder />);

    expect(container).toMatchSnapshot();
  });
});
