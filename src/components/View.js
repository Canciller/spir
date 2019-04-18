import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = theme => ({
    header: {
        position: 'relative'
    },
    close: {
        position: 'absolute',
        right: 0,
        top: -theme.spacing.unit * 1.5
    },
    title: {
        marginBottom: theme.spacing.unit * 2
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap'
    }
})

class View extends Component {
    goBack = () => {
        if(this.props.history) this.props.history.goBack();
    }

    render() {
        const {
            classes,
            title,
            children,
            back
        } = this.props;
        
        return (
            <Fragment>
                <div className={classes.header}>
                    <Typography
                        className={classes.title}
                        variant='title'
                    >
                        {title}
                    </Typography>
                    {back &&
                        <IconButton
                            aria-label='close'
                            className={classes.close}
                            onClick={this.goBack}
                        >
                            <ArrowBack />
                        </IconButton>}
                </div>
                <main className={classes.content}>
                    {children}
                </main>
            </Fragment>
        )
    }
}

export default withStyles(styles)(View);