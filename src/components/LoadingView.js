import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from './View';
import Loading from './Loading';

const styles = theme => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class LoadingView extends Component {
    render() {
        const {
            classes,
            loading,
            ...other
        } = this.props;

        return (
            <View
                classes={{
                    content: classes.content
                }}
                {...other}
            >
                <Loading
                    {...loading}
                />
            </View>
        )
    }
}

export default withStyles(styles)(LoadingView);
