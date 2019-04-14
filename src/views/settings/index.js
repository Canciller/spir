import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    connectButton: {
        padding: '15px 0'
    },
    textfield: {
        margin: `15px 0 0 0`,
    },
    status: {
        textAlign: 'center'
    },
    statusError: {
        color: 'red'
    }
})

class ReaderSettings extends Component {
    state = {
        address: '',
        port: '',
        status: ''
    }

    handleAddressChange = event => {
        this.setState({ address: event.target.value });
    }

    handlePortChange = event => {
        this.setState({ port: event.target.value });
    }

    handleConnectClick = () => {
        const { port, address } = this.state;
        ipcRenderer.send('reader:connect', port, address);
    }

    componentDidMount() {
        ipcRenderer.on('reader:status', (e, status) => {
            this.setState({ status });
        })
    }

    render() {
        const { classes, theme } = this.props;
        const { port, address, status } = this.state;

        return (
            <Fragment>
                <Typography variant='title'>Reader settings</Typography>
                <form className={classes.form}>
                    <TextField
                        className={classes.textfield}
                        fullWidth
                        id='reader-address'
                        label='Address'
                        placeholder='127.0.0.1'
                        value={address}
                        onChange={this.handleAddressChange}
                        margin='normal'
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        className={classes.textfield}
                        fullWidth
                        id='reader-port'
                        label='Port'
                        placeholder='3334'
                        value={port}
                        onChange={this.handlePortChange}
                        margin='normal'
                        variant='outlined'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        onClick={this.handleConnectClick}
                        className={classNames(classes.connectButton, classes.textfield)}
                        color='primary'
                        variant='outlined'>
                        Connect
                    </Button>
                    <Typography 
                        className={classNames(
                            classes.status,
                            classes.textfield,
                            !status.success && classes.statusError)}
                        variant='caption'>{status.message}</Typography>
                </form>
            </Fragment>
        )
    }
}

let Reader = withStyles(styles)(ReaderSettings);

export {
    Reader
}
