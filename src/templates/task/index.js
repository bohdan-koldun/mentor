import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Task = ({ data }) => {
  const task = data.contentfulTask
  const taskDescription = task.description.description

  return (
    <Layout>
      <Seo title={task.name} description={taskDescription} />
      <h1>{task.name}</h1>
      <GatsbyImage image={getImage(task.sticker)} />
      <pre>{taskDescription}</pre>
      <Link to="/">На головну</Link>
    </Layout>
  )
}

export const query = graphql`
  query ($name: String!) {
    contentfulTask(name: { eq: $name }) {
      name
      sticker {
        gatsbyImageData(layout: CONSTRAINED, width: 512, height: 512)
      }
      description {
        description
      }
    }
  }
`

export default Task
