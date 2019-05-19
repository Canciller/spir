import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import routes from '../../config/routes';

import DatabaseView from '../../components/DatabaseView';

//const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

function transformEmpty(value) {
    if(value.length === 0)
        return 'Undefined'
    return value;
}

class Cards extends Component {

    render() {
        return (
            <DatabaseView
                title='Cards'

                collection='cards'
                as='card'

                pipeline={{
                    cards: {
                        collection: 'partners',
                        as: 'partner',
                        pass: 'partner',
                    },
                    partners: {
                        collection: 'addresses',
                        as: 'address',
                        pass: 'address',
                    }
                }}

                emptyViewProps={{
                    message: 'Nothing here'
                }}

                messages={{
                    delete: 'Card successfully deleted'
                }}

                addPath={routes.addCard.path}
                editPath={routes.editCard.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this card?'
                }}

                dataCardProps={{
                    format: {
                        card: {
                            label: 'Card',
                            variant: 'title',
                            format: {
                                _id: { visible: false },
                                partner: { visible: false },
                                __v: { visible: false },
                                tag: {
                                    label: 'Tag',
                                    variant: 'subheading'
                                },
                                balance: {
                                    label: 'Balance',
                                    variant: 'subheading',
                                    transform: value => `$${value.toFixed(2)}`,
                                },
                                level: {
                                    label: 'Level',
                                    variant: 'subheading',
                                    gutterBottom: true,
                                    transform: value => ['Platinum', 'Gold'][value]
                                },
                                createdAt: {
                                    label: 'Created at',
                                    variant: 'caption'
                                },
                                updatedAt: {
                                    label: 'Updated at',
                                    variant: 'caption'
                                }
                            }
                        },
                        partner: {
                            label: 'Partner',
                            gutterTop: true,
                            variant: 'title',
                            format: {
                                _id: { visible: false },
                                __v: { visible: false },
                                createdAt: { visible: false },
                                updatedAt: { visible: false },
                                address: { visible: false },
                                first_name: {
                                    variant: 'subheading'
                                },
                                last_name: {
                                    variant: 'subheading',
                                    gutterBottom: true
                                },
                                email: {
                                    variant: 'subtitle2',
                                    label: 'Email'
                                },
                                phone_no: {
                                    variant: 'subtitle2',
                                    label: 'Phone'
                                }
                            }
                        },
                        address: {
                            label: 'Address',
                            gutterTop: true,
                            variant: 'title',
                            format: {
                                _id: { visible: false },
                                __v: { visible: false },
                                createdAt: { visible: false },
                                updatedAt: { visible: false },
                                country: {
                                    label: 'Country',
                                    variant: 'subtitle2',
                                    transform: transformEmpty
                                },
                                city: {
                                    label: 'City',
                                    variant: 'subtitle2',
                                    transform: transformEmpty
                                },
                                line_1: {
                                    label: 'Line 1',
                                    variant: 'subtitle2',
                                    transform: transformEmpty
                                },
                                line_2: {
                                    label: 'Line 2',
                                    variant: 'subtitle2',
                                    transform: transformEmpty
                                },
                                postal_code: {
                                    label: 'Postal code',
                                    variant: 'subtitle2',
                                    transform: transformEmpty
                                }
                            }
                        }
                    }
                }}
            />
        )
    }
}

export default withStyles(styles)(Cards);
