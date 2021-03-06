import React, { Component } from 'react';
import { Router, Switch, Route, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import historyCb from '~/src/helpers/historyCb';
import { loadFromLocalStorage } from '~/src/actions/Cart';

import routes from '~/src/routes';
import history from '~/src/helpers/history';
import store from '~/src/store';

import CartSection from '~/src/components/pages/Cart/widgets/Section';
import Notice from '~/src/components/shared/Notice';
import Layout from '~/src/components/shared/Layout';

history.listen(historyCb);
historyCb(window.location);

const RouteWithSubroutes = (route, index) => (
  <Route {...route} key={index} />
)

const initialState = { notice: '' };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    store.dispatch(loadFromLocalStorage());

    this.unlisten = history.listen( location =>  {
      (location.state) ?
        this.setState({ notice: location.state }) :
        this.setState(initialState)
    });
  }

  render() {
    const { notice } = this.state;
    return(
      <Provider store={store}>
        <Router history={ history }>
          <Layout>
            <Notice>{ notice }</Notice>
            <CartSection/>
            <Switch>
              {routes.map((route, index) =>
                RouteWithSubroutes(route, index))
              }
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
