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

                editPath={routes.editStaff.path}
                addPath={routes.addStaff.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this staff member?'
                }}

                dataFormat={{
                    first_name: {
                        variant: 'title'
                    },
                    last_name: {
                        variant: 'title',
                        gutterBottom: true
                    },
                    username: {
                        variant: 'subheading'
                    },
                    password: { visible: false },
                    email: {
                        variant: 'subheading'
                    },
                    phone_no: {
                        label: 'Phone',
                        variant: 'subheading',
                        gutterBottom: true
                    },
                    createdAt: {
                        label: 'Creation date',
                        variant: 'caption'
                    },
                    updatedAt: {
                        label: 'Latest update',
                        variant: 'caption'
                    },
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withStyles(styles)(Staff);
