import React from 'react'
import Button from './Button'

describe('<FrontPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button />)
  })
})