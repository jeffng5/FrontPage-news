import React from 'react'
import Saved from './Saved'

describe('<Saved />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Saved />)
  })
})