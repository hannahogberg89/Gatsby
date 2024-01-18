import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import '../styles/global.css';
import '../components/contact.css';

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulContact {
        edges {
          node {
            contact
            contactInfo
            contactImage {
              gatsbyImageData(layout: CONSTRAINED, width: 400)
              file {
                url
              }
            }
            phone
            email
            github
          }
        }
      }
    }
  `);

  const { node } = data.allContentfulContact.edges[0];

  const containerStyle = {
    backgroundImage: `url(${node.contactImage.file.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Layout>
      <div className="contact">
        <div className="contact-container" style={containerStyle}>
          <h1 dangerouslySetInnerHTML={{ __html: node.contact }}></h1>
          <div dangerouslySetInnerHTML={{ __html: node.contactInfo }}></div>
          <form>
            <label>
              Namn:
              <input type="text" name="name" />
            </label>
            <label>
              E-post:
              <input type="email" name="email" />
            </label>
            <label>
              Meddelande:
              <textarea name="message" />
            </label>
            <div className="button1">

              <button type="submit">Skicka</button></div>
          </form>
          <div className="contact-info">
            <h2 dangerouslySetInnerHTML={{ __html: node.contact }}></h2>
            <br></br>
            <p>
              Telefon: <a href={`tel:${node.phone}`}>{node.phone}</a>
            </p>
            {node.email && (
              <p>
                E-post: <a href={`mailto:${node.email}`}>{node.email}</a>
              </p>
            )}
            <p>
              Github: <a href={node.github} target="_blank" rel="noopener noreferrer">{node.github}</a>
            </p>
          </div>
        </div></div>
    </Layout>
  );
};

export default ContactPage;
