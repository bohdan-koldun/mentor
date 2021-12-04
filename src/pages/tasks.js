import * as React from "react"
import { graphql, Link } from "gatsby"
import { Divider } from "antd"
import slug from "slug"
import { Card } from "antd"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TasksPage = ({ data, location }) => {
  const tasks = data.allContentfulTask.edges.map(({ node }) => node)

  return (
    <Layout location={location}>
      <Seo title="Завдання" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {tasks.map(task => {
          const nameSlug = slug(task.name)

          return (
            <div key={nameSlug}>
              <Link to={`/task/${nameSlug}`}>
                <Card title={task.name} hoverable>
                  <GatsbyImage image={getImage(task.sticker)} />
                  <p style={{ marginTop: "12px" }}>
                    {task.description.description}
                  </p>
                </Card>
              </Link>
              <Divider />
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
