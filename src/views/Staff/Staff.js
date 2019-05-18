import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import routes from '../../config/routes';

import DatabaseView from '../../components/DatabaseView';

const styles = theme => ({})

class Staff extends Component {
    state = {}

    render() {
        return (
            <DatabaseView
                title='Staff'

                collection='staff'

                pipeline={{
                    staff: {
                        pass: 'address',
                        as: 'address',
                        from: 'addresses'
                    }
                }}

                messages={{
                    delete: value => `${value.first_name} ${value.last_name} successfully deleted from staff`
                }}

                emptyViewProps={{
                    message: 'Nothing here'
                }}

                editPath={routes.editStaff.path}
                addPath={routes.addStaff.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this staff member?'
                }}

                dataCardProps={{
                    width: '100%',
                    format: {
                        first_name: {
                            variant: 'title'
                        },
                        last_name: {
                            variant: 'title',
                            gutterBottom: true
                        },
                        username: {
                            variant: 'subheading',
                            label: 'Username'
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
                            label: 'Created at',
                            variant: 'caption'
                        },
                        updatedAt: {
                            label: 'Updated at',
                            variant: 'caption'
                        },
                        password: { visible: false },
                        _id: { visible: false },
                        __v: { visible: false },
                    },
                    //width: '100%'
                }}
            />
        )
    }
}

export default withStyles(styles)(Staff);
