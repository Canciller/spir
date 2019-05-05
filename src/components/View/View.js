import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ViewHeader from './ViewHeader';
import ViewContent from './ViewContent';
import ViewActions from './ViewActions';

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
        const {
            children,
            actions,
            title,
            error,
            back,
            onRefresh,
            style,
            classes,
        } = this.props;

        /*
        if(error)
            return (
            )
            */

        //else
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
