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
    <div className="pt2 pb4">
      <h2>Number of Startups Worth $1B+</h2>
      <p className="mb"><span className="fw7">2015</span> 🦄🦄🦄🦄<span className="f4 b">82</span></p>
      <p className="mb"><span className="fw7">2016</span> 🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄<span className="f4 b">208</span></p>
      <p className="mb"><span className="fw7">2017</span> 🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄<span className="f4 b">224</span></p>
      <p className="mb"><span className="fw7">2018</span> 🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄🦄<span className="f4 b">266</span></p>

    </div>
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
  <div>
  <p className="pt3 black-60 pl2">Made with ❤️ by <a className="link dim" href="https://twitter.com/@ianrtracey">@ianrtracey</a></p>
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