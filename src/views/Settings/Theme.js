import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '../../context';
import { withSnackbar } from 'notistack';

import FormView from '../../components/FormView';

const storage = window.require('electron-json-storage');

const styles = theme => ({})

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

class Theme extends Component {
    state = {}

    notify = () => this.state.enqueueSnackbar;

    onChange = (e, value) => {
        const { themeHelpers } = this.props;

        themeHelpers.setThemeType(types[value]);
        storage.set('theme', { type: value });
    }

    componentDidMount() {
        const { themeHelpers } = this.props;

        storage.get('theme', (err, theme) => {
            if(err) this.notify(err.message, { variant: 'error' });
            else {
                let type = theme.type;
                if(isEmpty(theme)) type = 0;
                this.setState({ type });
            }
        });
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
                        label: 'Type',
                        value: this.state.type
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withTheme(withStyles(styles)(Theme)));
