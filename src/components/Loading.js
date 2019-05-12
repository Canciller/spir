import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: 'auto'
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.grey[500]
    },
    text: {
        marginTop: theme.spacing.unit * 2
    }
})

class Loading extends Component {
    render() {
        const {
            message,
            classes,
            progress
        } = this.props;

        let size = 80;
        if(progress) size = progress.size || size;

        return (
            <div
                className={classes.root}
            >
                <div className={classes.message}>
                    <CircularProgress
                        {...progress}
                        size={size}
                    />
                    { message &&
                        <Typography
                            variant='title'
                            color='inherit'
                            className={classes.text}
                        >
                            {message}
                        </Typography>
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Loading);
