import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
})

class ViewContent extends Component {
    render() {
        const {
            children,
            classes
        } = this.props;

        return (
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(ViewContent);
