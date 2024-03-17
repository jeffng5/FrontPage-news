import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from './ArticleCard'

it('renders without crashing', function() {
  render(<ArticleCard />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ArticleCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('testing component', ()=> {
    const {getByText} = render( <ArticleCard />);
    getByText('by:')
})