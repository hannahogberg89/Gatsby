import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ description = '', lang = 'en', meta = [], title, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'image',
          content: image,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          rel: 'canonical',
          href: 'http://localhost:8000/',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Organization',
            name: 'Hanna Högberg',
            url: 'http://localhost:8000/',
            description: 'Min portfolio som frontend utvecklare.',
          }),
        },
      ].concat(meta)}
    />
  );
};

export default Seo;
