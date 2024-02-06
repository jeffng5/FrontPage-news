import React from 'react'
import ColoredLine from './ColoredLine'

describe('<ColoredLine />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ColoredLine />)
  })
})