import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Task = ({ data }) => {
  const task = data.contentfulTask

  return (
    <Layout>
      <Seo title="Завдання" />
      <h1>{task.name}</h1>
      <Link to="/">На головну</Link>
    </Layout>
  )
}

export const query = graphql`
  query ($name: String!) {
    contentfulTask(name: { eq: $name }) {
      name
      sticker {
        gatsbyImageData(layout: CONSTRAINED, width: 186, height: 186)
      }
    }
  }
`

export default Task
