import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';
import LoadingView from '../../components/LoadingView';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

class AddCard extends Component {
    state = {}

    onCreate = (e, data) => {
        console.log(data);
    }

    onCardRead = tag => this.setState({ tag });

    componentDidMount() {
        ipcRenderer.on('reader:data', (e, tag) => this.onCardRead(tag));
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        return (
            <FormView
                onRefresh={() => this.setState({ tag: undefined })}
                title='Create Card'
                fields={{
                    card: {
                        label: 'Card',
                        fields: {
                            tag: {
                                control: 'textfield',
                                label: 'Tag',
                                placeholder: 'Waiting for card reading...',
                                disabled: true,
                                value: this.state.tag
                            }
                        }
                    },
                    partner: {
                        label: 'Partner',
                        fields: {
                            first_name: {
                                control: 'textfield',
                                label: 'First name',
                                required: true
                            },
                            last_name: {
                                control: 'textfield',
                                label: 'Last name',
                                required: true,
                                autoFocus: true
                            },
                            email: {
                                control: 'textfield',
                                label: 'Email',
                                required: true
                            },
                            phone_no: {
                                control: 'textfield',
                                label: 'Phone Number',
                                required: true
                            }
                        }
                    },
                    address: {
                        label: 'Address',
                        fields: {
                            line_1: {
                                control: 'textfield',
                                label: 'Line 1'
                            },
                            line_2: {
                                control: 'textfield',
                                label: 'Line 2'
                            },
                            city: {
                                control: 'textfield',
                                label: 'City'
                            },
                            postal_code: {
                                control: 'textfield',
                                label: 'Postal code'
                            }
                        }
                    }
                }}
                actions={{
                    create: {
                        callback: this.onCreate,
                        disabled: this.state.tag ? false : true
                    }
                }}
            />
        )
    }
}

export default withSpir(withStyles(styles)(AddCard));
