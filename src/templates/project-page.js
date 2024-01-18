import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import ImageCarousel from '../components/imageCarousel';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // Add this line
import '../styles/global.css';

const ProjectPage = ({ data }) => {
  const project = data.contentfulProject;

  const renderDescription = (description) => {
    if (!description) return null;

    const content = JSON.parse(description.raw).content;

    return content.map((paragraph, index) => {
      const { nodeType, content } = paragraph;

      switch (nodeType) {
        case 'paragraph':
          return <p key={index}>{renderContent(content)}</p>;
        case 'embedded-asset-block':
          return null;
        default:
          return null;
      }
    });
  };

  const renderContent = (content) => {
    return content.map((text, index) => {
      const { nodeType, value, marks } = text;

      switch (nodeType) {
        case 'text':
          return marks && marks.length > 0 ? (
            <strong key={index}>{value}</strong>
          ) : (
            value
          );
        default:
          return null;
      }
    });
  };

  return (
    <Layout>
      <div className="project">
        <div className="project-container">
          <div className='title'>{project.title}</div>
          <br></br>
          <br></br>
          {project.image && (
            <GatsbyImage
              image={getImage(project.image)}
              alt={project.title}
            />
          )}

          <br></br>
          <br></br>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#7a5c58', fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>{project.subtitle}</h2>
          <div style={{ color: '#674c3e' }}>{renderDescription(project.description)}</div>
          <br></br>
          <br></br>

          {project.image2 && <ImageCarousel images={project.image2} />}
          <br></br>
          <br></br>
          <div className="button-container">

            <div className="project-skills">

              {project.skills && (
                <div>
                  {documentToReactComponents(JSON.parse(project.skills.raw), {
                    renderNode: {
                      'heading-3': (node, children) => (
                        <h3 className="text-lg font-semibold mt-2" style={{ color: '#e6dfd3', textAlign: 'center' }}>{children}</h3>
                      ),
                      'unordered-list': (node, children) => (
                        <ul className="list-disc ml-6 mt-2">{children}</ul>
                      ),
                      'list-item': (node, children) => (
                        <li>{children}</li>
                      ),
                    },
                  })}
                </div>
              )}</div></div></div>

        <div className="button-container">
          <Link to="/project/" className="button">
            Tillbaka till projekt
          </Link>
        </div><br></br>

      </div>

    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      title
      subtitle
      image {
        gatsbyImageData(layout: CONSTRAINED, width: 1500)
      }
      image2 {
        gatsbyImageData(layout: CONSTRAINED, width: 1000, height: 800)
      }
      description {
        raw
      }
      skills {
        raw
      }
    }
  }
`;

export default ProjectPage;
