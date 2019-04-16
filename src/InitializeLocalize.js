import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';

import globalTranslations from './constants/translations/global.json';
import languages from './constants/translations/languages.json';

const onMissingTranslation = ({ translationId }) => translationId;

class InitializeLocalize extends Component {
    constructor(props) {
        super(props);

        props.initialize({
            languages: languages,
            translation: globalTranslations,
            options: {
                renderToStaticMarkup,
                onMissingTranslation
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default withLocalize(InitializeLocalize);
