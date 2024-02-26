import React from 'react';
import { render } from '@testing-library/react';
import Comment from './Comment'

it('renders without crashing', function() {
  render(<Comment />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Comment />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render( <Comment />);
    getByText('Add Comment')
})