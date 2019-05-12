import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Header extends Component {
    render()  {
        return (
            <Typography
                color='primary'
                variant='headline'
                noWrap
            >
                SPIR
            </Typography>
        )
    }
}
