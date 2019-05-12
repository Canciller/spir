import React, { Component } from 'react';

import Routes from './Routes';

import {
    HistoryProvider,
    SpirProvider,
    StorageProvider,
    IntlProvider,
    ThemeProvider,
} from './context';

import { SnackbarProvider } from 'notistack';

import Layout from './Layout';

//const {app} = window.require('electron').remote;

export default class Main extends Component {
  render() {
    return (
        <ThemeProvider>
            <HistoryProvider>
                <SnackbarProvider maxSnack={6}>
                    <IntlProvider>
                        <SpirProvider>
                            <StorageProvider>
                                <Layout>
                                    <Routes />
                                </Layout>
                            </StorageProvider>
                        </SpirProvider>
                    </IntlProvider>
                </SnackbarProvider>
            </HistoryProvider>
        </ThemeProvider>
    )
  }
}
