import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function createFullGutters(t, r, b, l) {
    return {
        marginTop: t,
        marginRight: r,
        marginBottom: b,
        marginLeft: l
    }
}

function createGutters(v, h) {
    return createFullGutters(v, h, v, h);
}

const styles = theme => {
    const gutterSize = theme.spacing.unit * 2;

    return {
        root: {
            padding: '14px 0'
        },
        gutterVertical: createGutters(gutterSize, 0),
        gutterHorizontal: createGutters(0, gutterSize),
        gutterTop: createFullGutters(gutterSize, 0, 0, 0),
        gutterRight: createFullGutters(0, gutterSize, 0, 0),
        gutterBottom: createFullGutters(0, 0, gutterSize, 0),
        gutterLeft: createFullGutters(0, 0, 0, gutterSize)
    }
}

class ButtonWrapper extends Component {
    render() {
        const {
            children,
            classes,
            gutterVertical,
            gutterHorizontal,
            gutterTop,
            gutterBottom,
            gutterLeft,
            gutterRight,
            ...other
        } = this.props;

        return (
            <Button
                size='large'
                color='primary'
                variant='outlined'
                {...other}
                className={
                    classNames(
                        classes.root,
                        gutterVertical && classes.gutterVertical,
                        gutterHorizontal && classes.gutterHorizontal,
                        gutterTop && classes.gutterTop,
                        gutterRight && classes.gutterRight,
                        gutterBottom && classes.gutterBottom,
                        gutterLeft && classes.gutterLeft,
                    )
                }
            >
                {children}
            </Button>
        )
    }
}

export default withStyles(styles)(ButtonWrapper);
