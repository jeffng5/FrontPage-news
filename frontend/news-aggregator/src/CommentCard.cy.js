import React from 'react'
import CommentCard from './CommentCard'

describe('<CommentCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CommentCard />)
  })
})