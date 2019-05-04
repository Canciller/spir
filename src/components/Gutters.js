import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
    const gutterSize = theme.spacing.unit * 2;

    return {
        root: {},
        rootInline: { display: 'inline-block' },
        gutterVertical: {
            marginRight: gutterSize,
            marginLeft: gutterSize
        },
        gutterHorizontal: {
            marginTop: gutterSize,
            marginBottom: gutterSize
        },
        gutterTop: {
            marginTop: gutterSize
        },
        gutterRight: {
            marginRight: gutterSize
        },
        gutterBottom: {
            marginBottom: gutterSize
        },
        gutterLeft: {
            marginLeft: gutterSize
        }
    }
}

class Gutters extends Component {
    render() {
        const {
            children,
            classes,
            fullWidth,
            vertical,
            horizontal,
            top,
            bottom,
            left,
            right,
            ...other
        } = this.props;

        return (
            <div
                {...other}
                className={
                    classNames(
                        fullWidth ? classes.root : classes.rootInline,
                        vertical && classes.gutterVertical,
                        horizontal && classes.gutterHorizontal,
                        top && classes.gutterTop,
                        right && classes.gutterRight,
                        bottom && classes.gutterBottom,
                        left && classes.gutterLeft,
                    )
                }
            >
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(Gutters);

