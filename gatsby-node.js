const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define the blog post template
  const projectTemplate = path.resolve('./src/templates/project-page.js');

  // Fetch Contentful data
  const result = await graphql(`
    {
      allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  // Create pages for each project
  result.data.allContentfulProject.nodes.forEach((node) => {
    createPage({
      path: `/project-page/${node.slug}`,
      component: projectTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Om sidan har en 404-statuskod
  if (page.path.includes('/404/')) {
    // Ta bort den befintliga sidan
    deletePage(page);

    // Skapa en ny sida med omdirigeringen till din anpassade 404-sida
    createPage({
      ...page,
      path: '/404/',
      component: require.resolve('./src/pages/404.js'), // Ange sökvägen till din anpassade 404-sida
    });
  }
};
