import React, { Component } from 'react';
import History from './History';
import Localization from './Localization';
import SpirApi from './SpirApi';
import Routes from './Routes';
import Layout from './components/Layout';
import { SnackbarProvider, withSnackbar } from 'notistack';

//const {app} = window.require('electron').remote;

class App extends Component {
  render() {
    return (
        <Localization>
            <History>
                <SnackbarProvider maxSnack={6}>
                    <SpirApi>
                        <Layout>
                            <Routes />
                        </Layout>
                    </SpirApi>
                </SnackbarProvider>
            </History>
        </Localization>
    );
  }
}

export default App;
