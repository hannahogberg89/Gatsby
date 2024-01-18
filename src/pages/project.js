import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Seo from '../components/seo';
import Layout from '../components/layout';
import ImageCarousel from '../components/imageCarousel';

const FilterButton = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`filter-button ${isActive ? 'active' : ''}`}
    style={{
      backgroundColor: isActive ? '#e6dfd3' : '#7a5c58',
      color: '#000',
      padding: '10px 15px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '10px',
      marginRight: '5px',
      marginBottom: '20px',
      transition: 'background-color 2s ease',
    }}
  >
    {category}
  </button>
);

const ProjectIndex = ({ data }) => {
  const projects = get(data, 'allContentfulProject.nodes');
  const allCategories = [...new Set(projects.map(project => project.category))];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  return (
    <Layout location={data.location}>
      <Seo title="Projects" />
      <div className="text-center bg-black">
        <div className="flex justify-center gap-2 mb-4 bg-black">
          <FilterButton
            category="All"
            isActive={!selectedCategory}
            onClick={() => setSelectedCategory(null)}
          />
          {allCategories.map(category => (
            <FilterButton
              key={category}
              category={category}
              isActive={category === selectedCategory}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center bg-black">
          {filteredProjects.map(project => (
            <div key={project.slug} style={{ backgroundColor: '#7a5c58' }} className="p-2 rounded-lg shadow-md flex-grow flex-shrink-0 w-1/3 mx-4 mb-4">

              <h2 className="text-xl font-semibold mb-2" style={{ color: '#e6dfd3', fontFamily: 'Montserrat, sans-serif' }}>{project.title}</h2>
              <GatsbyImage image={getImage(project.image)} alt={project.title} className="mt-4" />

              {project.about && (
                <div className="text-center">
                  {documentToReactComponents(JSON.parse(project.about.raw), {
                    renderNode: {
                      'heading-3': (node, children) => (
                        <h3 className="text-lg font-semibold mt-2" style={{ color: '#e6dfd3' }}>{children}</h3>
                      ),
                      'unordered-list center': (node, children) => (
                        <ul className="list-disc ml-6 mt-2 text-center">{children}</ul>
                      ),
                      'list-item': (node, children) => (
                        <li className="text-center">{children}</li>
                      ),
                    },
                  })}
                </div>
              )}



              {/* Bildkarusell */}
              {project.image2 && <ImageCarousel images={project.image2} />}
              <br />


              <Link to={`/project-page/${project.slug}/`} className="read-more-button mt-4 block">
                Read More
              </Link>
              <br />
              <br />

              {project.links && (
                <div className="text-center">
                  {documentToReactComponents(JSON.parse(project.links.raw), {
                    renderNode: {
                      'paragraph': (node, children) => (
                        <p className="text-lg mt-2" style={{ color: '#e6dfd3' }}>{children}</p>
                      ),
                      'text': (node, text) => (
                        <span style={{ color: '#e6dfd3' }}>{text}</span>
                      ),
                      'hyperlink': (node, children) => (
                        <button
                          onClick={() => window.open(node.data.uri, '_blank')}
                          className="link-button"
                        >
                          {children}
                        </button>
                      ),
                    },
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        title
        slug
        subtitle
        category
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 500)
        }
        image2 {
          gatsbyImageData(layout: CONSTRAINED, width: 500, height: 400)
        }
        about {
          raw
        }
        links {
          raw
        }
      }
    }
  }
`;

export default ProjectIndex;
