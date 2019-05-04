import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';

export default class IntlProviderWrapper extends Component {
    render() {
        const { children } = this.props;

        return (
            <IntlProvider locale='en'>
                {children}
            </IntlProvider>
        )
    }
}
