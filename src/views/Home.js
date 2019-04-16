import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Typography from '@material-ui/core/Typography';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Typography variant='title'>
                    <Translate id='section.checkout' />
                </Typography>
            </Fragment>
        )
    }
}
