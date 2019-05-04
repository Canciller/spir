import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';

export default class LinkWrapper extends Component {
    render() {
        const { children, ...other } = this.props;

        return (
            <Link component={RouterLink} {...other}>
                {children}
            </Link>
        )
    }
}
