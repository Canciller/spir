import React, { Fragment } from 'react';

import Link from '../Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

let Item = ({ children, to, icon}) => {
    let Icon = icon;

    let content = (
        <ListItem button>
            <ListItemIcon>
                {icon && <Icon /> }
            </ListItemIcon>
            <ListItemText inset primary={children} />
        </ListItem>
    )

    if(to) content = (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
            {content}
        </Link>
    )

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default Item;
