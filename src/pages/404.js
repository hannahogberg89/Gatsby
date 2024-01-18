import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import '../templates/blog-post.module.css';

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        fontSize: '20px',
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
      }}
    >
      <h1>404: Not Found</h1>
      <p>Tyvärr var detta en sida som inte fanns, gå tillbaka och upptäck mycket mer.</p>
      <Link to="/">
        <button
          style={{
            padding: '10px',
            marginTop: '50px',
            marginBottom: '50px',
            cursor: 'pointer',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: 'rgb(190, 95, 82)',
            color: 'rgb(230, 223, 211)',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s',
          }}

        >
          Back to Homepage
        </button>
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
