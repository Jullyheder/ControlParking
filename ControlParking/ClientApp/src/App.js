import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Register from './components/Register';
import Report from './components/Report';
import InputAndExit from './components/InputAndExit';
import { NavMenu } from './components/NavMenu';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Register} />
            <Route path='/InputandExit' component={InputAndExit} />
            <Route path='/report' component={Report} />
      </Layout>
    );
  }
}
