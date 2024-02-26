import React from 'react';
import { render } from '@testing-library/react';
import ArchiveArticleCard from './ArchiveArticleCard'

it('renders without crashing', function() {
  render(<ArchiveArticleCard />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<ArchiveArticleCard />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('testing component', ()=> {
    const {getByText} = render( <ArchiveArticleCard />);
    getByText('Title:')
})