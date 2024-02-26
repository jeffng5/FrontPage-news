import React from 'react';
import { render } from '@testing-library/react';
import CommentCard from './CommentCard'

it('renders without crashing', function() {
  render(<CommentCard />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<CommentCard />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render( <CommentCard />);
    getByText('on')
})