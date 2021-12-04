import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Mentor = ({ data }) => {
  const mentor = data.contentfulMentor
  const teenager = mentor.teenager
  const title = `${mentor.fullName} та ${teenager.fullName}`

  return (
    <Layout>
      <Seo title={title} />
      <h1>{title}</h1>
      <Link to="/">Повернутися до списку</Link>
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
