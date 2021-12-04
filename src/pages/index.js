import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import { Card } from "antd"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const gridStyle = {
  width: "50%",
  textAlign: "center",
}

const IndexPage = ({ data, location }) => {
  const mentors = data.allContentfulMentor.edges.map(({ node }) => node)

  return (
    <Layout location={location}>
      <Seo title="Ментор" />
      <p style={{ display: "flex", flexDirection: "column" }}>
        {mentors.map(mentor => {
          const nameSlug = slug(mentor.fullName)

          console.log(getImage(mentor.teenager?.thumbnail))
          return (
            <Link to={`/${nameSlug}`} key={nameSlug}>
              <Card style={{ marginBottom: "16px" }}>
                <Card.Grid style={gridStyle}>
                  <GatsbyImage image={getImage(mentor.thumbnail)} />
                  <p>{mentor.fullName}</p>
                </Card.Grid>
                <Card.Grid style={gridStyle} title="Card title">
                  <GatsbyImage image={getImage(mentor.teenager?.thumbnail)} />
                  <p>{mentor.teenager?.fullName}</p>
                </Card.Grid>
              </Card>
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
