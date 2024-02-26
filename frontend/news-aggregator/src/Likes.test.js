import React from 'react';
import { render } from '@testing-library/react';
import Likes from './Likes'

it('renders without crashing', function() {
  render(<Likes />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Likes />);
    expect(asFragment()).toMatchSnapshot();
  });

