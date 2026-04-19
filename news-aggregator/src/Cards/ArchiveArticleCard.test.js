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

  test('renders title as link when url is set', () => {
    const { getByRole } = render(
      <ArchiveArticleCard
        title="Sample headline"
        url="https://example.com/article"
        description="A short summary."
        author="Pat"
      />
    );
    const link = getByRole('link', { name: /Sample headline/i });
    expect(link).toHaveAttribute('href', 'https://example.com/article');
  });