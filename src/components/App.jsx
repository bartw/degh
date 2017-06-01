import React from 'react';
import { gql, graphql } from 'react-apollo';

function App({loading, repository}) {
  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && <div>Hello {repository.name}, you were created at {repository.createdAt}</div>}
    </div>
  );
}

const repoQuery = gql`
  query Repo {
    repository(owner:"bartw", name:"degh") {
      name,
      createdAt
    }
  }
`;

export default graphql(repoQuery, {
  props: ({ data: { loading, repository } }) => ({
    loading, repository,
  })
})(App);