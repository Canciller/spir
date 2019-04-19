import React, { Component, Fragment } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Select from '../../components/Select';
import View from '../../components/View';

import languages from '../../constants/translations/languages.json';

const styles = theme => ({
})

class Language extends Component {
    state = {
        language: '',
        items: null
    }

    onChange = e => {
        let language = e.target.value;
        this.setState({ language }, () => {
            this.props.setActiveLanguage(language);
        });
    }

    componentDidMount() {
        let items = languages.map((item, i) => {
            return { name: item.name, value: item.code }
        });

        this.setState({ items });
    }

    render() {
        const { items, language } = this.state;

        return (
            <View
                back
                title={<Translate id='section.language' />}
            >
                <Form>
                    <Select
                        onChange={this.onChange}
                        label={<Translate id='section.language' />}
                        items={items}
                        value={language}
                    />
                </Form>
            </View>
        )
    }
}

export default withLocalize(withStyles(styles)(Language));
