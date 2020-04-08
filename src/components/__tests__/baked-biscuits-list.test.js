import React from 'react';
import BakedBiscuitsList from '../baked-biscuits-list';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Baked Biscuits List', () => {
    it('should not show biscuits when count is zero', () => {
        const { getByTestId } = render(
            <BakedBiscuitsList
              bakedBiscuitsCount={0}
            />
          );
      
          const bakedBiscuitsList = getByTestId('biscuits-list');;
          expect(bakedBiscuitsList.children.length).toBe(0);
    });

    it('should show correct amount of biscuits', () => {
        const biscuitsCount = 5;
        const { getByTestId } = render(
            <BakedBiscuitsList
              bakedBiscuitsCount={biscuitsCount}
            />
          );
      
          const bakedBiscuitsList = getByTestId('biscuits-list');;
          expect(bakedBiscuitsList.children.length).toBe(biscuitsCount);
    });

    it('should be rendered correctly', () => {
        const biscuitsCount = 5;
        const { container } = render(<BakedBiscuitsList bakedBiscuitsCount={biscuitsCount} />);
        expect(container).toMatchSnapshot();
    });
});