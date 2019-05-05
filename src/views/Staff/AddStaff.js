import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';

const styles = theme => ({})

class AddStaff extends Component {
    state = {}

    onAdd = (e, staff) => {
        this.props.spir.staff.add(staff)
            .then(added => console.log(added))
            .catch(err => console.log(err));
    }

    render() {
        const {
            categories
        } = this.state;

        return (
            <FormView
                title='Add Staff member'
                fields={[
                    {
                        type: 'textfield',
                        required: true,
                        autoFocus: true,
                        label: 'Username',
                        target: 'username'
                    }
                ]}
                actions={[
                    {
                        name: 'Add',
                        callback: this.onAdd
                    }
                ]}
            />
        )
    }
}

export default withSpir(withStyles(styles)(AddItem));
