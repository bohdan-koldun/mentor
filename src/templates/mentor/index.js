import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import DoneTaskList from "../../components/task/done.list"

const Mentor = ({ data }) => {
  const mentor = data.contentfulMentor
  const teenager = mentor.teenager
  const title = `${mentor.fullName} та ${teenager.fullName}`

  const doneTasks = data.allContentfulMentorTask.edges.map(({node}) => node)


  return (
    <Layout>
      <Seo title={title} />
      <h1>{title}</h1>
      <DoneTaskList tasks={doneTasks}/>

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
    allContentfulMentorTask(
         filter: {  mentor: { fullName: {eq: $fullName} } }
      sort: { fields: [date], order: ASC }
    ) {
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
          date
          createdAt
          comment
          photo {
            gatsbyImageData(layout: CONSTRAINED, width: 900, height: 900)
          }
        }
      }
    }
  }
`

export default Mentor
