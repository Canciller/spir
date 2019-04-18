import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        padding: '16px 0',
    },
    spacing: {
        marginTop: theme.spacing.unit * 2
    }
})

class ButtonWrapper extends Component {
    render() {
        const { children, onClick, classes, margin } = this.props;

        return (
            <Button
                onClick={onClick}
                className={classNames(classes.button, margin && classes.spacing)}
                variant='outlined'
                color='primary'
            >
                {children}
            </Button>
        )
    }
}

export default withStyles(styles)(ButtonWrapper);
