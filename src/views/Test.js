import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import DataGridView from '../components/DataGridView';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({})

class Test extends Component {
    state = {}

    onClick = (e, data) => {
        console.log(data);
    }

    render() {
        return (
            <DataGridView
                title='Testing'


                dataCardProps={{
                    format: {
                        partner: {
                            label: 'Partner',
                                variant: 'title',
                                format: {
                                    name: {
                                        variant: 'subtitle1'
                                    }
                                }
                        },
                            card: {
                                label: 'Card',
                                    variant: 'title',
                                    gutterTop: true
                            }
                    },
                    actions: [
                        {
                            name: 'Delete',
                            callback: this.onClick
                        },
                        {
                            name: 'Edit',
                            callback: this.onClick
                        }
                    ],
                    onClick: this.onClick,
                    width: 300
                }}

                actions={[
                    {
                        name: 'Add',
                        icon: AddIcon,
                        main: true
                    }
                ]}

                data={[
                    {
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    },
                    {
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    },
                    {
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    },
                    {
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    },
                    {
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    },
                ]}

            />
        )
    }
}

export default withStyles(styles)(Test);
