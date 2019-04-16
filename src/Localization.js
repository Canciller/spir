import React, { Component, Fragment } from 'react';
import { LocalizeProvider } from 'react-localize-redux';
import InitializeLocalize from './InitializeLocalize';

export default class Localization extends Component {
    render() {
        return (
            <LocalizeProvider>
                <InitializeLocalize>
                    {this.props.children}
                </InitializeLocalize>
            </LocalizeProvider>
        )
    }
}
