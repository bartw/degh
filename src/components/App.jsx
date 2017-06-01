import React from 'react';
import { gql, graphql } from 'react-apollo';

function App({loading, repository}) {
  const commits = loading ? [] : repository.ref.target.history.edges.map(edge => <li key={edge.node.oid}>{edge.node.messageHeadline}</li>);
  return (
    <div>
      {loading && <div>loading</div>}
      {
        !loading && 
        <div>
          <h1>Hello {repository.name}, you were created at {repository.createdAt}</h1>
          <h2>Commits</h2>
          <ul>
            {commits}
          </ul>
        </div>
      }
    </div>
  );
}

const repoQuery = gql`
  query Repo {
    repository(owner: "bartw", name: "degh") {
      name
      createdAt
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(first: 10) {
              edges {
                node {
                  messageHeadline
                  oid
                  author {
                    name
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default graphql(repoQuery, {
  props: ({ data: { loading, repository } }) => ({
    loading, repository,
  })
})(App);