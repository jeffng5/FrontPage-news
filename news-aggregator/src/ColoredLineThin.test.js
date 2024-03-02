import React from 'react';
import { render } from '@testing-library/react';
import ColoredLineThin from './ColoredLineThin'

it('renders without crashing', function() {
  render(<ColoredLineThin />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ColoredLineThin />);
    expect(asFragment()).toMatchSnapshot();
  });