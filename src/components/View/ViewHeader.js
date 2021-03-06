import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../../context';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Refresh from '@material-ui/icons/Refresh';

const styles = theme => ({
    root: {},
    actions: {
        position: 'fixed',
        right: theme.spacing.unit * 2,
        top: 64 + theme.spacing.unit,
        zIndex: theme.zIndex.appBar
    },
    title: {
        paddingLeft: theme.spacing.unit / 2
    },
    iconButton: {
        background: theme.palette.background.paper,
        padding: 5
    },
    margin: {
        marginLeft: theme.spacing.unit / 2
    }
})

class ViewHeader extends Component {
    onClickArrowBack = () => {
        const { history } = this.props;
        if(history && history.goBack instanceof Function)
            history.goBack();
    }

    onClickRefresh = () => {
        const { onRefresh } = this.props;
        if(onRefresh instanceof Function) onRefresh();
    }

    render() {
        const {
            title,
            onRefresh,
            classes
        } = this.props;

        let back = this.props.back;
        if(back === undefined) back = true;

        return (
            <div className={classes.root}>
                <Typography
                    variant='title'
                    className={classes.title}
                >
                    {title}
                </Typography>
                <div className={classes.actions}>
                    {onRefresh &&
                            <IconButton
                                color='primary'
                                aria-label='refresh'
                                onClick={this.onClickRefresh}
                                className={classes.iconButton}
                            >
                                <Refresh />
                            </IconButton>
                    }
                    {back &&
                            <IconButton
                                color='primary'
                                aria-label='back'
                                onClick={this.onClickArrowBack}
                                className={
                                    classNames(
                                        classes.margin,
                                        classes.iconButton
                                    )
                                }
                            >
                                <ArrowBack />
                            </IconButton>
                    }
                </div>
            </div>
        )
    }
}

export default withHistory(withStyles(styles)(ViewHeader));
