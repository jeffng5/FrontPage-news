import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonForum from './ButtonForum'

it('renders without crashing', function() {
  render(<ButtonForum />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ButtonForum />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render( <ButtonForum />);
    getByText('Post to Forum')
})
