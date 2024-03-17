import React from 'react';
import { render } from '@testing-library/react';
import ForumArticleCard from './ForumArticleCard'

it('renders without crashing', function() {
  render(<ForumArticleCard />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ForumArticleCard />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render( <ForumArticleCard />);
    getByText('Author:')
})