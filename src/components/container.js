import React from 'react';

// Container-komponenten tar emot två props: children och as (default är 'div')
const Container = ({ children, as = 'div' }) => {
  // Skapa en variabel "Tag" baserat på värdet av "as" (HTML-taggen för containern)
  const Tag = as;

  // Returnera JSX för containern med stilmall
  return (
    <Tag
      style={{
        width: '100%',  // Bredden på container
        padding: 'var(--space-3xl) var(--size-gutter)',  // Storleken på padding sätts med hjälp av variabler
      }}
    >
      {children}  {/* Renderar innehållet (children) i containern */}
    </Tag>
  );
};

export default Container;
