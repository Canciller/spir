import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';
import { withSnackbar } from 'notistack';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';

const styles = theme => ({})

class EditCard extends Component {
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

    onSave = (e, { card, address, partner }) => {
        const { spir } = this.props;
        console.log(address, partner, card);

        spir.cards.update(card.card_id, { level: card.level })
            .then(() =>
                spir.addresses.update(address.address_id, address)
                .then(() => {
                    spir.partners.update(partner.partner_id, partner)
                        .then(() => this.onSuccess('Card information successfully saved'))
                        .catch(this.onError);
                })
                .catch(this.onError)
            )
            .catch(this.onError);
    }

    componentDidMount() {
        const { history } = this.props;

        const location = history.location;
        if(!location || !location.state) return;

        this.setState({ data: location.state.data });
    }

    render() {
        const data = this.state.data;

        if(!data)
            return (
                <ErrorView
                    message='Edit view not available.'
                />
            )
        else {
            const {
                card,
                partner,
                address
            } = data;

            return (
                <FormView
                    title='Edit Card'

                    fields={{
                        card: {
                            label: 'Card',
                            fields: {
                                tag: {
                                    control: 'textfield',
                                    label: 'Tag',
                                    disabled: true,
                                    value: card.tag
                                },
                                balance: {
                                    control: 'textfield',
                                    label: 'Balance',
                                    disabled: true,
                                    adorment: '$',
                                    value: card.balance
                                },
                                level: {
                                    control: 'select',
                                    label: 'Level',
                                    items: [
                                        'Platinum',
                                        'Gold'
                                    ],
                                    autoFocus: true,
                                    value: card.level
                                },
                                card_id: {
                                    control: 'textfield',
                                    label: 'Identifier',
                                    disabled: true,
                                    value: card._id
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
                                    value: partner.first_name
                                },
                                last_name: {
                                    control: 'textfield',
                                    label: 'Last name',
                                    required: true,
                                    value: partner.last_name
                                },
                                email: {
                                    control: 'textfield',
                                    label: 'Email',
                                    required: true,
                                    value: partner.email
                                },
                                phone_no: {
                                    control: 'textfield',
                                    label: 'Phone Number',
                                    required: true,
                                    value: partner.phone_no
                                },
                                partner_id: {
                                    control: 'textfield',
                                    label: 'Identifier',
                                    disabled: true,
                                    value: partner._id,
                                    key: 'partner._id'
                                }
                            }
                        },
                        address: {
                            label: 'Address',
                            fields: {
                                country: {
                                    control: 'textfield',
                                    label: 'Country',
                                    value: address.country
                                },
                                city: {
                                    control: 'textfield',
                                    label: 'City',
                                    value: address.city
                                },
                                line_1: {
                                    control: 'textfield',
                                    label: 'Line 1',
                                    value: address.line_1
                                },
                                line_2: {
                                    control: 'textfield',
                                    label: 'Line 2',
                                    value: address.line_2
                                },
                                postal_code: {
                                    control: 'textfield',
                                    label: 'Postal code',
                                    value: address.postal_code
                                },
                                address_id: {
                                    control: 'textfield',
                                    label: 'Identifier',
                                    disabled: true,
                                    value: address._id
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
}

export default withSnackbar(withSpir(withStyles(styles)(EditCard)));
