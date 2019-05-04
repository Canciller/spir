import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../context';

import routes from '../config/routes';

import DataView from '../components/DataView';

const styles = theme => ({
})

class Staff extends Component {
    state = {}

    onDeleteStaff = staff => {
    }

    fetchData = () => {
        const { spir } = this.props;

        this.setState({ staff: undefined }, () => {
            spir.staff.get()
                .then(staff => this.setState({ staff }))
                .catch(err => console.log(err));
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { staff } = this.state;

        return (
            <DataView
                title='Staff'

                onDelete={this.onDeleteStaff}
                deleteDialog={{
                    message: 'Are you sure you want to delete this staff member?'
                }}
                onRefresh={this.fetchData}

                data={staff}
                dataFormat={{
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withSpir(withStyles(styles)(Staff));
