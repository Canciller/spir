import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Gutters from './Gutters';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        padding: '14px 0',
        boxShadow: 'none'
    }
})

class ButtonWrapper extends Component {
    render() {
        const {
            children,
            gutters,
            fullWidth,
            classes,
            ...other
        } = this.props;

        return (
            <Gutters
                fullWidth={fullWidth}
                {...gutters}
            >
                <Button
                    size='large'
                    color='primary'
                    variant='outlined'
                    {...other}
                    fullWidth={fullWidth}
                    classes={{ root: classes.root }}
                >
                    {children}
                </Button>
            </Gutters>
        )
    }
}

export default withStyles(styles)(ButtonWrapper);
