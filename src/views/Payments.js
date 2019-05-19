import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DatabaseGridView from '../components/DatabaseGridView';

const styles = theme => ({})

class Payments extends Component {
    state = {}

    render() {
        return (
            <DatabaseGridView
                title='Payments'

                collection='payments'
                as='payment'

                pipeline={{
                    payments: {
                        collection: 'partners',
                        as: 'partner',
                        pass: 'partner'
                    }
                }}

                reverse

                emptyViewProps={{
                    message: 'Nothing here'
                }}

                dataCardProps={{
                    width: '100%',
                    format: {
                        payment: {
                            variant: 'title',
                            label: 'Payment',
                            format: {
                                createdAt: {
                                    label: 'Date',
                                    variant: 'subheading',
                                    transform: dateStr => {
                                        let date = new Date(dateStr);
                                        return date.toUTCString();
                                    }
                                },
                                total: {
                                    variant: 'subheading',
                                    label: 'Total',
                                    transform: value => `$${value.toFixed(2)}`
                                },
                                _id: { visible: false },
                                __v: { visible: false },
                                partner: { visible: false },
                                updatedAt: { visible: false },
                                products: {
                                    gutterTop: true,
                                    label: 'Products',
                                    variant: 'title',
                                    format: {
                                        _id: { visible: false },
                                        product: { visible: false },
                                        name: {
                                            variant: 'subheading',
                                            transform: (name, data) => {
                                                return `${name} x ${data.quantity} $${data.price.toFixed(2)}`;
                                            }
                                        },
                                        quantity: { visible: false },
                                        price: { visible: false }
                                    }
                                },
                            }
                        },
                        partner: {
                            variant: 'title',
                            label: 'Partner',
                            gutterTop: true,
                            format: {
                                __null__: {
                                    variant: 'caption',
                                    transform: () => 'Partner does not exist anymore'
                                },
                                first_name: {
                                    variant: 'title'
                                },
                                last_name: {
                                    variant: 'title',
                                    gutterBottom: true
                                },
                                email: {
                                    variant: 'subheading',
                                    label: 'Email'
                                },
                                phone_no: {
                                    label: 'Phone',
                                    variant: 'subheading',
                                    gutterBottom: true
                                },
                                createdAt: {
                                    variant: 'caption',
                                    label: 'Created at'
                                },
                                updatedAt: {
                                    variant: 'caption',
                                    label: 'Updated at'
                                },
                                address: { visible: false },
                                _id: { visible: false },
                                __v: { visible: false },
                            }
                        }
                    },
                    //width: '100%'
                }}
            />
        )
    }
}

export default withStyles(styles)(Payments);
