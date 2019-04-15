import React, { Component, Fragment } from 'react';
import { LocalizeProvider } from 'react-localize-redux';

import { renderToStaticMarkup } from 'react-dom/server';
import { withLocalize } from 'react-localize-redux';
import globalTranslations from './constants/translations/global.json';
import languages from './constants/translations/languages.json';

class Initialize extends Component {
    constructor(props) {
        super(props);

        props.initialize({
            languages: languages,
            translation: globalTranslations,
            options: { renderToStaticMarkup }
        });
    }

    render() {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}

const LocalizeInitialize = withLocalize(Initialize);

export default class Localization extends Component {
    render() {
        return (
            <LocalizeProvider>
                <LocalizeInitialize>
                    {this.props.children}
                </LocalizeInitialize>
            </LocalizeProvider>
        )
    }
}
