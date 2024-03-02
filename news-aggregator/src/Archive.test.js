import React from 'react';
import { render } from '@testing-library/react';
import Archive from './Archive'

it('renders without crashing', function() {
  render(<Archive />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Archive />);
    expect(asFragment()).toMatchSnapshot();
  });


test('testing component', ()=> {
    const {getByText} = render( <Archive />);
    getByText('Archive')
})