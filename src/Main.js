import React, { Component } from 'react';
//import { SnackbarProvider } from 'notistack';

import Routes from './Routes';

import {
    HistoryProvider,
    SpirProvider,
    StorageProvider,
    IntlProvider,
} from './context';

import Layout from './Layout';

//const {app} = window.require('electron').remote;

export default class Main extends Component {
  render() {
    return (
        <HistoryProvider>
            <IntlProvider>
                <SpirProvider>
                    <StorageProvider>
                        <Layout>
                            <Routes />
                        </Layout>
                    </StorageProvider>
                </SpirProvider>
            </IntlProvider>
        </HistoryProvider>
    )
  }
}
