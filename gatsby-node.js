const slug = require("slug")
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await createMentorPages(graphql, createPage)
  await createTaskPages(graphql, createPage)
}

async function createMentorPages(graphql, createPage) {
  const template = path.resolve("./src/templates/mentor/index.js")

  const data = await graphql(`
    query {
      allContentfulMentor {
        edges {
          node {
            fullName
          }
        }
      }
    }
  `)

  const mentors = data.data.allContentfulMentor.edges.map(edge => edge.node)

  mentors.forEach(m => {
    const fullNameSlug = slug(m.fullName)

    createPage({
      component: template,
      path: `/${fullNameSlug}`,
      context: {
        slug: fullNameSlug,
        fullName: m.fullName,
      },
    })
  })
}

async function createTaskPages(graphql, createPage) {
  const template = path.resolve("./src/templates/task/index.js")

  const data = await graphql(`
    query {
      allContentfulTask {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  const tasks = data.data.allContentfulTask.edges.map(edge => edge.node)

  tasks.forEach(t => {
    const nameSlug = slug(t.name)

    createPage({
      component: template,
      path: `task/${nameSlug}`,
      context: {
        slug: nameSlug,
        name: t.name,
      },
    })
  })
}
