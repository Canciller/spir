import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
})

class Cards extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Typography variant='title'>
                    <Translate id='section.cards' />
                </Typography>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Cards);
