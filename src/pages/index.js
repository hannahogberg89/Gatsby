import { graphql } from "gatsby"
import * as React from "react"
import Layout from '../components/layout';




const IndexPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <main className="flex flex-row gap-3">
        {data.allContentfulEmployee.edges.map(({ node }) => (
          <div key={node.id}>{node.name}</div>
        ))}
      </main>
    </Layout>
  );
};


export const query = graphql`
  {
    allContentfulEmployee(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>
