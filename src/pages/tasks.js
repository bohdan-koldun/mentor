import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import Layout from "../components/layout"
import Seo from "../components/seo"

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
              <Link to={`/${nameSlug}`}>{task.name}</Link>
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
        }
      }
    }
  }
`

export default TasksPage
