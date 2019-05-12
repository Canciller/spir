import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
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
        color: theme.palette.grey[500]
    },
    icon: {
        width: iconSize,
        height: iconSize,
    },
    text: {
        marginTop: theme.spacing.unit * 2
    },
    headerActions: {

    }
})

class ErrorView extends Component {
    render() {
        const {
            icon,
            message,
            classes,
            ...other
        } = this.props;

        let Icon = icon || SentimentDissatisfiedIcon;

        return (
            <View
                classes={{
                    root: classes.root,
                    content: classes.content,
                    actions: classes.actions,
                    headerActions: classes.headerActions
                }}
                {...other}
            >
                <div
                    className={classes.message}
                >
                    <Icon
                        className={classes.icon}
                    />
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
