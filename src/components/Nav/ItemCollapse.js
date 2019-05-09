import React, { Component, Fragment } from 'react';

import Item from './Item';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default class ItemCollapse extends Component {
    state = {
        open: false
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        const { children, icon, items } = this.props;
        const { open } = this.state;
        let Icon = icon;

        return (
            <Fragment>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        {icon && <Icon /> }
                    </ListItemIcon>
                    <ListItemText inset primary={children} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {items.map((item, i) => {
                            return (
                                <Item
                                    key={i}
                                    to={item.path}
                                    icon={item.icon}
                                >
                                    {item.name}
                                </Item>
                            )
                        })}
                    </List>
                </Collapse>
            </Fragment>
        )
    }
}
