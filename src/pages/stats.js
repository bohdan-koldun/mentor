import * as React from "react"
import { graphql, Link } from "gatsby"
import slug from "slug"
import { Avatar, Table } from "antd"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {  getImage } from "gatsby-plugin-image"


const IndexPage = ({ data, location }) => {
  const mentorsTasks = data.allContentfulMentorTask.edges.map(({ node }) => node)

  const taskStats = mentorsTasks.reduce((stats, item) => {
    stats[item.task.name] = stats[item.task.name] || { count: 0, ...item.task }
    stats[item.task.name].count++

    return stats
  }, {})

  const columns = [
    {
      title: 'Завдання',
      dataIndex: 'name',
      key: 'name',
      render: title =>  <Link to={`/task/${slug(title)}`}>{title}</Link>,
    },
    {
      title: 'Кількість виконань',
      dataIndex: 'count',
      key: 'count',
    },

    {
      title: 'Стікер',
      key: 'sticker',
      dataIndex: 'sticker',
      render: src => (
        <Avatar shape="square" size="large" src={src} />
      ),
    },
  ];

  const tableData =  Object.values(taskStats).map((item, i) => ({
    key: i,
    count: item.count,
    sticker: getImage(item.sticker).images.fallback.src,
    name: item.name,
  })).sort((a, b) => b.count - a.count);

  return (
    <Layout location={location}>
      <Seo title="Статистика" />
        <Table columns={columns} dataSource={tableData} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulMentorTask {
      edges {
        node {
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
