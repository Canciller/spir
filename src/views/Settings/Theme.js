import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '../../context';

import FormView from '../../components/FormView';

const styles = theme => ({})

const types = [
    'Light',
    'Dark'
];

class Theme extends Component {
    state = {}

    onChange = (e, value) => {
        const { themeHelpers } = this.props;

        themeHelpers.setThemeType(types[value]);
    }

    render() {
        return (
            <FormView
                title='Theme'

                fields={{
                    type: {
                       control: 'select',
                       items: types,
                        onChange: this.onChange,
                        label: 'Type'
                    }
                }}
            />
        )
    }
}

export default withTheme(withStyles(styles)(Theme));
