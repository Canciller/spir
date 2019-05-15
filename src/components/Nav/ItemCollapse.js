import React, { Component, Fragment } from 'react';

import Item from './Item';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon'

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
        let NavIcon = icon;

        return (
            <Fragment>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        {icon && <NavIcon /> }
                    </ListItemIcon>
                    <ListItemText inset primary={children} />
                    <Icon color='action'>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Icon>
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
