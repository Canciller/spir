import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from './View';
import Loading from './Loading';

const styles = theme => ({
    root: {},
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {},
    headerActions: {

    },
    header: {}
})

class LoadingView extends Component {
    render() {
        const {
            classes,
            message,
            progress,
            viewClasses,
            ...other
        } = this.props;

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
                <Loading
                    message={message}
                    progress={progress}
                />
            </View>
        )
    }
}

export default withStyles(styles)(LoadingView);
