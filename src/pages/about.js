import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import '../components/about.css';


const AboutPage = ({ data }) => {
  const aboutMeData = data.contentfulAboutMe;
  const [showDescription2, setShowDescription2] = useState(false);

  const renderText = (textObj) => {
    return textObj.content.map((text, index) => {
      return text.value;
    }).join(' ');
  };

  const renderDescription = (description) => {
    if (!description) return null;

    const parsedDescription = JSON.parse(description.raw);

    return parsedDescription.content.map((paragraph, index) => {
      const nodeType = paragraph.nodeType;

      if (nodeType === 'paragraph') {
        return <p key={index}>{renderText(paragraph)}</p>;
      } else if (nodeType === 'heading-2') {
        return (
          <React.Fragment key={index}>
            <br />
            <h2>{renderText(paragraph)}</h2>
          </React.Fragment>
        );
      } else if (nodeType === 'hr') {
        return <hr key={index} />;
      }

      return null;
    });
  };

  // Use getImage to get the Gatsby image data
  const image = getImage(aboutMeData.image);

  return (
    <Layout>
      <title>{aboutMeData.title}</title>

      <main className='about'>
        <div className="profile-container flex-container">
          <div className="description-box">
            <h1 className="profile-title">{aboutMeData.title}</h1>
            <h2 className="profile-subtitle">{aboutMeData.subtitle}</h2>
            {renderDescription(aboutMeData.description)}

          </div>

          <div className="image-box">

            {image && <GatsbyImage image={image} alt="About Me Image" className="mt-4" />
            }  <br></br><br></br>
            <div className="description2-box">

              {showDescription2 && renderDescription(aboutMeData.description2)}
              {!showDescription2 && (
                <button className="read-more-btn" onClick={() => setShowDescription2(true)}>
                  Läs mitt Personliga brev
                </button>
              )}
              {showDescription2 && (
                <button className="read-less-btn" onClick={() => setShowDescription2(false)}>
                  Läs mindre
                </button>
              )}
            </div></div>

        </div>
      </main>
    </Layout>
  );
};

export const query = graphql`
  query {
    contentfulAboutMe {
      title
      subtitle
      description {
        raw
      }
      description2 {
        raw
      }
      image {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
      }
    }
  }
`;

export default AboutPage;
