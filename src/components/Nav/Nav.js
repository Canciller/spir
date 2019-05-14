import React, { Component, Fragment } from 'react';

import Item from './Item';
import ItemCollapse from './ItemCollapse';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import nav from '../../config/nav';

export default class Nav extends Component {
    render() {
        return (
            <List
                component='nav'
                disablePadding
            >
                {nav.map((item, i) => {
                    if(item.nav !== undefined)
                        return (
                            <ItemCollapse
                                key={i}
                                icon={item.icon}
                                items={item.nav}
                            >
                                {item.name}
                            </ItemCollapse>
                        )
                    else
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
        )
    }
}
