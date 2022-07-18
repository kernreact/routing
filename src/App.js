import React from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Data
import routes from './routes';

// Styles
import './assets/style.scss';

// Components
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SignOut from './components/SignOut';


const App = () => {
  const allRoutes = routes.reduce((routeCollection, currentItem) => {
    routeCollection.push(currentItem);

    if(currentItem.subnav) {
      currentItem.subnav.forEach(item => 
        routeCollection.push(
          {
            ...item,
            url: `${currentItem.url}${item.url}`,
          }
        )
      );
    }

    return routeCollection;
  }, []);

  return (
    <Router>
        <header>
            <Nav routes={routes} />
        </header>
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <Sidebar />
                    </div>
                    <div className="column">
                        <Switch>
                            <Route path="/signout">
                                <SignOut />
                            </Route>
                            {
                              allRoutes && allRoutes.map(item => (
                                  <Route
                                    render={() => item.component}
                                    key={item.name}
                                    path={item.url}
                                    exact={item.exact}
                                  />
                                )
                              )
                            }
                            <Route exact path="/">                              
                                <Dashboard />
                            </Route>
                            <Route>
                                <h1 className="title is-size-2">
                                    404 - Page not found
                                </h1>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </section>
    </Router>
  );
};

export default App;
