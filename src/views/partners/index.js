import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
})

class PartnerCards extends Component {
    render() {
        const { classes, theme } = this.props;

        return (
            <Fragment>
                <Typography variant='title'>Cards</Typography>
            </Fragment>
        )
    }
}

let Cards = withStyles(styles)(PartnerCards);

export {
    Cards
}
