import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import Navbar from "./components/Navbar";
import TagLists from './components/tagLists';
import Tags from "./components/tags";


const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
});


// class App extends Component {
function App () {
    // render(){
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="content">
              <Switch>
                <Route exact path="/api/tagList">
                  <TagLists />
                </Route>
                <Route path="/api/tags">
                  <Tags />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  // }
}

export default App;
