import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Translate } from 'react-localize-redux';
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
    onAgree = () => {
        const { onClose, onAgree } = this.props;
        if(onAgree) onAgree();
        if(onClose) onClose();
    }

    onDisagree = () => {
        const { onClose, onDisagree } = this.props;
        if(onDisagree) onDisagree();
        if(onClose) onClose();
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
                <DialogActions>
                    <Button onClick={this.onDisagree} color='primary' autoFocus>
                        <Translate id='no' />
                    </Button>
                    <Button onClick={this.onAgree} color='primary'>
                        <Translate id='yes' />
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AlertDialog);