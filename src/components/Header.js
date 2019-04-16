import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import Typography from '@material-ui/core/Typography';

export default class Header extends Component {
    render()  {
        return (
            <Typography variant='headline' color='inherit' noWrap>
                SPIR
            </Typography>
        )
    }
}
