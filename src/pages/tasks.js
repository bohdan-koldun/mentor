import * as React from "react"
import { graphql, Link } from "gatsby"
import { Divider } from "antd"
import slug from "slug"
import { Card, Row, Col } from "antd"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import TaskText from "../components/task/text"

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
                  <Row justify="center">
                    <Col sm={24} md={8}>
                      {" "}
                      <GatsbyImage image={getImage(task.sticker)} />
                    </Col>
                    <Col sm={24} md={16} style={{ padding: "16px 0" }}>
                      <TaskText text={task.description.description} />
                    </Col>
                  </Row>
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
