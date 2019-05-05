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
                fields={[
                    {
                        type: 'textfield',
                        required: true,
                        autoFocus: true,
                        label: 'Username',
                        target: 'username',
                        value: data.username
                    },
                    {
                        label: 'Staff Member ID',
                        disabled: true,
                        target: 'id',
                        value: data._id
                    }
                ]}
                actions={[
                    {
                        name: 'Save',
                        callback: this.onSave
                    }
                ]}
            />
        )
    }
}

export default withSpir(withStyles(styles)(EditStaff));
