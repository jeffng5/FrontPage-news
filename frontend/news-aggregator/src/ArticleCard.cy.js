import React from 'react'
import ArticleCard from './ArticleCard'

describe('<ArticleCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ArticleCard />)
  })
})