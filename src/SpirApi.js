import React, { Component } from 'react';
import { SpirApiContext } from './context';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const url = 'https://spir-development.herokuapp.com/api'; // Change this to a config file

const styles = theme => ({

})

class SpirApi extends Component {
    state =  {
        notify: false
    }

    inventory = {
        add: item => {
            item = JSON.stringify(item);
            fetch(`${url}/products`, {
                method: 'post',
                body: item,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => this.setState({ notify: true }))
                .catch(err => console.log(err));
        },
        get: callback => {
            fetch(`${url}/products`)
                .then(res => res.json())
                .then(res => callback(res))
                .catch(err => console.log(err))
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ notify: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <SpirApiContext.Provider value={{
                inventory: this.inventory
            }}>
                <React.Fragment>
                    {this.props.children}
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.notify}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={
                            <span id="message-id">
                                TEST
                            </span>}
                        action={[
                            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                                UNDO
                            </Button>,
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]} />
                </React.Fragment>
            </SpirApiContext.Provider>
        )
    }
}

export default withStyles(styles)(SpirApi);
