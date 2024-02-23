import React from 'react'
import Forum from './Forum'

describe('<Forum />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Forum />)
  })
})