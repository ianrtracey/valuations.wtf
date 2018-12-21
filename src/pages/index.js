import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/layout'

const BILLIONS = 1000000000

export default ({ data }) => {
  const companies = data.allCompany.edges.map((company) => ({
    name: company.node.fields.name,
    valuation: company.node.fields.valuation,
    logoUrl: `https://${company.node.fields.logoUrl}`,
    country: company.node.fields.country
  }))
  companies.sort((a,b) => b.valuation- a.valuation)

  return (
    <Layout>
    <h1 className="f-title">🦄 valuations.wtf</h1>
    <p className="measure f-copy f4">This site tracks the ever-changing valuations of some of the hottest startups in the world.</p>
    <div>
    {companies.map((company) => (
      <div>
        <div className="flex items-center">
          <img
            src={company.logoUrl}
            className="br-100 h2 w2 dib mr2" alt="avatar"
          />
          <h2>{company.name}</h2>
          <span className="ml2 black-80 fw4 f4 sans-serif">${company.valuation / BILLIONS}<span className="f5">B</span> {company.country}</span>
        </div>
      </div>
      )
    )}  
  </div>
  </Layout>
  )
}

export const query = graphql`
query {
    allCompany {
        edges {
        node {
        fields {
            name
            valuation
            logoUrl
            country
        }
      }
    }
  }
}
`