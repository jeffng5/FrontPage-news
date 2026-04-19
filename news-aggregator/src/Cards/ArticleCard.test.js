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
    getByText(/by:/i)
})

test("byline uses article-card__byline for layout", () => {
  const { getByText } = render(
    <ArticleCard
      title="T"
      url="https://example.com"
      description="D"
      author="Ann"
      urlToImage=""
    />
  );
  expect(getByText(/by:/)).toHaveClass("article-card__byline");
});