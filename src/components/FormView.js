import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from './View';
import Form from './Form';

const styles = theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column'
    }
})

class FormView extends Component {
    render() {
        const {
            title,
            fields,
            actions,
            classes
        } = this.props;

        return (
            <View
                classes={{
                    content: classes.content
                }}
                title={title}
                onRefresh={this.onRefresh}
            >
                <Form
                    fields={fields}
                    actions={actions}
                />
            </View>
        )
    }
}

export default withStyles(styles)(FormView);
