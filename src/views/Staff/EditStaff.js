import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';

const styles = theme => ({})

class EditStaff extends Component {
    state = {}

    onSave = (e, data) => {
        this.props.spir.staff.update(data.id, data)
            .then(saved => console.log(saved))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        const { history } = this.props;

        const location = history.location;
        if(!location || !location.state) return;

        this.setState({ data: location.state.data });
    }

    render() {
        const { data } = this.state;

        if(!data)
            return (
                <ErrorView
                    message='Edit view not available.'
                />
            )
        else
            return (
            <FormView
                title='Edit Staff Member'
                fields={{
                    first_name: {
                        control: 'textfield',
                        required: true,
                        autoFocus: true,
                        label: 'First name',
                        value: data.first_name
                    },
                    last_name: {
                        control: 'textfield',
                        required: true,
                        label: 'Last name',
                        value: data.last_name
                    },
                    username: {
                        control: 'textfield',
                        required: true,
                        label: 'Username',
                        value: data.username
                    },
                    email: {
                        control: 'textfield',
                        required: true,
                        label: 'Email',
                        value: data.email
                    },
                    password: {
                        control: 'textfield',
                        type: 'password',
                        label: 'Password',
                        required: true,
                        value: data.password
                    },
                    phone_no: {
                        control: 'textfield',
                        required: true,
                        label: 'Phone number',
                        value: data.phone_no
                    },
                    id: {
                        label: 'Identifier',
                        control: 'textfield',
                        value: data._id,
                        disabled: true
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

export default withSpir(withStyles(styles)(EditStaff));
