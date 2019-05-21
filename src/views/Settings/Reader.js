import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import FormView from '../../components/FormView';

const storage = window.require('electron-json-storage');
const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

class Reader extends Component {
    state = {}

    notify = () => this.state.enqueueSnackbar;

    onConnect = (e, reader) => {
        ipcRenderer.send('reader:connect', reader.port, reader.address);
        storage.set('reader', reader, err => err && this.notify(err.message, { variant: 'error' }));
    }

    componentDidMount() {
        const { enqueueSnackbar } = this.props;

        ipcRenderer.on('reader:status', (e, status) => enqueueSnackbar(status.message, {
            variant: status.success ? 'success' : 'error',
            preventDuplicate: true,
        }));

        ipcRenderer.send('reader:status', (e, status) => enqueueSnackbar(status.message, {
            variant: status.success ? 'success' : 'error',
            preventDuplicate: true,
        }));

        storage.get('reader', (err, data) => {
            if(err) this.notify(err.message, { variant: 'error' });
            else if(data) this.setState({ port: data.port, address: data.address });
        });
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        const {
            port, address
        } = this.state;

        return (
            <FormView
                title='Reader'
                fields={{
                     address: {
                         control: 'textfield',
                         label: 'Address',
                         placeholder: '127.0.0.1',
                         defaultValue: '127.0.0.1',
                         value: address
                    },
                    port: {
                        control: 'textfield',
                        label: 'Port',
                        placeholder: '3334',
                        defaultValue: '3334',
                        value: port
                    },
                }}
                actions={{
                    connect: {
                        callback: this.onConnect
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withStyles(styles)(Reader));
