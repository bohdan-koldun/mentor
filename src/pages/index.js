import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => {
  const mentors = data.allContentfulMentor.edges.map(({ node }) => node)

  return (
    <Layout>
      <Seo title="Ментор" />
      <p style={{ display: "flex", flexDirection: "column" }}>
        {mentors.map(mentor => {
          const nameSlug = slug(mentor.fullName)
          return (
            <Link to={`/${nameSlug}`} key={nameSlug}>
              <br />
              <GatsbyImage image={getImage(mentor.thumbnail)} />
              {mentor.fullName}
              <GatsbyImage image={getImage(mentor.teenager?.thumbnail)} />
              {mentor.teenager?.fullName}
              <br />
              <br />
              <hr />
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
            gatsbyImageData(layout: CONSTRAINED, width: 186, height: 186)
          }
          teenager {
            fullName
            thumbnail {
              gatsbyImageData(layout: CONSTRAINED, width: 186, height: 186)
            }
          }
        }
      }
    }
  }
`

export default IndexPage
