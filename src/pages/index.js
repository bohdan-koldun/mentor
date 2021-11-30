import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const mentors = data.allContentfulMentor.edges.map(({ node }) => node)

  return (
    <Layout>
      <Seo title="Ментор" />
      <h1>Ментор</h1>
      <p style={{ display: "flex", flexDirection: "column" }}>
        {mentors.map(mentor => {
          return (
            <Link to="/" key={mentor.fullName}>
              <GatsbyImage image={getImage(mentor.thumbnail)} />
              {mentor.fullName}
              <GatsbyImage image={getImage(mentor.teenager?.thumbnail)} />
              {mentor.teenager?.fullName}
            </Link>
          )
        })}
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulMentor(sort: { fields: [fullName], order: [ASC] }) {
      edges {
        node {
          fullName
          thumbnail {
            gatsbyImageData(layout: CONSTRAINED, width: 186)
          }
          teenager {
            fullName
            thumbnail {
              gatsbyImageData(layout: CONSTRAINED, width: 186)
            }
          }
        }
      }
    }
  }
`

export default IndexPage
