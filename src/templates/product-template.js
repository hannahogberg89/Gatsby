import React from 'react';
import Layout from '../components/layout';

const ProductTemplate = ({ pageContext }) => {
  const { product } = pageContext;

  return (
    <Layout>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      {/* Visa övrig produktinformation här */}
    </Layout>
  );
};

export default ProductTemplate;
