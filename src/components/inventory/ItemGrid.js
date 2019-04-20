import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const styles = theme => ({
    grid: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit
    }
})

class ItemGrid extends Component {
    render() {
        const {
            classes,
            children
        } = this.props;

        return (
            <div className={classes.grid}>
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(ItemGrid);