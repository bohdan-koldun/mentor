import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Mentor = ({ data }) => {
  const mentor = data.contentfulMentor
  const teenager = mentor.teenager

  return (
    <Layout>
      <Seo title="Ментор" />
      <h1>
        {mentor.fullName} {teenager.fullName}
      </h1>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export const query = graphql`
  query ($fullName: String!) {
    contentfulMentor(fullName: { eq: $fullName }) {
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
`

export default Mentor
