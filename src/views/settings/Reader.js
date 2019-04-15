import React, { Component, Fragment } from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    status: {
        textAlign: 'center',
        marginTop: 15
    },
    statusError: {
        color: 'red'
    }
})

class Reader extends Component {
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

    handleConnect = () => {
        const { port, address } = this.state;
        ipcRenderer.send('reader:connect', port, address);
    }

    componentDidMount() {
        ipcRenderer.on('reader:status', (e, status) => {
            this.setState({ status });
        });

        ipcRenderer.send('reader');
        ipcRenderer.on('reader', (e, reader) => {
            this.setState({
                port: reader.port,
                address: reader.address
            });
        });

        ipcRenderer.send('reader:status');
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        const { classes } = this.props;

        const { port, address, status } = this.state;

        return (
            <Form>
                <Typography variant='title'>
                    <Translate id='section.readers'/>
                </Typography>
                <TextField
                    onChange={this.handleAddressChange}
                    label={<Translate id='address' />}
                    placeholder='127.0.0.1'
                    value={address}
                />
                <TextField
                    onChange={this.handlePortChange}
                    label={<Translate id='port' />}
                    placeholder='3334'
                    value={port}
                />
                <Button onClick={this.handleConnect}>
                    <Translate id='connect' />
                </Button>
                <Typography
                    className={classNames(classes.status, !status.success && classes.statusError)}
                    variant='caption'
                >
                    {status.message}
                </Typography>
            </Form>
        )
    }
}

export default withStyles(styles)(Reader);
