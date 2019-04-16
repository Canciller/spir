import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        padding: '15px 0',
        marginTop: 15
    }
})

class ButtonWrapper extends Component {
    render() {
        const { children, onClick, classes } = this.props;

        return (
            <Button
                onClick={onClick}
                className={classes.button}
                variant='outlined'
                color='primary'
            >
                {children}
            </Button>
        )
    }
}

export default withStyles(styles)(ButtonWrapper);
