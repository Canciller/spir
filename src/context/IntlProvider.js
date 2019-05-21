import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import withTheme from './withTheme';

const storage = window.require('electron-json-storage');

const types = [
    'Light',
    'Dark'
];

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class IntlProviderWrapper extends Component {
    componentDidMount() {
        const { themeHelpers } = this.props;

        storage.get('theme', (err, theme) => {
            if(err) this.notify(err.message, { variant: 'error' });
            else {
                let type = theme.type;
                if(isEmpty(theme)) type = 0;
                this.setState({ type }, () => {
                    themeHelpers.setThemeType(types[type]);
                });
            }
        });
    }

    render() {
        const { children } = this.props;

        return (
            <IntlProvider locale='en'>
                {children}
            </IntlProvider>
        )
    }
}

export default withTheme(IntlProviderWrapper);
