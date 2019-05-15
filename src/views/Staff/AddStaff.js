import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';

const styles = theme => ({})

class AddStaff extends Component {
    state = {}

    onCreate = (e, staff) => {
        this.props.spir.staff.add(staff)
            .then(added => console.log(added))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <FormView
                title='Create Staff member'
                fields={{
                    first_name: {
                        control: 'textfield',
                        required: true,
                        autoFocus: true,
                        label: 'First name',
                    },
                    last_name: {
                        control: 'textfield',
                        required: true,
                        label: 'Last name'
                    },
                    username: {
                        control: 'textfield',
                        required: true,
                        label: 'Username'
                    },
                    email: {
                        control: 'textfield',
                        required: true,
                        label: 'Email',
                    },
                    password: {
                        control: 'textfield',
                        type: 'password',
                        label: 'Password',
                        required: true,
                    },
                    phone_no: {
                        control: 'textfield',
                        required: true,
                        label: 'Phone number'
                    }
                }}
                actions={{
                    create: {
                        callback: this.onCreate
                    }
                }}
            />
        )
    }
}

export default withSpir(withStyles(styles)(AddStaff));
