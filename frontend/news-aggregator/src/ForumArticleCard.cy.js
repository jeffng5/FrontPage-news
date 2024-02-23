import React from 'react'
import ForumArticleCard from './ForumArticleCard'

describe('<ForumArticleCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ForumArticleCard />)
  })
})