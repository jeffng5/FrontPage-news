import React from 'react';
import { render } from '@testing-library/react';
import Preferences from './Preferences'

it('renders without crashing', function() {
  render(<Preferences />);
})

//snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Preferences />);
    expect(asFragment()).toMatchSnapshot();
  });

test('testing component', ()=> {
    const {getByText} = render(<Preferences />);
    getByText('Preferences')
})

test('save preference', ()=> {
    const { getByText } = render(<Preferences/>);
    const heading = getByText('Save Preferences')
    expect(heading).toHaveClass('preferences')
    fireEvent.click(getByText('Save Preferences'))
    expect(heading).toBeInTheDocument();
})

test('see FrontPageNews', ()=> {
    const { getByText } = render(<Preferences/>);
    const heading = getByText('See Front Page News')
    expect(heading).toHaveClass('button-preferences')
    fireEvent.click(getByText('See Front Page News'))
    expect(heading).toBeInTheDocument();
})