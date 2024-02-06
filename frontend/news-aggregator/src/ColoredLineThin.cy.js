import React from 'react'
import ColoredLineThin from './ColoredLineThin'

describe('<ColoredLineThin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ColoredLineThin />)
  })
})