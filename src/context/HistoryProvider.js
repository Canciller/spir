import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HistoryContext from './HistoryContext';

const history = createBrowserHistory();

export default class HistoryProvider extends Component {
    render() {
        return (
            <Router history={history}>
                <HistoryContext.Provider value={history}>
                    {this.props.children}
                </HistoryContext.Provider>
            </Router>
        )
    }
}
