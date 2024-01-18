import React, { useState } from 'react';
import { Link, navigate, useStaticQuery, graphql } from 'gatsby';

import * as styles from './navigation.module.css';

// Navigation komponenten
const Navigation = () => {
  // State för söktermen
  const [searchTerm, setSearchTerm] = useState('');

  // GraphQL-fråga för att hämta data från Contentful
  const data = useStaticQuery(graphql`
    query {
      allContentfulNavigation(filter: { node_locale: { eq: "en-US" } }) {
        edges {
          node {
            id
            icon {
              url
            }
          }
        }
      }
      allContentfulProject(filter: { node_locale: { eq: "en-US" } }) {
        nodes {
          title
          slug
        }
      }
      allContentfulContentType {
        nodes {
          name
          description
        }
      }
      contentfulContact(node_locale: { eq: "en-US" }) {
        id
      }
    }
  `);

  // Lista över content types som ska exkluderas från menyn
  const excludedContentTypes = ["Navigation", "Category", "Home"];

  // Funktion för att kontrollera om sökningen är för "Native JS"
  const isNativeJsSearch = (term) => {
    const nativeJsPattern = /native\s*js/i;
    return nativeJsPattern.test(term);
  };

  // Funktion för att hantera sökning
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('Sökterm:', searchTerm);

    // Lista över tillåtna sidor att söka på
    const allowedPages = ['project', 'about', 'contact'];

    const searchTermLower = searchTerm.toLowerCase();
    const allowedPagesLower = allowedPages.map((page) => page.toLowerCase());

    const searchTermWithoutProjectPage = searchTermLower.replace('project-page/', '');

    // Kontrollera om sökningen är för en tillåten sida
    const isPageAllowed = allowedPagesLower.some((page) =>
      searchTermWithoutProjectPage.includes(page)
    );

    let searchPath;

    if (isPageAllowed) {
      searchPath = `/${allowedPages.find((page) =>
        searchTermWithoutProjectPage.includes(page)
      )}/`;
    } else if (searchTermLower.startsWith('project-page/')) {
      // Formatera sökterm för projektsidor
      const formattedTerm = searchTermWithoutProjectPage
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('%20');
      searchPath = `/project-page/${encodeURIComponent(formattedTerm)}/`;
    } else if (searchTermWithoutProjectPage === 'native') {
      // Särskild hantering för sökning efter "Native JS"
      searchPath = '/project-page/Native%20JS/';
    } else if (isNativeJsSearch(searchTermWithoutProjectPage)) {
      // Särskild hantering för generell sökning efter "Native JS"
      searchPath = `/project-page/Native%20JS/`;
    } else {
      // Formatera sökterm för andra sidor
      const formattedTerm = searchTermWithoutProjectPage
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('%20');
      searchPath = `/project-page/${encodeURIComponent(formattedTerm)}/`;
    }

    console.log('Sökväg:', searchPath);

    // Kontrollera om sidan existerar och navigera
    const isPageExists = await checkIfPageExists(searchPath);

    if (isPageExists) {
      navigate(searchPath);
    } else {
      navigate('/404/');
    }
  };

  // Funktion för att kontrollera om en sida existerar
  const checkIfPageExists = async (path) => {
    const result = await fetch(path);
    return result.ok;
  };

  // Rendera navigationskomponenten
  return (
    <div>
      {/* Navigationssektionen */}
      <nav
        role="navigation"
        className={`${styles.container} navbar-wrapper`}
        aria-label="Main"
      >
        {/* Bildsektion för navigationen */}
        <div className={styles.navigationImages}>
          {data?.allContentfulNavigation?.edges.map(({ node }) => (
            <div key={node.id}>
              <img
                src={node.icon.url}
                alt={`Icon ${node.id}`}
                className={styles.navigationImage}
              />
            </div>
          ))}
        </div>

        {/* Formulär för sökning */}
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.searchInputGroup}>
            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök här..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Sök
            </button>
          </div>
        </form>

        {/* Lista över navigationslänkar */}
        <ul className={`${styles.navigation} `}>
          {/* Separera Home från resten och placera det först */}
          <li className={styles.navigationItem}>
            <Link to="/" activeClassName={styles.active}>
              <div>
                <strong>Home</strong>
              </div>
            </Link>
          </li>
          {data?.allContentfulContentType?.nodes
            .filter(contentType => !excludedContentTypes.includes(contentType.name))
            .map((contentType) => (
              <li key={contentType.name} className={styles.navigationItem}>
                <Link
                  to={`/${contentType.description.toLowerCase()}/`}
                  activeClassName={styles.active}
                >
                  <div>
                    <strong>{contentType.name}</strong>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
