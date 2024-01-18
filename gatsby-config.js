/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`, // Uppdatera detta med din faktiska domän
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: 'eWEM6J8eIgOyhHQOs-bSFZjtsUrQXmy-jkEflMX1j88',
        spaceId: 'bwiga7poa9ss',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify',
  ],
};
