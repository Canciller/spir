import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';

const styles = theme => ({})

class AddStaff extends Component {
    state = {}

    notify = (obj, variant) => {
        if(obj === undefined) return;
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(obj.message || obj, {
            variant
        });
    }

    onCreate = (e, staff) => {
        this.props.spir.staff.add(staff)
            .then(added => this.notify(`${added.first_name} ${added.last_name} successfully added to staff`, 'success'))
            .catch(err => this.notify(err, 'error'));
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

export default withSnackbar(withSpir(withStyles(styles)(AddStaff)));
