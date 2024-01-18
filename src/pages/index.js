// Importera nödvändiga bibliotek och komponenter från Gatsby och React
import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo';
import Layout from '../components/layout';
import '../templates/blog-post.module.css'; // Importera en CSS-modul (blog-post.module.css)
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// Skapa metadata för SEO
const seoProps = {
  title: 'Hanna Högberg - Portfolio.',
  description: 'Utforska min portfolio som Frontendutvecklare här.',
};

// Funktionskomponent för startsidan
const IndexPage = ({ data, location }) => {
  // Hämta data om hemsektionen och projekt från GraphQL-frågan
  const homeData = data.allContentfulHome.edges.map(({ node }) => node);
  const projectData = data.allContentfulProject.nodes;

  // Rendera komponenten
  return (
    <Layout location={location}>
      <main className="bg-black"> {/* Huvudsektion för startsidan med svart bakgrund */}

        {/* Inkludera SEO-komponenten med metadata */}
        <Seo {...seoProps} />

        {/* Loopa genom hemdata och rendera innehållet */}
        {homeData.map((node) => (
          <div key={node.id} className="">
            {/* Visa header-bild om den finns */}
            {node.header?.url && (
              <img src={node.header.url} alt={node.name} className="w-full" />
            )}

            {/* Desktop-layout */}
            <div className="hidden md:flex mt-4">
              {/* Vänsterkolumn med text */}
              <div className="flex items-center justify-center flex-1 max-w-2xl mx-auto bg-000 dark:bg-gray-800 p-4 rounded-md shadow-md font-sans font-montserrat">
                <h1>{node.text}</h1>
                <p className="mb-3 text-3xl text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold text-gray-900 dark:text-gray-100">
                  {node.name}
                </p>
              </div>

              {/* Högerkolumn med ytterligare information */}
              <div className="flex-1 max-w-2xl mx-auto bg-97807d dark:bg-gray-800 p-4 rounded-md shadow-lg text-white bg-opacity-80 flex  justify-center font-sans font-montserrat">
                {node.info.info}
              </div>
            </div>

            {/* Mobil layout */}
            <div className="md:hidden bg-000 dark:bg-gray-800 p-4 rounded-md shadow-md mt-4 flex  justify-center font-sans font-montserrat">
              <h1 className="text-3xl text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold text-gray-900 dark:text-gray-100 ">
                {node.name}
              </h1>
              <p className="nodetext">{node.text}</p>
            </div>

            <div className="md:hidden bg-97807d  p-4 rounded-md  text-white bg-opacity-80  font-montserrat">
              {node.info.info}
            </div>
            <br></br>
            <br></br>

            {/* Projektrubrik */}
            <div className="flex items-center justify-center flex-1 max-w-2xl mx-auto bg-000 dark:bg-gray-800 p-4 rounded-md shadow-md font-sans font-montserrat">
              <div className="project-h1">My Project</div>
            </div>

            {/* Projektsektion med länkar till projekt */}
            <div className="flex flex-wrap mt-4 justify-center items-center">
              {projectData.map((project) => (
                <div key={project.slug} className="w-full md:w-1/2 lg:w-1/3 xl:w-0.5/4 flex flex-col items-center mb-8 md:mb-4">
                  {/* Länk till projekt med GatsbyImage för att visa projektbild */}
                  <a href={`/project-page/${project.slug}/`} className="rounded-full overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <GatsbyImage
                      image={getImage(project.image)}
                      alt={project.title}
                      className="w-80 h-80 rounded-full"
                    />
                  </a>
                </div>
              ))}
            </div>

          </div>
        ))}
      </main>
    </Layout>
  );
};

// GraphQL-fråga för att hämta data om hemsektionen och projekt
export const query = graphql`
  query MyQuery {
    allContentfulHome(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          id
          header {
            url
          }
          info {
            info
          }
          text
        }
      }
    }
    allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        title
        slug
        subtitle
        category
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 900)
        }
      }
    }
  }
`;

// Exportera komponenten som standard
export default IndexPage;
