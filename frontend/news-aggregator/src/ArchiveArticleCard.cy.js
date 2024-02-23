import React from 'react'
import ArchiveArticleCard from './ArchiveArticleCard'

describe('<ArchiveArticleCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ArchiveArticleCard />)
  })
})