import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FrontPage from './FrontPage'

it('renders without crashing', function() {
  render(<FrontPage />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<FrontPage />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render( <FrontPage />);
    getByText('Preferences')
})

test('renders ArticleCard', () => {
    const heading = getByText('by:')
    expect(heading).toHaveClass('author-2')
})