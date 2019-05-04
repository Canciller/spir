import React, { Component } from 'react';
//import { SnackbarProvider } from 'notistack';

import Routes from './Routes';

import {
    HistoryProvider,
    SpirProvider,
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
                    <Layout>
                        <Routes />
                    </Layout>
                </SpirProvider>
            </IntlProvider>
        </HistoryProvider>
    )
  }
}
