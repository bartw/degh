import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import App from './components/App';
import secret from './secret';

const networkInterface = createNetworkInterface({
    uri: 'https://api.github.com/graphql'
});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }
        const token = secret.token;
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
    }
}]);

const client = new ApolloClient({
    networkInterface
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);