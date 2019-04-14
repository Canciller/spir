import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Layout from './components/Layout';

//const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes />
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
