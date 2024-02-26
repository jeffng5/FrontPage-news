import React from 'react';
import { render } from '@testing-library/react';
import Comments from './Comments'

it('renders without crashing', function() {
  render(<Comments />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Comments />);
    expect(asFragment()).toMatchSnapshot();
  });

