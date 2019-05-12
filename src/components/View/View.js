import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ViewHeader from './ViewHeader';
import ViewContent from './ViewContent';
import ViewActions from './ViewActions';

import LoadingView from '../LoadingView';
import ErrorView from '../ErrorView';

const styles = theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit * 2,
        flexGrow: 1
    },
    header: {},
    headerActions: {},
    content: {},
    actions: {}
})

class View extends Component {
    render() {
        let {
            children,
            actions,
            title,

            back,
            onRefresh,

            loading,
            loadingViewProps,

            empty,
            emptyViewProps,

            error,
            errorViewProps,

            style,
            classes,
            ...other
        } = this.props;

        emptyViewProps = emptyViewProps || {};
        loadingViewProps = loadingViewProps || {};
        errorViewProps = errorViewProps || {};

        if(error)
            return (
                <ErrorView
                    {...errorViewProps}
                    classes={classes}
                    title={title}
                    onRefresh={onRefresh}
                    style={style}
                />
            )
        else if(loading)
            return (
                <LoadingView
                    {...loadingViewProps}
                    classes={classes}
                    title={title}
                    onRefresh={onRefresh}
                    actions={actions}
                    style={style}
                />
            )
        else if(empty)
            return (
                <ErrorView
                    {...emptyViewProps}
                    classes={classes}
                    title={title}
                    onRefresh={onRefresh}
                    actions={actions}
                    style={style}
                />
            )
        else
            return (
                <div
                    style={style}
                    className={classes.root}
                >
                    <ViewHeader
                        back={back}
                        title={title}
                        onRefresh={onRefresh}
                        classes={{
                            root: classes.header,
                            actions: classes.headerActions
                        }}
                    />
                    <ViewContent
                        classes={{ root: classes.content }}
                    >
                        {children}
                    </ViewContent>
                    <ViewActions
                        classes={{ root: classes.actions }}
                        actions={actions}
                    />
                </div>
            )
    }
}

export default withStyles(styles)(View);
