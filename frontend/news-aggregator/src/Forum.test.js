import React from 'react';
import { render } from '@testing-library/react';
import Forum from './Forum'

it('renders without crashing', function() {
  render(<Forum />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Forum />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render(<Forum />);
    getByText('Welcome to the News Forum')
})