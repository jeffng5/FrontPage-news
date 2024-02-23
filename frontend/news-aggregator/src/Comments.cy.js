import React from 'react'
import Comments from './Comments'

describe('<Comments />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Comments />)
  })
})