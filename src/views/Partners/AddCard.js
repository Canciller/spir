import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';
import { withSnackbar } from 'notistack';

import FormView from '../../components/FormView';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

class AddCard extends Component {
    state = {}

    onError = err => {
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(err.message, {
            variant: 'error',
            preventDuplicate: true
        });
    }

    onSuccess = message => {
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(message, {
            variant: 'success',
            preventDuplicate: true
        });
    }

    onCreate = (e, data) => {
        const { spir } = this.props;

        let {
            card,
            partner,
            address
        } = data;

        spir.addresses.add(address)
            .then(address => {
                partner.address = address._id;
                spir.partners.add(partner)
                    .then(partner => {
                        card.partner = partner._id;
                        spir.cards.add(card)
                            .then(() => this.onSuccess('Card created'))
                            .catch(this.onError)
                    })
                    .catch(this.onError)
            })
            .catch(this.onError)
    }

    onCardRead = tag => this.setState({ tag }, () => {
        this.onSuccess('Card detected');
    });

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
                            },
                            level: {
                                control: 'select',
                                label: 'Level',
                                autoFocus: true,
                                items: [
                                    'Platinum',
                                    'Gold'
                                ]
                            }
                        }
                    },
                    partner: {
                        label: 'Partner',
                        fields: {
                            first_name: {
                                control: 'textfield',
                                label: 'First name',
                                required: true,
                            },
                            last_name: {
                                control: 'textfield',
                                label: 'Last name',
                                required: true
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
                            country: {
                                control: 'textfield',
                                label: 'Country'
                            },
                            city: {
                                control: 'textfield',
                                label: 'City'
                            },
                            line_1: {
                                control: 'textfield',
                                label: 'Line 1'
                            },
                            line_2: {
                                control: 'textfield',
                                label: 'Line 2'
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

export default withSnackbar(withSpir(withStyles(styles)(AddCard)));
