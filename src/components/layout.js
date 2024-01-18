// layout.js
import React from 'react';
import './variables.css';
import './global.css';
import Seo from './seo';
import Navigation from './navigation';
import Footer from './footer';

const Layout = ({ children }) => {


  const handleSearch = (term) => {
    // Implementera önskad söklogik här baserat på söktermen
    console.log('Sökterm:', term);
  };

  return (
    <>
      <Seo />

      <Navigation onSearch={handleSearch} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
