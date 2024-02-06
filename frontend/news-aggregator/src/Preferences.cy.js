import React from 'react'
import Preferences from './Preferences'

describe('<Preferences />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Preferences />)
  })
})