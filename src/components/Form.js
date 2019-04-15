import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
})

class Form extends Component {
    render() {
        const { children, classes } = this.props;

        return (
            <form className={classes.root}>
                {children}
            </form>
        )
    }
}

export default withStyles(styles)(Form);
