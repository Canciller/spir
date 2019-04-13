import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Layout from './components/Layout';

import Reader from './views/Reader';

const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
      <Layout>
          <Reader />
      </Layout>
    );
  }
}

export default App;
