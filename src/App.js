import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LocalizeProvider } from 'react-localize-redux';
import Routes from './Routes';
import Layout from './components/Layout';

//const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
        <LocalizeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes />
                </Layout>
            </BrowserRouter>
        </LocalizeProvider>
    );
  }
}

export default App;
