import React, { Component } from 'react';
import History from './History';
import Localization from './Localization';
import SpirApi from './SpirApi';
import Routes from './Routes';
import Layout from './components/Layout';

//const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
        <Localization>
            <History>
                <SpirApi>
                    <Layout>
                        <Routes />
                    </Layout>
                </SpirApi>
            </History>
        </Localization>
    );
  }
}

export default App;
