import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import FormView from '../components/FormView';

const storage = window.require('electron-json-storage');

const styles = theme => ({})

class Test extends Component {
    state = {}

    notify = () => this.state.enqueueSnackbar;

    onSave = (e, data) => {
        const { enqueueSnackbar } = this.props;
        storage.set('spir', data.spir, {}, (err, data) => {
            if(err) enqueueSnackbar(err.message, { variant: 'error' });
            else enqueueSnackbar('Constants saved', { variant: 'success' });
        });
    }

    componentDidMount() {
        storage.get('spir', (err, spir) => {
            if(err) this.notify(err.message, { variant: 'error' });
            else this.setState({ spir });
        });
    }

    render() {
        const { spir } = this.state;

        return (
            <FormView
                title='Constants'
                fields={{
                    spir: {
                        label: 'SPIR Server',
                        fields: {
                            url: {
                                control: 'textfield',
                                label: 'URL',
                                value: spir ? spir.url : undefined
                            }
                        }
                    }
                }}
                actions={{
                    save: {
                        callback: this.onSave
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withStyles(styles)(Test));
