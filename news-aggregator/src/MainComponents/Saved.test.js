import React from 'react';
import { render } from '@testing-library/react';
import Saved from './Saved'

it('renders without crashing', function() {
  render(<Saved />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Saved />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render(<Saved />);
    getByText('YOUR ARCHIVE PAGE')
})