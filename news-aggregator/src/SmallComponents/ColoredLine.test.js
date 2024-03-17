import React from 'react';
import { render } from '@testing-library/react';
import ColoredLine from './ColoredLine'

it('renders without crashing', function() {
  render(<ColoredLine />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ColoredLine />);
    expect(asFragment()).toMatchSnapshot();
  });

