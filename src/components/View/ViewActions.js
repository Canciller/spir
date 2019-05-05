import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Link from '../Link';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => {
    return {
        root: {
            position: 'fixed',
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
            zIndex: theme.zIndex.appBar
        },
        hide: {
            display: 'none'
        },
        iconButton: {
            background: 'rgba(255, 255, 255, 0.8)',
            marginLeft: theme.spacing.unit / 2,
            padding: theme.spacing.unit
        },
        iconSmall: {
            width: 20,
            height: 20
        },
        iconLarge: {
            width: 35,
            height: 35
        }
    }
}

class ViewActions extends Component {
    createActions = () => {
        const {
            actions,
            classes
        } = this.props;

        if(!actions || actions.length === 0) return;

        return actions.map((action, i) => {
            const Icon = action.icon;

            if(!Icon) return '';

            let iconButton = (
                <IconButton
                    key={i}
                    className={classes.iconButton}
                    onClick={e => {
                        if(action.callback) action.callback(e);
                    }}
                >
                    <Icon
                        className={
                            classNames(
                                action.main ? classes.iconLarge : classes.iconSmall
                            )
                        }
                    />
                </IconButton>
            )

            if(action.link)
                return (
                    <Link key={i} to={action.link}>
                        {iconButton}
                    </Link>
                )
            else return iconButton;
        })
    }

    render() {
        const {
            classes,
            actions
        } = this.props;

        return (
            <div className={classNames(
                classes.root,
                !actions && classes.hide
            )}>
                {this.createActions()}
            </div>
        )
    }
}

export default withStyles(styles)(ViewActions);
