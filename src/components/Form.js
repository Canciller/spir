import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
})

class Form extends Component {
    render() {
        const { children, classes } = this.props;

        return (
            <div className={classes.root}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(Form);
