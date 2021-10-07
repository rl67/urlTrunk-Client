import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Navbar from "./components/Navbar";
import UrlTrunk from './components/urlTrunk';
import Tags from "./components/tags";


const client = new ApolloClient({
  // uri: 'http://localhost:4001/graphql',
  // uri: 'http://172.16.80.50:4001/graphql',
  uri: 'http://172.19.119.237:4001/graphql',
  cache: new InMemoryCache()
});


function App () {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <UrlTrunk />
                </Route>
                <Route path="/tags">
                  <Tags />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
}

export default App;
