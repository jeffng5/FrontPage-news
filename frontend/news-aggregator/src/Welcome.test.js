import React from 'react';
import { render } from '@testing-library/react';
import Welcome from './Welcome'

it('renders without crashing', function() {
  render(<Welcome />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Welcome />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render(<Welcome />);
    getByText('YourFrontPageNews.com')
})
