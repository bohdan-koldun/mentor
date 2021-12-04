import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TasksPage = ({ data }) => {
  const tasks = data.allContentfulTask.edges.map(({ node }) => node)

  return (
    <Layout>
      <Seo title="Завдання" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tasks.map(task => {
          const nameSlug = slug(task.name)

          return (
            <div key={nameSlug}>
              <GatsbyImage image={getImage(task.sticker)} />
              <Link to={`/task/${nameSlug}`}>{task.name}</Link>
              <p>{task.description.description}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulTask(sort: { fields: [id], order: [ASC] }) {
      edges {
        node {
          name
          description {
            description
          }
          sticker {
            gatsbyImageData(layout: CONSTRAINED, width: 186, height: 186)
          }
        }
      }
    }
  }
`

export default TasksPage
