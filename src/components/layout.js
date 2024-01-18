// layout.js

// Importera React för att använda React-komponenter
import React from 'react';

// Importera CSS-filer för att tillämpa styling på layouten
import './variables.css';
import './global.css';

// Importera Seo, Navigation och Footer komponenter
import Seo from './seo';
import Navigation from './navigation';
import Footer from './footer';

// Definiera Layout-komponenten
const Layout = ({ children }) => {

  // Funktion för hantering av sökning
  const handleSearch = (term) => {
    // Implementera önskad söklogik här baserat på söktermen
    console.log('Sökterm:', term);
  };

  // Rendera layouten
  return (
    <>
      {/* Inkludera SEO-komponenten för metadata */}
      <Seo />

      {/* Inkludera navigationskomponenten och skicka med sökfunktionen */}
      <Navigation onSearch={handleSearch} />

      {/* Huvuddelen av layouten där sidans faktiska innehåll renderas */}
      <main>{children}</main>

      {/* Inkludera footerkomponenten */}
      <Footer />
    </>
  );
};

// Exportera Layout-komponenten för att den ska kunna användas i andra filer
export default Layout;
