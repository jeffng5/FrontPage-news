import React from 'react'
import ButtonForum from './ButtonForum'

describe('<ButtonForum />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ButtonForum />)
  })
})