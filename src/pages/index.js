import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import { Card, Divider } from "antd"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { groupTasksByFullName } from "../utils"
import TaskBadge from "../components/task/badge"

const gridCardHalfStyle = {
  width: "50%",
  textAlign: "center",
  boxShadow: "none",
}

const gridCardFullStyle = {
  width: "100%",
  textAlign: "center",
  boxShadow: "none",
}

const IndexPage = ({ data, location }) => {
  const mentors = data.allContentfulMentor.edges.map(({ node }) => node)
  const mentorsTasks = groupTasksByFullName(
    data.allContentfulMentorTask.edges.map(({ node }) => node)
  )

  return (
    <Layout location={location}>
      <Seo title="Ментор" />
      <p style={{ display: "flex", flexDirection: "column" }}>
        {mentors.map(mentor => {
          const nameSlug = slug(mentor.fullName)
          const doneTasks = mentorsTasks[mentor.fullName] || {}
          const doneTasksNames = Object.keys(doneTasks)

          return (
            <Card style={{ marginBottom: "16px" }} hoverable={true}>
              <Link to={`/${nameSlug}`} key={nameSlug}>
                <Card.Grid style={gridCardHalfStyle} hoverable={false}>
                  <GatsbyImage
                    image={getImage(mentor.thumbnail)}
                    alt={mentor.fullName}
                  />
                  <h5 style={{ marginTop: "8px" }}>{mentor.fullName}</h5>
                </Card.Grid>
                <Card.Grid style={gridCardHalfStyle} hoverable={false}>
                  <GatsbyImage
                    image={getImage(mentor.teenager?.thumbnail)}
                    alt={mentor.teenager.fullName}
                  />
                  <h5 style={{ marginTop: "8px" }}>
                    {mentor.teenager?.fullName}
                  </h5>
                </Card.Grid>
              </Link>
              {doneTasksNames.length > 0 && (
                <Card.Grid style={gridCardFullStyle} hoverable={false}>
                  <Divider style={{ marginBottom: "24px" }}>
                    Виконані завдання
                  </Divider>
                  {doneTasksNames.map(taskName => {
                    const src = getImage(doneTasks[taskName][0].sticker).images
                      .fallback.src

                    return (
                      <div key={taskName}>
                        <TaskBadge
                          title={taskName}
                          src={src}
                          count={doneTasks[taskName].length}
                        />
                      </div>
                    )
                  })}
                </Card.Grid>
              )}
            </Card>
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
    allContentfulMentorTask {
      edges {
        node {
          mentor {
            fullName
          }
          task {
            name
            sticker {
              gatsbyImageData(layout: FIXED, width: 100, height: 100)
            }
          }
        }
      }
    }
  }
`

export default IndexPage
