import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    paper: {
        boxShadow: 'none'
    }
})

class AlertDialog extends Component {
    onAction = (e, callback) => {
        const { onClose } = this.props;
        if(onClose) onClose(e);
        if(callback) callback(e);
    }

    createActions = () => {
        const { actions } = this.props;

        return (
            <DialogActions>
                { actions.map((action, i) =>
                    <Button
                        key={i}
                        color='primary'
                        onClick={e => this.onAction(e, action.callback)}
                        autoFocus={action.autoFocus}
                    >
                        {action.name}
                    </Button>
                )}
            </DialogActions>
        )
    }

    render() {
        const {
            open,
            title,
            children,
            onClose,
            classes
        } = this.props;

        return (
            <Dialog
                PaperProps={{
                    className: classes.paper
                }}
                open={open}
                onClose={onClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
            >
                <DialogTitle id='dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        {children}
                    </DialogContentText>
                </DialogContent>
                {this.createActions()}
            </Dialog>
        );
    }
}

export default withStyles(styles)(AlertDialog);
