const slug = require("slug")
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await createMentorPages(graphql, createPage)
}

async function createMentorPages(graphql, createPage) {
  const houseTemplate = path.resolve("./src/templates/mentor/index.js")

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
      component: houseTemplate,
      path: `/${fullNameSlug}`,
      context: {
        slug: fullNameSlug,
        fullName: m.fullName,
      },
    })
  })
}
