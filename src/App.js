import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Localization from './Localization';
import Routes from './Routes';
import Layout from './components/Layout';

//const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
        <Localization>
            <BrowserRouter>
                <Layout>
                    <Routes />
                </Layout>
            </BrowserRouter>
        </Localization>
    );
  }
}

export default App;
