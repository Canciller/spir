import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import View from './View';

import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const iconSize = 100;

const styles = theme => ({
    root: {},
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {},
    message: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.action.disabled,
        userSelect: 'none'
    },
    icon: {
        width: iconSize,
        height: iconSize,
    },
    iconContainer: {
        paddding: 0,
        width: iconSize,
        height: iconSize,
        color: theme.palette.action.disabled
    },
    text: {
        marginTop: theme.spacing.unit * 2
    },
    headerActions: {

    },
    header: {}
})

class ErrorView extends Component {
    render() {
        let {
            icon,
            message,
            classes,
            ...other
        } = this.props;

        let ErrorIcon = icon || SentimentDissatisfiedIcon;

        return (
            <View
                classes={{
                    root: classes.root,
                    content: classes.content,
                    actions: classes.actions,
                    headerActions: classes.headerActions,
                }}
                {...other}
            >
                <div
                    className={classes.message}
                >
                    <Icon
                        color='inherit'
                        className={classes.iconContainer}
                    >
                        <ErrorIcon
                            className={classes.icon}
                        />
                    </Icon>
                    {message &&
                        <Typography
                            variant='title'
                            color='inherit'
                            className={classes.text}
                        >
                            {message}
                        </Typography>
                    }
                </div>
            </View>
        )
    }
}

export default withStyles(styles)(ErrorView);
