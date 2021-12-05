import * as React from "react"
import { Link, graphql } from "gatsby"
import slug from "slug"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import TaskText from "../../components/task/text"
import { countOneTaskByFullName } from "../../utils"
import { Table } from "antd"

const Task = ({ data }) => {
  const task = data.contentfulTask
  const taskDescription = task.description.description
  const mentorsTasks = countOneTaskByFullName(
    data.allContentfulMentorTask.edges.map(({ node }) => node)
  )

  const tableData = Object.keys(mentorsTasks).map(key => ({
    name: `${key} та ${mentorsTasks[key].teenager}`,
    count: mentorsTasks[key].count,
  })).sort((a, b) => b.count - a.count)

  const columns = [
    {
      title: "Хто",
      dataIndex: "name",
      key: "name",
      render: text => <Link to={`/${slug(text.split(" та")[0])}`}>{text}</Link>,
    },
    {
      title: `Кількість стікерів '${task.name}'`,
      dataIndex: "count",
      key: "count",
    },
  ]

  return (
    <Layout>
      <Seo title={task.name} description={taskDescription} />
      <h1>{task.name}</h1>
      <GatsbyImage image={getImage(task.sticker)} />
      <br /> <br />
      <TaskText text={task.description.description} />
      <br /> <br />
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <br /> <br />
      <Link to="/">На головну</Link>
    </Layout>
  )
}

export const query = graphql`
  query ($name: String!) {
    contentfulTask(name: { eq: $name }) {
      name
      sticker {
        gatsbyImageData(layout: CONSTRAINED, width: 350, height: 350)
      }
      description {
        description
      }
    }
    allContentfulMentorTask(filter: { task: { name: { eq: $name } } }) {
      edges {
        node {
          mentor {
            fullName
            teenager {
              fullName
            }
          }
        }
      }
    }
  }
`

export default Task
